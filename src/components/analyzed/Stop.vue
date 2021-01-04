<template>
	<div>
		<b-card bg-variant="light" style="height: 300px">
			<div v-if="stop.selected.length === 0">
				<h4 style="text-align: center">Stop Violations</h4>
				<p style="margin-bottom: 8px">Select stop checking stop violations</p>
				<b-table
					outlined fixed hover selectable small
					sticky-header="190px"
					head-variant="light"
					select-mode="single"
					:fields="stop.fields"
					:items="stop.stops"
					@row-selected="rowSelected"
					style="margin-bottom: 0"
				>
					<template #cell(min_time)="row">
						{{ row.item.min_time }}s
					</template>
					<template #cell(max_time)="row">
						{{ row.item.max_time }}s
					</template>
				</b-table>
			</div>
			<div v-else-if="violation.violations.length === null">
				<div class="center" style="height: 258px">
					<b-spinner label="spinning"></b-spinner>				
				</div>
			</div>
			<div v-else>
				<div v-if="violation.violations.length">
					<h4 style="text-align: center">{{ violation.violations.length }} Stop Violations</h4>
					<b-table
						outlined fixed hover small
						sticky-header="190px"
						head-variant="light"
						:fields="violation.fields"
						:items="violation.violations"
						style="marign-bottom: 0px"
					>
						<template #cell(number)="row">
							{{ row.index + 1}}
						</template>
					</b-table>
				</div>
				<div v-else>
					<div class="center" style="height: 258px">
						<h4 style="text-align: center">{{ violation.violations.length }} Stop Violations</h4>
					</div>
				</div>
				<b-button 
					variant="outline-secondary" 
					size="sm"
					style="position: absolute; bottom: 10px; right: 10px"
					@click="resetCard"
				>Compute Again</b-button>
			</div>
		</b-card>
	</div>
</template>

<script>
import axios from "axios"

export default {
	name: "Stop",
	props: ["id"],
	data() {
		return {
			stop: {
				stops: [],
				fields: ["name", "min_time", "max_time"],
				selected: [],
			},
			violation: {
				violations: null,
				fields: ["number", {key: "violation", label: "type"}, "duration", {key: "time1", label: "Start"}, {key: "time2", label: "End"}]
			},
		}
	},
	methods: {
		rowSelected(selected) {
			if (selected.length) {
				this.stop.selected = selected;
				axios.get("http://localhost:5000/stop/" + this.id.toString() + "/" + selected[0].id.toString())
					.then(res => this.violation.violations = res.data)
					.catch(err => console.log(err))
			}
		},
		resetCard() {
			this.stop.selected = [];
			this.violation.violations = null;
		}
	},
	created() {
		axios.get("http://localhost:5000/stop")
			.then(res => this.stop.stops = res.data)
			.catch(err => console.log(err))
	}
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>