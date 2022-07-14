<template>
	<b-container fluid>
		<b-row style="margin: 32px 0;">
			<b-col cols="7">
				<b-card style="height: 784px">
					<template #header>
						<h3>Routes</h3>
						<b-button 
							variant="outline-info" 
							size="sm" 
							style="float: right"
							@click="refreshRoutes()"
						>Refresh</b-button>
					</template>
					<div style="margin: 12px 0 0">
						<b-form inline>
							<label for="route-name-form" style="padding-right: 15px">Name</label>
							<vue-bootstrap-typeahead 
								ref="routeNameInput"
								v-model="search.route_name.input"
								:data="search.route_name.options"
								size="sm"
								:minMatchingChars="search.minMatchingChar"
								@input="routeNameAutoComplete()"
							/>
						</b-form>
						<div style="margin: 15px 0 0">
							<b-button 
								size="sm"
								variant="outline-primary" 
								@click="searchRoute()"
							>Search</b-button>
							<b-button 
								size="sm"
								variant="outline-warning" 
								style="margin-left: 15px"
								@click="clearSearch()"
							>Clear</b-button>
						</div>
					</div>
					<div style="margin: 15px 0 0">
						<b-table
							hover
							sort-icon-left							
							:fields="table.fields"
							:items="table.routes"
							@row-hovered="rowHovered"
							@row-unhovered="rowUnhovered"
						>
							<template #cell(route_name)="row">
								<div class="data-row">{{ row.item.route_name }}</div>
							</template>
							<template #cell(date_uploaded)="row">
								<div v-if="row.item.date_uploaded !== 'null'">
									<div class="data-row">{{ row.item.date_uploaded }}</div>
								</div>
								<div v-else>
									<div class="data-row">-</div>
								</div>
							</template>
							<template #cell(complete_files)="row">
								<div v-if="row.item.ref_filename !== 'null' && row.item.stop_filename !== 'null'">
									<b-icon-check2 variant="success" font-scale="2"></b-icon-check2>
								</div>
								<div v-else>
									<b-icon-x variant="danger" font-scale="2"></b-icon-x>
								</div>
							</template>
							<template #cell(actions)="row">
								<div style="float: right">
									<b-button
										style="padding: 2px 12px 6px" 
										variant="outline-primary"
										v-b-modal="'upload-modal'"
										@click="modalInfo(row.item.id, row.item.route_name)"
									>
										<b-icon-upload font-scale="0.80"></b-icon-upload>
									</b-button>
								</div>
							</template>
						</b-table>
						<div v-if="table.routes.length === 0" style="margin: 32px 0 0">
							<p>No Routes Found</p>
						</div>
						<div style="width: 100%; display: flex; justify-content: center">
							<b-pagination
								v-model="pagination.currentPage"
								align="center"
								:total-rows="pagination.totalRows"
								:per-page="pagination.perPage"
								@page-click="newPage"
							></b-pagination>
						</div>
					</div>
				</b-card>

				<b-modal hide-footer centered id="upload-modal" @hidden="resetModal">
					<template #modal-title>
						<h2>{{ modal.route_name }} Files</h2>
					</template>
					<b-form>
						<div style="margin: 14px 0 30px">
							<b-form-group label="Reference File" label-cols="4">
								<b-form-file 
									id="reference-file"
									accept=".gpx"
									v-model="modal.ref_file" 
									size="sm" 
									style="width: 100%"
								></b-form-file>						
							</b-form-group>
						</div>
						<div style="margin: 30px 0">
							<b-form-group label="Stop File" label-cols="4">
								<b-form-file 
									id="stop-file" 
									accept=".csv"
									v-model="modal.stop_file"
									size="sm" 
									style="width: 100%"
								></b-form-file>
							</b-form-group>
						</div>
						<b-button 
							variant="outline-primary" 
							size="sm" 
							style="float: right"
							@click="uploadRouteFiles()"
						>Upload</b-button>
					</b-form>
				</b-modal>
			</b-col>
			<b-col>
				<Map
					:geojson="map.geojson"
					:polygon="map.polygon"
				/>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import { fetchRoute, fetchRoutes, fetchRouteNameDatalist, fetchRoutesSearch, updateRouteFiles, fetchRefreshRoutes } from "@/api/index.js"
import Map from "@/components/Map";

export default {
	name: "Routes",
	components: {
		Map,
	},
	data() {
		return {
			table: {
				fields: [
					{key: "name", sortable: true, label: "Name"}, 
					{key: "complete_files", sortable: true}, 
					{key: "date_uploaded", sortable: true, label: "Date"}, 
					{key: "actions", label: ""}
				],
				routes: [],
				hoveredRow: 0,
				delay: 250
			},
			pagination: {
				currentPage: 1,
				totalRows: 0,
				perPage: 0
			},
			modal: {
				route_name: "",
				id: null,
				ref_file: null,
				stop_file: null
			},
			map: {
				geojson: null,
				polygon: null,
			},
			search: {
				route_name: {
					input: "",
					options: []
				},
				minMatchingChar: 1
			},
		}
	},
	methods: {
		modalInfo(id, route_name) {
			this.modal.id = id;
			this.modal.route_name = route_name;
		},
		resetModal() {
			this.modal.id = null;
			this.modal.route_name = "";
			this.modal.ref_file = null;
			this.modal.stop_file = null;
		},
		rowHovered(row) {
			if (row.ref_filename !== 'null' && row.stop_filename !== 'null') {
				this.table.hoveredRow = row.id;
				this.delay(this.table.delay)
					.then(() => {
						if (this.table.hoveredRow === row.id) {
							fetchRoute(row.id)
								.then(res =>  {
									this.map.geojson = res.data.geojson;
									this.map.polygon = this.definePolygon(res.data.polygon.coordinates);
								})
								.catch(err => console.log(err))
						}
					})
			}
		},
		rowUnhovered() {
			this.map.geojson = null;
			this.map.polygon = null;
			this.table.hoveredRow = 0;
		},
		newPage(data) {
			let page = data.target.innerHTML;

			if (page === "«") {
				page = 1;
			}
			else if (page === "‹") {
				page = this.pagination.currentPage - 1;
			}
			else if (page === "›") {
				page = this.pagination.currentPage + 1;
			}
			else if (page === "»") {
				page = Math.ceil(this.pagination.totalRows / this.pagination.perPage);
			}

			fetchRoutes(page)
				.then(res => {
					this.table.routes = res.data.routes;
					this.pagination.currentPage = res.data.curr_page;
					this.pagination.totalRows = res.data.total_rows;
					this.pagination.perPage = res.data.per_page;
				})
				.catch(err => console.log(err))
		},
		uploadRouteFiles() {
			const formData = new FormData();

			formData.append("ref_file", this.modal.ref_file);
			formData.append("stop_file", this.modal.stop_file);

			updateRouteFiles(this.modal.id, formData)
				.then(res => {
					const index = this.table.routes.findIndex(route => route.id == res.data.id);
					this.table.routes[index].ref_filename = res.data.ref_filename;
					this.table.routes[index].stop_filename = res.data.stop_filename;
					this.table.routes[index].date_uploaded = res.data.date_uploaded;

					this.resetModal();
					this.$bvModal.hide("upload-modal")
				})
				.catch(err => console.log(err))
		},
		searchRoute() {
			const json = {
				route_name: this.search.route_name.input
			}
			fetchRoutesSearch(json, 1)
				.then(res => {
					this.table.routes = res.data.routes;
					this.pagination.currentPage = res.data.curr_page;
					this.pagination.totalRows = res.data.total_rows;
					this.pagination.perPage = res.data.per_page;
				})
				.catch(err => console.log(err))

		},
		clearSearch() {
			this.search.route_name.input = "";
			this.$refs.routeNameInput.inputValue = "";

			fetchRoutes(1)
				.then(res => {
					this.table.routes = res.data.routes;
					this.pagination.totalRows = res.data.totalRows;
					this.pagination.perPage = res.data.per_page;
				})
				.catch(err => console.log(err));
		},
		routeNameAutoComplete() {
			const json = {
				route_name: this.search.route_name.input
			}
			fetchRouteNameDatalist(json)
				.then(res => {
					this.search.route_name.options = res.data.routes;
				})
				.catch(err => console.log(err));
		},
		refreshRoutes() {
			this.$socket.emit("get_routes")
		},
		delay(time) {
			return new Promise(resolve => setTimeout(resolve, time));
		},
		definePolygon(geojson) {
			const latlng = geojson.map(x => [x[1], x[0]]);

			var result = [];
			for (var i = 0; i < latlng.length; i += 2) {
				const upperLeft = latlng[i];
				const upperRight = [latlng[i][0], latlng[i+1][1]];
				const lowerRight = latlng[i+1];
				const lowerLeft = [latlng[i+1][0], latlng[i][1]];

				result.push([upperLeft, upperRight, lowerRight, lowerLeft]);
			}

			return result;
		},
	},
	sockets: {
		list_of_routes: function (routes) {
			const json = {
				routes: routes
			}
			
			fetchRefreshRoutes(json)
				.then(res => {
					this.table.routes = res.data.routes;
					this.pagination.currentPage = res.data.curr_page;
					this.pagination.totalRows = res.data.total_rows;
					this.pagination.perPage = res.data.per_page;
				})
				.catch(err => console.log(err))
		}
	},
	created() {
		fetchRoutes(1)
			.then(res => {
				this.table.routes = res.data.routes;
				this.pagination.totalRows = res.data.total_rows;
				this.pagination.perPage = res.data.per_page;
			})
			.catch(err => console.log(err))
	}
}
</script>

<style scoped>
	h3 {
		display: inline-block;
		margin: 0;
	}
	.data-row {
		padding-top: 5px
	}
</style>