<template>
	<div>
		<b-card>
			<template #header>
				<h3>Route Trajectory Uploader</h3>
			</template>
			<b-form @submit.prevent="uploadRoute">
				<div style="margin-top: 14px">
					<b-form-group label="Input Route Name" style="margin-bottom: 0px">
						<b-form-input 
							required 
							class="w-100 form-control-sm"
							v-model="name"
							:state="inputState.name"
							aria-describedby="name-validity"
							@update="validateName"
						></b-form-input>
					<b-form-invalid-feedback id="name-validity">
							Name already taken
					</b-form-invalid-feedback>
					</b-form-group>
					<div v-if="inputState.name==false" style="margin-top: 4px"></div>
					<div v-else style="margin-top: 27px"></div>
					<b-form-group label="Cell Size (km)" label-cols="5" style="margin-bottom: 0px">
						<b-form-input 
							required 
							class="form-control-sm" 
							v-model="cell_size"
							:state="inputState.cell_size"
							aria-describedby="cell-size-validity"
							@update="validateCellSize"
						></b-form-input>
						<b-form-invalid-feedback id="cell-size-validity">
							Not a number greater than 0
						</b-form-invalid-feedback>
					</b-form-group>
					<div v-if="inputState.cell_size==false" style="margin-top: 4px"></div>
					<div v-else style="margin-top: 20px"></div>
				</div>
				<b-form-file 
					plain
					required
					v-model="gpx_file"
					style="margin-bottom: 14px" 
				></b-form-file>
				<div v-if="inputState.name==false || inputState.cell_size==false">
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
			cell_size: "",
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
				this.inputState.name = null;
			}
			else if (taken === undefined) {
				this.inputState.name = true;
			}
			else {
				this.inputState.name = false;
			}
		},
		validateCellSize() {
			if (this.cell_size.length === 0) {
				this.inputState.cell_size = null;
			}
			else if (Number.isNaN(Number(this.cell_size)) || Number(this.cell_size) <= 0) {
				this.inputState.cell_size = false;
			}
			else {
				this.inputState.cell_size = true;
			}
		},
		uploadRoute() {
			this.$emit("upload-route", this.name, this.cell_size, this.gpx_file);
			this.name = "";
			this.cell_size = "";
			this.gpx_file = null;
			this.inputState.name = null;
			this.inputState.cell_size = null;
		}
	}
}
</script>