<template>
	<div>
		<b-card>
			<template #header>
				<h3>Vehicle Trajectory Uploader</h3>
			</template>
			<b-form @submit.prevent="uploadTrajectory">
				<b-form-group label="Input Trip Data Name" style="margin: 0">
					<b-form-input 
						required 
						class="w-100 form-control-sm" 
						v-model="name"
						:state="inputState.name"
						aria-describedby="invalid"
						@update="validateName"
					></b-form-input>
					<b-form-invalid-feedback style="margin-bottom: 0" id="invalid">
						Name already taken
					</b-form-invalid-feedback>
				</b-form-group>
				<div v-if="inputState.name==false" style="margin-top: 4px"></div>
				<div v-else style="margin-top: 27px"></div>
				<b-form-group label="Route" style="margin-bottom: 27px" label-cols="2">
					<b-form-select 
						required
						class="w-100 form-control-sm"
						v-model="route_selected"
						:options="route_options"
					>
					</b-form-select>
				</b-form-group>
				<b-form-group label="Stops" style="margin-bottom: 27px" label-cols="2">
					<b-form-select 
						required
						class="w-100 form-control-sm"
						v-model="stops_selected"
						:options="stops_options"
					>
					</b-form-select>
				</b-form-group>
				<b-form-file v-model="gpx_file" required plain></b-form-file>
				<div v-if="inputState.name==false" style="margin-top: 0px">
					<b-button disabled type="submit" variant="outline-primary" style="float: right">Upload</b-button>
				</div>
				<div v-else style="margin-top: 0px">
					<b-button type="submit" variant="outline-primary" style="float: right">Upload</b-button>
				</div>
			</b-form>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "UploadCardTrajectories",
	props: ["trajectories", "route_options", "stops_options"],
	data() {
		return {
			name: "",
			gpx_file: null,
			inputState: {
				name: null,
			},
			route_selected: null,
			stops_selected: null,
		}
	},
	methods: {
		validateName() {
			const taken = this.trajectories.find(trajectory => trajectory.name === this.name);
			
			if (this.name.length === 0) {
				this.inputState.name = null;
			}
			else if (taken === undefined) {
				this.inputState.name = true;
			}
			else {
				this.inputState.name = false;
			}
		},
		uploadTrajectory() {
			this.$emit("upload-trajectory", this.name, this.gpx_file, this.route_selected, this.stops_selected);
			this.name = "";
			this.gpx_file = null;
			this.inputState.name = null;
			this.route_selected = null;
			this.stops_selected = null;
		},
	},
}
</script>