<template>
	<div>
		<b-card bg-variant="light" style="height: 300px">
			<div 
				class="center" 
				style="height: 258px"
				v-if="violations === null"
			>
				<b-spinner label="spinning"></b-spinner>				
			</div>
			<div v-else>
				<h4 style="text-align: center">{{ violations.length }} Speeding Violations ({{ speed_limit }}km/h, {{ time_limit }}s)</h4>
				<b-table
					outlined hover small
					sticky-header="190px"
					head-variant="light"
					:fields="fields"
					:items="violations"
					style="margin-bottom: 0px"
				>
					<template #cell(number)="row">
						{{ row.index + 1 }}
					</template>
					<template #cell(duration)="row">
						{{ row.item.duration }}s
					</template>
				</b-table>
			</div>
		</b-card>
	</div>
</template>

<script>
import { fetchSpeedingViolations } from "@/api/index.js";

export default {
	Name: "Speeding",
	props: ["analysis_id"],
	data() {
		return {
			fields: ["number", "duration", { key: "time1", label: "Start" }, { key: "time2", label: "End" }],
			violations: null,
			speed_limit: null,
			time_limit: null
		}
	},
	watch: {
		"analysis_id" (analysis_id) {
			if (analysis_id !== 'null') {
				fetchSpeedingViolations(analysis_id)
					.then(res => {
						this.speed_limit = res.data.speed_limit;
						this.time_limit = res.data.time_limit;
						this.violations = res.data.violations;
						this.$emit("update-speeding-violations", this.violations);
					})
					.catch(err => console.log(err));
				
			}
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