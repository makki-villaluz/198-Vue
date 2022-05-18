<template>
	<div>
		<b-card bg-variant="light">
			<div 
				class="d-flex justify-content-center" 
				style="align-items: center; height: 86px" 
				v-if="loops === null"
			>
				<b-spinner label="spinning"></b-spinner>
			</div>
			<div 
				class="d-flex justify-content-center"
				style="align-items: center; height: 86px"
				v-else
			>
				<div style="text-align: center">
					<h5 style="margin-bottom: 0">Loops Counted</h5>
					<h2 style="margin-bottom: 0">{{ loops }} loops</h2>
				</div>
			</div>
		</b-card>
	</div>
</template>

<script>
import { fetchLoops } from "@/api/index.js";

export default {
	name: "Loop",
	props: ["analysis_id"],
	data() {
		return {
			loops: null,
		}
	},
	watch: {
		"analysis_id" (analysis_id) {
			if (analysis_id !== 'null') {
				fetchLoops(analysis_id)
					.then(res => this.loops = res.data.loops)
					.catch(err => console.log(err));
			}
		}
	},
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>