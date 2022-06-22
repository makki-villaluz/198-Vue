<template>
	<div>
		<b-card bg-variant="light" style="height: 300px">
			<div v-if="violations === null">
				<div class="center" style="height: 258px">
					<b-spinner label="spinning"></b-spinner>				
				</div>
			</div>
			<div v-else>
				<div v-if="violations.length">
					<h4 style="text-align: center">
						{{ violations.length }} Stop Violations 
						<img src="/static/orangeMarker.png" height="30"> 
						<!-- <img src="../../../public/orangeMarker.png" height="30">  -->
						({{ min_time }}s - {{ max_time }}s)
					</h4>
					<b-table
						outlined hover small
						sticky-header="208px"
						head-variant="light"
						:fields="fields"
						:items="violations"
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
						<h4 style="text-align: center">{{ violations.length }} Stop Violations</h4>
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
	props: ["analysis_id"],
	data() {
		return {
			fields: ["number", {key: "violation", label: "Type"}, "duration", {key: "time1", label: "Start"}, {key: "time2", label: "End"}],
			violations: null,
			min_time: null,
			max_time: null
		}
	},
	watch: {
		"analysis_id" (analysis_id) {
			if (analysis_id !== 'null') {
				fetchStopViolations(analysis_id)
					.then(res => {
						this.min_time = res.data.min_time;
						this.max_time = res.data.max_time;
						this.violations = res.data.violations;
						this.$emit("update-stop-violations", this.violations);
					})
					.catch(err => console.log(err))
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