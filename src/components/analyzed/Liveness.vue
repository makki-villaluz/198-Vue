<template>
	<div>
		<b-card bg-variant="light" style="height: 300px">
			<div v-if="compute === false">
				<h4 style="text-align: center">Liveness Checking</h4>
				<b-form @submit.prevent="getLiveness">
					<b-form-group label="Input Time Limit (s)" style="margin: 20px 0 0">
						<b-form-input 
							required 
							class="w-100" 
							v-model="time_limit"
							:state="stateTimeLimit"
							aria-describedby="time-limit-validity"
							@update="validateTimeLimit"
						></b-form-input>
						<b-form-invalid-feedback id="time-limit-validity">
							Not a number greater than 0
						</b-form-invalid-feedback>
					</b-form-group>
					<div v-if="stateTimeLimit==false">
						<b-button 
							disabled
							type="submit" 
							variant="outline-primary" 
							style="position: absolute; bottom: 20px; right: 20px"
						>Compute</b-button>
					</div>
					<div v-else>
						<b-button 
							type="submit" 
							variant="outline-primary" 
							style="position: absolute; bottom: 20px; right: 20px"
						>Compute</b-button>
					</div>
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
import { fetchLiveness } from "@/api/index.js";

export default {
	name: "Liveness",
	props: ["id"],
	data() {
		return {
			fields: ["segment", "liveness", {key: "time1", label: "Start"}, {key: "time2", label: "End"}],
			time_limit: "",
			compute: false,
			liveness: null,
			stateTimeLimit: null,
		}
	},
	methods: {
		getLiveness() {
			this.compute = true;

			const formData = new FormData();
			formData.append("time_limit", this.time_limit);
			
			fetchLiveness(this.id, formData)
				.then(res => this.liveness = res.data)
				.catch(err => console.log(err));
		},
		resetCard() {
			this.time_limit = null;
			this.compute = false;
			this.liveness = null;
			this.stateTimeLimit = null;
		},
		validateTimeLimit() {
			if (this.time_limit.length === 0) {
				this.stateTimeLimit = null;
			}
			else if (Number.isNaN(Number(this.time_limit)) || Number(this.time_limit) <= 0) {
				this.stateTimeLimit = false;
			}
			else {
				this.stateTimeLimit = true;
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