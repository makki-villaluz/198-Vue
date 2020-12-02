<template>
	<div>
		<b-card>
			<template #header>
				<h3>Upload Vehicle Trajectory GPX File</h3>
			</template>
			<b-form @submit.prevent="uploadTrajectory">
				<div style="margin: 30px 0 30px">
					<b-form-group label="Input Name of File:">
						<b-form-input class="w-100 form-control-sm" required v-model="name"></b-form-input>
					</b-form-group>
				</div>
				<b-form-file class="w-25" v-model="gpx_file" required plain></b-form-file>
				<div style="margin-top: 40px">
					<b-button type="submit" variant="outline-primary" style="float: right">Upload</b-button>
				</div>
			</b-form>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "UploadCardTrajectory",
	data() {
		return {
			name: "",
			gpx_file: null,
		}
	},
	methods: {
		uploadTrajectory() {
			this.$emit("upload-trajectory", this.name, this.gpx_file);
			this.name = "";
			this.gpx_file = null;
		}
	},
}
</script>