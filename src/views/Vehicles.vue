<template>
	<b-container fluid>
		<b-row style="margin: 32px 0">
			<b-col cols="7">
				<b-card style="height: 784px">
					<template #header>
						<h3>Vehicles</h3>
					</template>
					<div style="margin: 12px 0 0">
						<b-form inline>
							<label for="vehicle-name-form" style="padding-right: 15px">ID</label>
							<vue-bootstrap-typeahead 
								ref="vehicleNameInput"
								v-model="search.vehicle_name.input"
								:data="search.vehicle_name.options"
								size="sm"
								:minMatchingChars="search.minMatchingChar"
								@input="vehicleNameAutoComplete()"
							/>
							<label for="route-name-form" style="padding: 0 15px">Route</label>
							<vue-bootstrap-typeahead 
								ref="routeNameInput"
								v-model="search.route_name.input"
								:data="search.route_name.options"
								size="sm"
								:minMatchingChars="search.minMatchingChar"
								@input="routeNameAutoComplete()"
							/>
							<label for="date-form" style="padding: 0 15px">Date</label>
							<b-form-datepicker 
								v-model="search.date.input"
								id="date-form" 
								size="sm" 
								:date-format-options="{month: 'short', day: '2-digit', year: 'numeric'}"
							></b-form-datepicker>
						</b-form>
						<div style="margin: 15px 0 0">
							<b-button 
								size="sm" 
								variant="outline-primary"
								@click="searchVehicle()"
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
							hover selectable
							sort-icon-left
							select-mode="single"							
							:fields="table.fields"
							:items="table.vehicles"
							@row-hovered="rowHovered"
							@row-unhovered="rowUnhovered"
							@row-selected="rowSelected"
						>
							<template #cell(vehicle_id)="row">
								<div class="data-row">{{ row.item.vehicle_id }}</div>
							</template>
							<template #cell(route_name)="row">
								<div class="data-row">{{ row.item.route_name }}</div>
							</template>
							<template #cell(date_uploaded)="row">
								<div class="data-row">{{ row.item.date_uploaded }}</div>
							</template>
						</b-table>
						<div v-if="table.vehicles.length === 0" style="margin: 32px 0 0">
							<p>No Vehicles Found</p>
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
			</b-col>
			<b-col>
				<Map
					:geojson="map.geojson"
				/>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import { fetchVehicle, fetchVehicles, fetchVehiclesSearch, fetchVehicleNameDatalist, fetchRouteNameDatalist } from "@/api/index.js"
import Map from "@/components/Map";

export default {
	name: "Vehicles",
	components: {
		Map,
	},
	data() {
		return {
			table: {
				fields: [
					{key: "name", sortable: true, label: "Name"}, 
					{key: "route_name", sortable: true, label: "Route"}, 
					{key: "date_uploaded", sortable: true, label: "Date"}
				],
				vehicles: [],
				hoveredRow: 0,
				delay: 250,
			},
			pagination: {
				currentPage: 1,
				totalRows: 0,
				perPage: 0,
			},
			map: {
				geojson: null,
			},
			search: {
				vehicle_name: {
					input: "",
					options: []
				},
				route_name: {
					input: "",
					options: []
				},
				date: {
					input: ""
				},
				active: false,
				minMatchingChar: 1
			},
		}
	},
	methods: {
		rowHovered(row) {
			this.table.hoveredRow = row.id;
			this.delay(this.table.delay)
				.then(() => {
					if (this.table.hoveredRow === row.id) {
						fetchVehicle(row.id)
							.then(res => {
								this.map.geojson = res.data.geojson;
							})
							.catch(err => console.log(err))
					}
				})
		},
		rowUnhovered() {
			this.map.geojson = null;
			this.table.hoveredRow = 0;
		},
		rowSelected(row) {
			this.$router.push({name: "Analyzed", params: { id: row[0].id } })
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

			if (this.search.active) {
				const json = {
					vehicle_name: this.search.vehicle_name.input,
					route_name: this.search.route_name.input,
					date: this.search.date.input
				};
				fetchVehiclesSearch(json, page)
					.then(res => {
						this.table.vehicles = res.data.vehicles;
						this.pagination.currentPage = res.data.curr_page;
						this.pagination.totalRows = res.data.total_rows;
						this.pagination.perPage = res.data.per_page;
						this.search.active = true;
					})
					.catch(err => console.log(err));
			}
			else {
				fetchVehicles(page)
					.then(res => {
						this.table.vehicles = res.data.vehicles;
						this.pagination.currentPage = res.data.curr_page;
						this.pagination.totalRows = res.data.total_rows;
						this.pagination.perPage = res.data.per_page;
					})
					.catch(err => console.log(err));
			}
		},
		searchVehicle() {
			const json = {
				vehicle_name: this.search.vehicle_name.input,
				route_name: this.search.route_name.input,
				date: this.search.date.input
			};
			fetchVehiclesSearch(json, 1)
				.then(res => {
					this.table.vehicles = res.data.vehicles;
					this.pagination.currentPage = res.data.curr_page;
					this.pagination.totalRows = res.data.total_rows;
					this.pagination.perPage = res.data.per_page;
					this.search.active = true;
				})
				.catch(err => console.log(err))
		},
		clearSearch() {
			this.search.vehicle_name.input = "";
			this.$refs.vehicleNameInput.inputValue = "";

			this.search.route_name.input = "";
			this.$refs.routeNameInput.inputValue = "";

			this.search.date.input = "";
			this.search.active = false;
			
			fetchVehicles(1)
				.then(res => {
					this.table.vehicles = res.data.vehicles;
					this.pagination.currentPage = res.data.curr_page;
					this.pagination.totalRows = res.data.total_rows;
					this.pagination.perPage = res.data.per_page;
				})
				.catch(err => console.log(err));
		},
		vehicleNameAutoComplete() {
			const json = {
				vehicle_name: this.search.vehicle_name.input
			}
			fetchVehicleNameDatalist(json)
				.then(res => {
					this.search.vehicle_name.options = res.data.vehicles.map(String);
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
		delay(time) {
			return new Promise(resolve => setTimeout(resolve, time));
		}
	},
	created() {
		fetchVehicles(1)
			.then(res => {
				this.table.vehicles = res.data.vehicles;
				this.pagination.totalRows = res.data.total_rows;
				this.pagination.perPage = res.data.per_page;
			})
			.catch(err => console.log(err));
	}
}
</script>

<style scoped>
	h3 {
		display: inline-block;
		margin: 0;
	}
	.data-row {
		padding: 5px 0;
	}
	.b-calendar output {
    width: 100% !important;
	}
	.b-calendar .b-calendar-grid {
		width: 100% !important;
	}
</style>