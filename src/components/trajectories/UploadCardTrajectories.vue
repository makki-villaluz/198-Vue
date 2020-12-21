<template>
	<div>
		<b-card>
			<template #header>
				<h3>Upload Vehicle Trajectory GPX File</h3>
			</template>
			<b-form @submit.prevent="uploadTrajectory">
				<div style="margin-top: 30px">
					<b-form-group label="Input Name of File:">
						<b-form-input 
							required 
							class="w-100 form-control-sm" 
							v-model="name"
							:state="state"
							aria-describedby="invalid"
							@update="validateName"
						></b-form-input>
						<b-form-invalid-feedback style="margin-bottom: 0" id="invalid">
							Name already taken
						</b-form-invalid-feedback>
					</b-form-group>
				</div>
				<div v-if="state==false" style="margin-top: 0px"></div>
				<div v-else style="margin-top: 39px"></div>
				<b-form-file class="w-25" v-model="gpx_file" required plain></b-form-file>
				<div v-if="state==false" style="margin-top: 31px">
					<b-button disabled type="submit" variant="outline-primary" style="float: right">Upload</b-button>
				</div>
				<div v-else style="margin-top: 31px">
					<b-button type="submit" variant="outline-primary" style="float: right">Upload</b-button>
				</div>
			</b-form>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "UploadCardTrajectories",
	props: ["trajectories"],
	data() {
		return {
			name: "",
			gpx_file: null,
			state: null,
		}
	},
	methods: {
		validateName() {
			const taken = this.trajectories.find(trajectory => trajectory.name === this.name);
			
			if (this.name.length === 0) {
				this.state = null;
			}
			else if (taken === undefined) {
				this.state = true;
			}
			else {
				this.state = false;
			}
		},
		uploadTrajectory() {
			this.$emit("upload-trajectory", this.name, this.gpx_file);
			this.name = "";
			this.gpx_file = null;
		},
	},
}
</script>