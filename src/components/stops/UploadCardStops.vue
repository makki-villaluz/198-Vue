<template>
	<div>
		<b-card>
			<template #header>
				<h3>Upload Stop Coordinates</h3>
			</template>
			<div v-if="addStopPage === 0">
				<b-form @submit.prevent="goToNextPage">
					<div style="margin-top: 6px">
						<b-form-group label="Input Name:">
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
						<b-form-group label="Minimum Time (seconds):" label-cols="8">
							<b-form-input required class="form-control-sm" v-model="min_time"></b-form-input>
						</b-form-group>
						<b-form-group label="Maximum Time (seconds):" label-cols="8">
							<b-form-input required class="form-control-sm" v-model="max_time"></b-form-input>
						</b-form-group>
					</div>
					<div style="margin-top: 5px">
						<b-button
							type="submit"
							style="float: right"
							variant="outline-info"
						>Add Points</b-button>
					</div>
				</b-form>
			</div>
			<div v-else-if="addStopPage === 1">
					<b-form @submit.prevent="goToNextPage">
						<div style="margin: 30px 0 30px">
							<p>Input Top Left Point</p>
							<b-form-group label="Latitude Point 1:" label-cols="6">
								<b-form-input required class="form-control-sm" v-model="inputStop.lat1"></b-form-input>
							</b-form-group>
							<b-form-group label="Longitude Point 1:" label-cols="6">
								<b-form-input required class="form-control-sm" v-model="inputStop.long1"></b-form-input>
							</b-form-group>
						</div>
						<b-button
							type="submit"
							variant="outline-info"
							style="float: right"
						>Add Point</b-button>
					</b-form>
			</div>
			<div v-else-if="addStopPage === 2">
				<b-form @submit.prevent="addPoints">
					<div style="margin: 30px 0 30px">
						<p>Input Bottom Right Point</p>
						<b-form-group label="Latitude Point 2:" label-cols="6">
							<b-form-input required class="form-control-sm" v-model="inputStop.lat2"></b-form-input>
						</b-form-group>
						<b-form-group label="Longitude Point 2:" label-cols="6">
							<b-form-input required class="form-control-sm" v-model="inputStop.long2"></b-form-input>
						</b-form-group>
					</div>
					<b-button
						type="submit"
						variant="outline-info"
						style="float: right"
					>Add Point</b-button>
				</b-form>
			</div>
			<div v-else-if="addStopPage === 3">
				<div style="height: 192px">
					<b-alert 
						:show="3"
						:variant="alert.variant"
						@dismissed="alert.showing = false"
						style="padding: 5px 20px 5px"
					>
						{{ alert.message }}
					</b-alert>
					<div v-if="alert.showing == false" style="padding-top: 25px">
					</div>
					<b-row>
						<b-col cols="5" style="padding-right: 0">
							<h5>Name:</h5>
							<h5>Min Time:</h5>
							<h5>Max Time:</h5>
							<h5>Stops:</h5>
						</b-col>
						<b-col cols="7" style="padding-left: 0">
							<h5>{{ name }}</h5>
							<h5>{{ min_time }}s</h5>
							<h5>{{ max_time }}s</h5>
							<h5>{{ stop.length }}</h5>
						</b-col>
					</b-row>
				</div>
				<div v-if="stop.length">
					<b-button
						style="float: right"
						variant="outline-primary"
						@click="uploadStop"
					>Upload</b-button>
				</div>
				<div v-else>
					<b-button
						style="float: right"
						variant="outline-primary"
						disabled
					>Upload</b-button>
				</div>
				<b-button
					variant="outline-info"
					style="margin-right: 5px; float: right"
					@click="goToAddStopPage"
				>Add More Points</b-button>
			</div>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "UploadStops",
	props: ["stops"],
	data() {
		return {
			name: "",
			filename: "",
			min_time: null,
			max_time: null,
			stop: [],
			addStopPage: 0,
			inputStop: {
				lat1: null,
				long1: null,
				lat2: null,
				long2: null,
			},
			inputState: {
				name: null,
				min_time: null,
				max_time: null,
				lat1: null,
				long1: null,
				lat2: null,
				long2: null,
			},
			alert: {
				message: "",
				variant: "",
				showing: true,
			}
		}
	},
	methods: {
		goToNextPage() {
			this.addStopPage += 1;
		},
		goToInfoStopPage() {
			this.addStopPage = 0;
			this.clearInfoStopPage();
			this.clearAddStopPages();
			this.clearAlert();
		},
		goToAddStopPage() {
			this.addStopPage = 1;
			this.clearAddStopPages();
			this.clearAlert();
		},
		clearInfoStopPage() {
			this.name = "";
			this.filename = "";
			this.min_time = null;
			this.max_time = null;
			this.stop = [];
		},
		clearAddStopPages() {
			this.inputStop.lat1 = null;
			this.inputStop.long1 = null;
			this.inputStop.lat2 = null;
			this.inputStop.long2 = null;
		},
		clearAlert() {
			this.alert.variant = "";
			this.alert.message = "";
			this.alert.showing = true;
		},
		validateName() {
			const taken = this.stops.find(stop => stop.name === this.name);

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
		validateStopPoints() {
			if (Number.isNaN(Number(this.inputStop.lat1)) || Number.isNaN(Number(this.inputStop.long1)) || Number.isNaN(Number(this.inputStop.lat2)) || Number.isNaN(Number(this.inputStop.long2))) {
				this.alert.variant = "danger";
				this.alert.message = "Invalid Numbers"

				return false;
			}
			else if (Number(this.inputStop.lat1) <= Number(this.inputStop.lat2) || Number(this.inputStop.long1) >= Number(this.inputStop.long2)) {
				this.alert.variant = "danger";
				this.alert.message = "Invalid Top Left, Bottom Right Points"
			
				return false;
			}
			else {
				this.alert.variant = "success";
				this.alert.message = "Stop Added"
			
				return true;
			}
		},
		createFilename() {
			return this.name.split(" ").join("_").toLowerCase() + ".gpx";
		},
		addPoints() {
			if (this.validateStopPoints()){
				const stop = {
					"lat1": this.inputStop.lat1,
					"long1": this.inputStop.long1,
					"lat2": this.inputStop.lat2,
					"long2": this.inputStop.long2,
				};

				this.stop.push(stop);
			}
			this.goToNextPage();
		},
		uploadStop() {
			this.filename = this.createFilename();

			this.$emit("upload-stop", this.name, this.filename, this.min_time, this.max_time, this.stop)
			
			this.goToInfoStopPage();
		},
	},
}
</script>