<template>
	<div>
		<b-card>
			<template #header>
				<h3>Upload Route Trajectory GPX File</h3>
			</template>
			<b-form @submit.prevent="uploadRoute">
				<div style="margin-top: 15px">
					<b-form-group label="Input Name of File:">
						<b-form-input 
							required 
							class="w-100 form-control-sm"
							v-model="name"
							:state="inputState"
							aria-describedby="invalid"
							@update="validateName"
						></b-form-input>
					<b-form-invalid-feedback style="margin-bottom: 0" id="invalid">
							Name already taken
					</b-form-invalid-feedback>
					</b-form-group>
					<b-form-group label="Cell Size (km):" label-cols="5">
						<b-form-input class="form-control-sm" required v-model="cell_size"></b-form-input>
					</b-form-group>
				</div>
				<b-form-file class="w-25" v-model="gpx_file" required plain></b-form-file>
				<div v-if="inputState==false" style="margin-top: 15px">
					<b-button disabled type="submit" variant="outline-primary" style="float: right">Upload</b-button>
				</div>
				<div v-else>
					<b-button type="submit" variant="outline-primary" style="float: right">Upload</b-button>
				</div>
			</b-form>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "UploadCardRoute",
	props: ["routes"],
	data() {
		return {
			name: "",
			cell_size: null,
			gpx_file: null,
			inputState: {
				name: null,
				cell_size: null,
			},
		}
	},
	methods: {
		validateName() {
			const taken = this.routes.find(route => route.name === this.name);

			if (this.name.length === 0) {
				this.inputState = null;
			}
			else if (taken === undefined) {
				this.inputState = true;
			}
			else {
				this.inputState = false;
			}
		},
		uploadRoute() {
			this.$emit("upload-route", this.name, this.cell_size, this.gpx_file);
			this.name = "";
			this.cell_size = null;
			this.gpx_file = null;
		}
	}
}
</script>