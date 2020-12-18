<template>
	<div>
		<b-card bg-variant="light" style="height: 300px">
			<div v-if="compute === false">
				<h4 style="text-align: center; margin: 0 0 20px">Speeding Violations</h4>
				<b-form @submit.prevent="getSpeeding">
					<b-form-group label="Input Time Limit (minutes):">
						<b-form-input class="w-100" required v-model="time_limit"></b-form-input>
					</b-form-group>
					<b-form-group label="Input Speed Limit (km/h):">
						<b-form-input class="w-100" required v-model="speed_limit"></b-form-input>
					</b-form-group>
					<b-form-radio-group
					:options="options"
						v-model="speed_type"
					>
					</b-form-radio-group>
					<b-button 
						type="submit" 
						variant="outline-primary" 
						style="position: absolute; bottom: 20px; right: 20px"
					>Compute</b-button>
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
import axios from "axios";

export default {
	Name: "Speeding",
	props: ["id"],
	data() {
		return {
			fields: ["number", "duration", { key: "time1", label: "Start" }, { key: "time2", label: "End" }],
			options: ["Location", "Explicit"],
			compute: false,
			speed_type: "Location",
			speed_limit: null,
			time_limit: null,
			violations: null,
		}
	},
	methods: {
		getSpeeding() {
			this.compute = true;

			const formData = new FormData();
			formData.append("speed_type", this.speed_type);
			formData.append("speed_limit", this.speed_limit);
			formData.append("time_limit", this.time_limit);
			
			axios.post("http://localhost:5000/speeding/" + this.id.toString(), formData)
				.then(res => this.violations = res.data)
				.catch(err => console.log(err));
		},
		resetCard() {
			this.compute = false;
			this.speed_type = "Location";
			this.speed_limit = null;
			this.time_limit = null;
			this.violations = null;
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