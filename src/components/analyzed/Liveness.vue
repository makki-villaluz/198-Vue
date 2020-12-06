<template>
	<div>
		<b-card bg-variant="light" style="height: 300px">
			<div v-if="compute === false">
				<h4 style="text-align: center">Liveness Checking</h4>
				<b-form @submit.prevent="getLiveness">
					<b-form-group label="Input Time Limit (seconds):" style="margin: 20px 0 0">
						<b-form-input class="w-100" required v-model="time_limit"></b-form-input>
					</b-form-group>
					<b-button 
						type="submit" 
						variant="outline-primary" 
						style="position: absolute; bottom: 20px; right: 20px"
					>Compute</b-button>
				</b-form>
			</div>
			<div v-else-if="liveness === null">
				<div class="center" style="height: 258px">
					<b-spinner label="spinning"></b-spinner>				
				</div>
			</div>
			<div v-else>
				<h4 style="text-align: center">{{ liveness.total_liveness }}s of Liveness ({{ time_limit }}s)</h4>
				<b-table
					outlined fixed hover small
					sticky-header="190px"
					head-variant="light"
					:fields="fields"
					:items="liveness.segments"
					style="margin-bottom: 5px"
				>
					<template #cell(segment)="row">
						{{ row.index + 1}}
					</template>
					<template #cell(liveness)="row">
						{{ row.item.liveness }}s
					</template>
				</b-table>
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
import axios from "axios";

export default {
	name: "Liveness",
	props: ["id"],
	data() {
		return {
			fields: ["segment", "liveness", {key: "time1", label: "Start"}, {key: "time2", label: "End"}],
			time_limit: null,
			compute: false,
			liveness: null,
		}
	},
	methods: {
		getLiveness() {
			this.compute = true;

			const formData = new FormData();
			formData.append("time_limit", this.time_limit);
			
			axios.post("http://localhost:5000/liveness/" + this.id.toString(), formData)
				.then(res => this.liveness = res.data)
				.catch(err => console.log(err));
		},
		resetCard() {
			this.time_limit = null;
			this.compute = false;
			this.liveness = null;
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