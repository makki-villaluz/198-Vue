<template>
	<b-container fluid>
		<b-row style="margin: 32px 0;">
			<b-col cols="7">
				<b-card style="height: 784px">
					<template #header>
						<h3>Parameters</h3>
						<b-button 
							variant="outline-info" 
							size="sm" 
							style="float: right"
							@click="refreshParameters()"
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
								@click="searchParameter()" 
							>Search</b-button>
							<b-button 
								size="sm"
								variant="outline-warning" 
								style="margin-left: 15px"
								@click="clearParameter()" 
							>Clear</b-button>
						</div>
					</div>
					<div style="margin: 15px 0 0">
						<b-table
							hover
							sort-icon-left
							select-mode="single"							
							:fields="table.fields"
							:items="table.parameters"
							@row-hovered="rowHovered"
							@row-unhovered="rowUnhovered"
						>
							<template #cell(route_name)="row">
								<div class="data-row">{{ row.item.route_name }}</div>
							</template>
							<template #cell(cell_size)="row">
								<div v-if="row.item.cell_size !== 'null'">
									<div class="data-row">{{ row.item.cell_size }}km</div>
								</div>
								<div v-else>
									<div class="data-row">-</div>
								</div>
							</template>
							<template #cell(stop_min_max_time)="row">
								<div v-if="row.item.stop_min_time !== 'null' || row.item.stop_max_time !== 'null'">
									<div class="data-row">{{ row.item.stop_min_time }}s - {{ row.item.stop_max_time }}s</div>
								</div>
								<div v-else>
									<div class="data-row">-</div>
								</div>
							</template>
							<template #cell(speeding_time_speed_limit)="row">
								<div v-if="row.item.speeding_speed_limit !== 'null' || row.item.speeding_time_limit !== 'null'">
									<div class="data-row">{{ row.item.speeding_time_limit }}s, {{ row.item.speeding_speed_limit }}km/h</div>
								</div>
								<div v-else>
									<div class="data-row">-</div>
								</div>
							</template>
							<template #cell(liveness_time_limit)="row">
								<div v-if="row.item.liveness_time_limit !== 'null'">
									<div class="data-row">{{ row.item.liveness_time_limit }}s</div>
								</div>
								<div v-else>
									<div class="data-row">-</div>
								</div>
							</template>
							<template #cell(actions)="row">
								<div style="float: right">
									<b-button
										style="padding: 3px 12px 5px"
										variant="outline-primary"
										v-b-modal="'edit-modal'"
										@click="modalInfo(row.item)"
									>
										<b-icon-pencil-square font-scale="0.80"></b-icon-pencil-square>
									</b-button>
								</div>
							</template>
						</b-table>
						<div v-if="table.parameters.length === 0" style="margin: 32px 0 0">
							<p>No Parameters Found</p>
						</div>
						<b-pagination
							v-model="pagination.currentPage"
							align="center"
							:total-rows="pagination.totalRows"
							:per-page="pagination.perPage"
							@page-click="newPage"
						></b-pagination>
					</div>
				</b-card>

				<b-modal hide-footer centered id="edit-modal" @hidden="resetModal">
					<template #modal-title>
						<h2>{{ modal.route_name }} Parameters</h2>
					</template>
					<b-form>
						<div style="margin: 14px 0 30px">
							<b-form-group label="Cell Size (km)" label-cols="6">
								<b-form-input 
									id="cell-size" 
									size="sm"
									v-model="modal.cell_size" 
									style="width: 100%"
								></b-form-input>						
							</b-form-group>
						</div>
						<div style="margin: 30px 0">
							<b-form-group label="Stop Min Time (s)" label-cols="6">
								<b-form-input 
									id="stop-min-time" 
									size="sm"
									v-model="modal.stop_min_time"
									style="width: 100%"
								></b-form-input>
							</b-form-group>
						</div>
						<div style="margin: 30px 0">
							<b-form-group label="Stop Max Time (s)" label-cols="6">
								<b-form-input 
									id="stop-max-time" 
									size="sm" 
									v-model="modal.stop_max_time"
									style="width: 100%"
								></b-form-input>
							</b-form-group>
						</div>
						<div style="margin: 30px 0">
							<b-form-group label="Speeding Time Limit (s)" label-cols="6">
								<b-form-input 
									id="speeding-time-limit" 
									size="sm" 
									v-model="modal.speeding_time_limit"
									style="width: 100%"
								></b-form-input>
							</b-form-group>
						</div>
						<div style="margin: 30px 0">
							<b-form-group label="Speeding Speed Limit (km/h)" label-cols="6">
								<b-form-input 
									id="speeding-speed-limit" 
									size="sm" 
									v-model="modal.speeding_speed_limit"
									style="width: 100%"
								></b-form-input>
							</b-form-group>
						</div>
						<div style="margin: 30px 0">
							<b-form-group label="Liveness Time Limit (s)" label-cols="6">
								<b-form-input 
									id="liveness-time-limit" 
									size="sm" 
									v-model="modal.liveness_time_limit"
									style="width: 100%"
								></b-form-input>
							</b-form-group>
						</div>
						<b-button 
							variant="outline-primary" 
							size="sm" 
							style="float: right"
							@click="editParameter()"
						>Save</b-button>
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
import { fetchParameter, fetchParameters, fetchParametersSearch, updateParameter, fetchRouteNameDatalist, fetchRefreshParameters } from "@/api/index.js"
import Map from "@/components/Map";

export default {
	name: "Parameters",
	components: {
		Map,
	},
	data() {
		return {
			table: {
				fields: [
					{key: "name", sortable: true, label: "Route"}, 
					{key: "cell_size", sortable: true, label: "Cell Size"},
					{key: "stop_min_max_time", label: "Stop Min - Max Time"},
					{key: "speeding_time_speed_limit", label: "Speeding Time, Speed Limit"},
					{key: "liveness_time_limit", label: "Liveness Time Limit"},
					{key: "actions", label: ""},
				],
				parameters: [],
				hoveredRow: 0,
				delay: 250
			},
			pagination: {
				currentPage: 1,
				totalRows: 0,
				perPage: 0,
			},
			map: {
				geojson: null,
				polygon: null
			},
			search: {
				route_name: {
					input: "",
					options: []
				},
				minMatchingChar: 1
			},
			modal: {
				route_name: "",
				id: null,
				cell_size: null,
				stop_min_time: null,
				stop_max_time: null,
				speeding_time_limit: null,
				speeding_speed_limit: null,
				liveness_time_limit: null
			}
		}
	},
	methods: {
		modalInfo(row) {
			this.modal.id = row.id;
			this.modal.route_name = row.route_name;
			this.modal.cell_size = (row.cell_size !== 'null' ? row.cell_size : '-');
			this.modal.stop_min_time = (row.stop_min_time !== 'null' ? row.stop_min_time : '-');
			this.modal.stop_max_time = (row.stop_max_time !== 'null' ? row.stop_max_time : '-');
			this.modal.speeding_time_limit = (row.speeding_time_limit !== 'null' ? row.speeding_time_limit : '-');
			this.modal.speeding_speed_limit = (row.speeding_speed_limit !== 'null' ? row.speeding_speed_limit : '-');
			this.modal.liveness_time_limit = (row.liveness_time_limit !== 'null' ? row.liveness_time_limit : '-');
		},
		resetModal() {
			this.modal.id = null;
			this.modal.route_name = "";
			this.modal.cell_size = null;
			this.modal.stop_min_time = null;
			this.modal.stop_max_time = null;
			this.modal.speeding_time_limit = null;
			this.modal.speeding_speed_limit = null;
			this.modal.liveness_time_limit = null;
		},
		rowHovered(row) {
			this.table.hoveredRow = row.id;
			this.delay(this.table.delay)
				.then(() => {
					if (this.table.hoveredRow === row.id) {
						fetchParameter(row.id)
							.then(res => {
								if (res.data.ref_filename !== 'null' && res.data.stop_filename !== 'null') {
									this.map.geojson = res.data.geojson;
									this.map.polygon = this.definePolygon(res.data.polygon.coordinates);
								}
							})
							.catch(err => console.log(err))
					}
				})
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
			fetchParameters(page)
				.then(res => {
					this.table.parameters = res.data.parameters;
					this.pagination.currentPage = res.data.curr_page;
					this.pagination.totalRows = res.data.total_rows;
					this.pagination.perPage = res.data.per_page;
				})
				.catch(err => console.log(err));
		},
		editParameter() {
			const json = {
				cell_size: this.modal.cell_size,
				stop_min_time: this.modal.stop_min_time,
				stop_max_time: this.modal.stop_max_time,
				speeding_time_limit: this.modal.speeding_time_limit,
				speeding_speed_limit: this.modal.speeding_speed_limit,
				liveness_time_limit: this.modal.liveness_time_limit
			}
			updateParameter(this.modal.id, json)
				.then(res => {
					const index = this.table.parameters.findIndex(parameter => parameter.id == res.data.id);
					this.table.parameters[index].cell_size = res.data.cell_size;
					this.table.parameters[index].stop_min_time = res.data.stop_min_time;
					this.table.parameters[index].stop_max_time = res.data.stop_max_time;
					this.table.parameters[index].speeding_time_limit = res.data.speeding_time_limit;
					this.table.parameters[index].speeding_speed_limit = res.data.speeding_speed_limit;
					this.table.parameters[index].liveness_time_limit = res.data.liveness_time_limit;

					this.resetModal();
					this.$bvModal.hide("edit-modal")
				})
				.catch(err => console.log(err))
		},
		searchParameter() {
			const json = {
				parameter_name: this.search.route_name.input
			};
			fetchParametersSearch(json, 1)
				.then(res => {
					this.table.parameters = res.data.parameters;
					this.pagination.currentPage = res.data.curr_page;
					this.pagination.totalRows = res.data.total_rows;
					this.pagination.perPage = res.data.per_page;
				})
				.catch(err => console.log(err))
		},
		clearParameter() {
			this.search.route_name.input = "";
			this.$refs.routeNameInput.inputValue = "";

			fetchParameters(1)
				.then(res => {
					this.table.parameters = res.data.parameters;
					this.pagination.currentPage = res.data.curr_page;
					this.pagination.totalRows = res.data.total_rows;
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
		refreshParameters() {
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
		list_of_routes: function(routes) {
			const json = {
				routes: routes
			}
			fetchRefreshParameters(json)
				.then(res => {
					this.table.parameters = res.data.parameters;
					this.pagination.currentPage = res.data.curr_page;
					this.pagination.totalRows = res.data.total_rows;
					this.pagination.perPage = res.data.per_page;
				})
				.catch(err => console.log(err))
		}
	},
	created() {
		fetchParameters(1)
			.then(res => {
				this.table.parameters = res.data.parameters;
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