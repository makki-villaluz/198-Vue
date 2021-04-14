<template>
	<div>
		<b-card bg-variant="light" style="height: 300px">
			<div v-if="compute === false">
				<h4 style="text-align: center; margin: 0 0 30px">Speeding Violations</h4>
				<b-form @submit.prevent="getSpeeding">
					<b-form-group label="Input Time Limit (minutes)" label-cols="5" style="margin-bottom: 0px">
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
					<div v-if="stateTimeLimit==false" style="margin-top: 4px"></div>
					<div v-else style="margin-top: 27px"></div>
					<b-form-group label="Input Speed Limit (km/h)" label-cols="5" style="margin-bottom: 0px">
						<b-form-input 
							required 
							class="w-100" 
							v-model="speed_limit"
							:state="stateSpeedLimit"
							aria-describedby="speed-limit-validity"
							@update="validateSpeedLimit"
						></b-form-input>
						<b-form-invalid-feedback id="speed-limit-validity">
							Not a number greater than 0
						</b-form-invalid-feedback>
					</b-form-group>
					<div v-if="stateSpeedLimit==false" style="margin-top: 4px"></div>
					<div v-else style="margin-top: 27px"></div>
					<b-form-radio-group
						:options="options"
						v-model="speed_type"
					>
					</b-form-radio-group>
					<div v-if="stateSpeedLimit==false || stateTimeLimit==false">
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
			<div v-else-if="violations === null">
				<div class="center" style="height: 258px">
					<b-spinner label="spinning"></b-spinner>				
				</div>
			</div>
			<div v-else>
				<div v-if="violations.length">
					<h4 style="text-align: center">{{ violations.length }} Speeding Violations ({{ speed_limit }}km/h, {{ time_limit }}m, {{ speed_type }})</h4>
					<b-table
						outlined fixed hover small
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
				<div v-else>
					<div class="center" style="height: 258px">
						<h4 style="text-align: center">{{ violations.length }} Speeding Violations ({{ speed_limit }}km/h, {{ time_limit }}m)</h4>
					</div>
				</div>
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
import { fetchSpeedingViolations } from "@/api/index.js";

export default {
	Name: "Speeding",
	props: ["id"],
	data() {
		return {
			fields: ["number", "duration", { key: "time1", label: "Start" }, { key: "time2", label: "End" }],
			options: ["Location", "Explicit"],
			compute: false,
			speed_type: "Location",
			speed_limit: "",
			time_limit: "",
			violations: null,
			stateTimeLimit: null,
			stateSpeedLimit: null,
		}
	},
	methods: {
		getSpeeding() {
			this.compute = true;

			const formData = new FormData();
			formData.append("speed_type", this.speed_type);
			formData.append("speed_limit", this.speed_limit);
			formData.append("time_limit", this.time_limit);
			
			fetchSpeedingViolations(this.id, formData)
				.then(res => {
					this.violations = res.data;
					this.$emit("update-speeding-violations", this.violations);
				})
				.catch(err => console.log(err));
		},
		resetCard() {
			this.compute = false;
			this.speed_type = "Location";
			this.speed_limit = null;
			this.time_limit = null;
			this.violations = null;
			this.stateTimeLimit = null;
			this.stateSpeedLimit = null;
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
		},
		validateSpeedLimit() {
			if (this.speed_limit.length === 0) {
				this.stateSpeedLimit = null;
			}
			else if (Number.isNaN(Number(this.speed_limit)) || Number(this.speed_limit) <= 0) {
				this.stateSpeedLimit = false;
			}
			else {
				this.stateSpeedLimit = true;
			}
		},
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