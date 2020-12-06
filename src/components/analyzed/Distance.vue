<template>
	<div>
		<b-card bg-variant="light">
			<div 
				class="d-flex justify-content-center" 
				style="height: 62px; align-items: center" 
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
import axios from "axios";

export default {
	name: "Distance",
	props: ["id"],
	data() {
		return {
			distance: null,
		}
	},
  created() {
    axios.get("http://localhost:5000/distance/" + this.id.toString())
      .then(res => this.distance = res.data.distance)
      .catch(err => console.log(err));
  },
}
</script>