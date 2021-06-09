<template>
	<div>
		<b-card bg-variant="light" style="height: 300px">
			<div v-if="violation.violations === null">
				<div class="center" style="height: 258px">
					<b-spinner label="spinning"></b-spinner>				
				</div>
			</div>
			<div v-else>
				<div v-if="violation.violations.length">
					<h4 style="text-align: center">{{ violation.violations.length }} Stop Violations</h4>
					<b-table
						outlined hover small
						sticky-header="208px"
						head-variant="light"
						:fields="violation.fields"
						:items="violation.violations"
						style="marign-bottom: 0px"
					>
						<template #cell(number)="row">
							{{ row.index + 1}}
						</template>
						<template #cell(duration)="row">
							{{ row.item.duration }}s
						</template>
					</b-table>
				</div>
				<div v-else>
					<div class="center" style="height: 258px">
						<h4 style="text-align: center">{{ violation.violations.length }} Stop Violations</h4>
					</div>
				</div>
			</div>
		</b-card>
	</div>
</template>

<script>
import { fetchStopViolations } from "@/api/index.js";

export default {
	name: "Stop",
	props: ["id", "stops_id"],
	data() {
		return {
			stop: {
				stops: [],
				fields: ["name", "min_time", "max_time"],
				selected: [],
			},
			violation: {
				violations: null,
				fields: ["number", {key: "violation", label: "Type"}, "duration", {key: "time1", label: "Start"}, {key: "time2", label: "End"}]
			},
		}
	},
	watch: {
		"stops_id" (stops_id) {
			fetchStopViolations(this.id, stops_id)
				.then(res => {
					this.violation.violations = res.data;
					this.$emit("update-stop-violations", this.violation.violations);
				})
				.catch(err => console.log(err))
		
		}
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