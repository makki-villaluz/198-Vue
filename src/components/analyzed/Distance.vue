<template>
	<div>
		<b-card bg-variant="light">
			<div 
				class="d-flex justify-content-center" 
				style="align-items: center; height: 86px" 
				v-if="distance === null"
			>
				<b-spinner label="spinning"></b-spinner>
			</div>			
			<div v-else>
				<div style="text-align: center">
					<h5 style="margin-bottom: 0">Total Distance Traveled</h5>
					<h2 style="margin-bottom: 0">{{ distance }} km</h2>
				</div>
			</div>
		</b-card>
	</div>
</template>

<script>
import { fetchDistance } from "@/api/index.js";

export default {
	name: "Distance",
	props: ["analysis_id"],
	data() {
		return {
			distance: null,
		}
	},
  watch: {
		"analysis_id" (analysis_id) {
			if (analysis_id !== 'null') {
				fetchDistance(analysis_id)
					.then(res => this.distance = res.data.distance)
					.catch(err => console.log(err));
			}
		}
  },
}
</script>