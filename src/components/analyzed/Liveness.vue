<template>
	<div>
		<b-card bg-variant="light" style="height: 300px">
			<div v-if="segments === null">
				<div class="center" style="height: 258px">
					<b-spinner label="spinning"></b-spinner>				
				</div>
			</div>
			<div v-else>
				<h4 style="text-align: center">{{ total_liveness }}s of Liveness ({{ time_limit }}s)</h4>
				<b-table
					outlined fixed hover small
					sticky-header="190px"
					head-variant="light"
					:fields="fields"
					:items="segments"
					style="margin-bottom: 5px"
				>
					<template #cell(segment)="row">
						{{ row.index + 1}}
					</template>
					<template #cell(liveness)="row">
						{{ row.item.liveness }}s
					</template>
				</b-table>
			</div>
		</b-card>
	</div>
</template>

<script>
import { fetchLiveness } from "@/api/index.js";

export default {
	name: "Liveness",
	props: ["analysis_id"],
	data() {
		return {
			fields: ["segment", "liveness", {key: "time1", label: "Start"}, {key: "time2", label: "End"}],
			time_limit: "",
			total_liveness: null,
			segments: null,
		}
	},
	watch: {
		"analysis_id" (analysis_id) {
			if (analysis_id !== 'null') {
				fetchLiveness(analysis_id)
					.then(res => {
						this.time_limit = res.data.time_limit;
						this.total_liveness = res.data.total_liveness;
						this.segments = res.data.segments;
					})
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