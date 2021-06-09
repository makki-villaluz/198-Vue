<template>
	<div>
		<b-card bg-variant="light" style="height: 128px">
			<div 
				class="d-flex justify-content-center" 
				style="align-items: center" 
				v-if="loops === null"
			>
				<b-spinner label="spinning"></b-spinner>
			</div>
			<div v-else>
				<div style="text-align: center; padding-top: 12px">
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
	props: ["id", "route_id"],
	data() {
		return {
			loops: null,
		}
	},
	watch: {
		"route_id" (route_id) {
			fetchLoops(this.id, route_id)
				.then(res => this.loops = res.data.loops)
				.catch(err => console.log(err));
		}
	},
}
</script>