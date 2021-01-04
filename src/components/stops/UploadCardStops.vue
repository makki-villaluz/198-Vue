<template>
	<div>
		<b-card>
			<template #header>
				<h3>Upload Stop Coordinates</h3>
			</template>
			<div v-if="addStopPage === 0">
				<b-form @submit.prevent="goToNextPage">
					<div style="margin-top: 0px">
						<b-form-group label="Input Name" style="margin-bottom: 0px">
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
						<b-form-group label="Min Time (s)" label-cols="4" style="margin-bottom: 0px">
							<b-form-input 
								required 
								class="form-control-sm" 
								v-model="min_time"
								:state="inputState.min_time"
								aria-describedby="min-time-validity"
								@update="validateTime"
							></b-form-input>
							<b-form-invalid-feedback id="min-time-validity">
								Not a number greater than 0
							</b-form-invalid-feedback>
						</b-form-group>
						<div v-if="inputState.min_time==false" style="margin-top: 4px"></div>
						<div v-else style="margin-top: 20px"></div>
						<b-form-group label="Max Time (s)" label-cols="4" style="margin-bottom: 0px">
							<b-form-input 
								required 
								class="form-control-sm" 
								v-model="max_time"
								:state="inputState.max_time"
								aria-describedby="max-time-validity"
								@update="validateTime"
							></b-form-input>
							<b-form-invalid-feedback id="max-time-validity">
								Not a number greater than min time
							</b-form-invalid-feedback>
						</b-form-group>
						<div v-if="inputState.max_time==false" style="margin-top: 4px"></div>
						<div v-else style="margin-top: 20px"></div>
					</div>
					<div v-if="inputState.name==false || inputState.min_time==false || inputState.max_time==false">
						<b-button
							disabled
							type="submit"
							style="float: right"
							variant="outline-info"
						>Add Data</b-button>
					</div>
					<div v-else>
						<b-button
							type="submit"
							style="float: right"
							variant="outline-info"
						>Add Data</b-button>
					</div>					
				</b-form>
			</div>
			<div v-else-if="addStopPage === 1">
					<b-form @submit.prevent="goToNextPage">
						<div style="margin-top: 15px">
							<p>Input Top Left Point</p>
							<b-form-group label="Latitude" label-cols="4" style="margin: 37px 0 0">
								<b-form-input 
									required 
									class="form-control-sm" 
									v-model="inputStop.lat1"
									:state="inputState.lat1"
									aria-describedby="lat1-validity"
									@update="validateStopLat1"
								></b-form-input>
								<b-form-invalid-feedback id="lat1-validity">
									Not a number
								</b-form-invalid-feedback>
							</b-form-group>
							<div v-if="inputState.lat1==false" style="margin-bottom: 4px"></div>
							<div v-else style="margin-bottom: 20px"></div>
							<b-form-group label="Longitude" label-cols="4" style="margin-bottom: 0px">
								<b-form-input 
									required 
									class="form-control-sm" 
									v-model="inputStop.long1"
									:state="inputState.long1"
									aria-describedby="long1-validity"
									@update="validateStopLong1"
								></b-form-input>
								<b-form-invalid-feedback id="long1-validity">
									Not a number
								</b-form-invalid-feedback>
							</b-form-group>
							<div v-if="inputState.long1==false" style="margin-top: 17px"></div>
							<div v-else style="margin-top: 33px"></div>
						</div>
						<div v-if="inputState.lat1==false || inputState.long1==false">
							<b-button
								disabled
								type="submit"
								variant="outline-info"
								style="float: right"
							>Add Point</b-button>
						</div>
						<div v-else>
							<b-button
								type="submit"
								variant="outline-info"
								style="float: right"
							>Add Point</b-button>
						</div>
					</b-form>
			</div>
			<div v-else-if="addStopPage === 2">
				<b-form @submit.prevent="addPoints">
					<div style="margin-top: 15px">
						<p>Input Bottom Right Point</p>
						<b-form-group label="Latitude" label-cols="4" style="margin: 37px 0 0">
							<b-form-input 
								required 
								class="form-control-sm" 
								v-model="inputStop.lat2"
								:state="inputState.lat2"
								aria-describedby="lat2-validity"
								@update="validateStopLat2"
							></b-form-input>
							<b-form-invalid-feedback id="lat2-validity">
								Not a number
							</b-form-invalid-feedback>
						</b-form-group>
						<div v-if="inputState.lat1==false" style="margin-bottom: 4px"></div>
						<div v-else style="margin-bottom: 20px"></div>
						<b-form-group label="Longitude" label-cols="4" style="margin-bottom: 0px">
							<b-form-input 
								required 
								class="form-control-sm" 
								v-model="inputStop.long2"
								:state="inputState.long2"
								aria-describedby="long2-validity"
								@update="validateStopLong2"
							></b-form-input>
							<b-form-invalid-feedback id="long2-validty">
								Not a number
							</b-form-invalid-feedback>
						</b-form-group>
						<div v-if="inputState.long1==false" style="margin-top: 17px"></div>
						<div v-else style="margin-top: 33px"></div>
					</div>
					<div v-if="inputState.lat2==false || inputState.long2==false">
						<b-button
							disabled
							type="submit"
							variant="outline-info"
							style="float: right"
						>Add Point</b-button>
					</div>
					<div v-else>
						<b-button
							type="submit"
							variant="outline-info"
							style="float: right"
						>Add Point</b-button>
					</div>
				</b-form>
			</div>
			<div v-else-if="addStopPage === 3">
				<div style="height: 205px">
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
			<div style="float: left; margin: 7px 0 7px">
				<PageIndicator :pages="4" :currentPage="addStopPage + 1" iconSize="0.6"/>
			</div>
		</b-card>
	</div>
</template>

<script>
import PageIndicator from "@/components/stops/PageIndicator";

export default {
	name: "UploadStops",
	props: ["stops"],
	components: {
		PageIndicator,
	},
	data() {
		return {
			name: "",
			filename: "",
			min_time: "",
			max_time: "",
			stop: [],
			addStopPage: 0,
			inputStop: {
				lat1: "",
				long1: "",
				lat2: "",
				long2: "",
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
			this.min_time = "";
			this.max_time = "";
			this.stop = [];
			this.inputState.name = null;
			this.inputState.min_time = null;
			this.inputState.max_time = null;
		},
		clearAddStopPages() {
			this.inputStop.lat1 = "";
			this.inputStop.long1 = "";
			this.inputStop.lat2 = "";
			this.inputStop.long2 = "";
			this.inputState.lat1 = null;
			this.inputState.long1 = null;
			this.inputState.lat2 = null;
			this.inputState.long2 = null;
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
		validateTime() {
			if (this.min_time.length === 0) {
				this.inputState.min_time = null;
			}
			else if (Number.isNaN(Number(this.min_time)) || Number(this.min_time) <= 0) {
				this.inputState.min_time = false;
			}
			else {
				this.inputState.min_time = true;
			}

			if (this.max_time.length === 0) {
				this.inputState.max_time = null;
			}
			else if (Number.isNaN(Number(this.max_time)) || Number(this.max_time) <= Number(this.min_time)) {
				this.inputState.max_time = false;
			}
			else {
				this.inputState.max_time = true;
			}
		},
		validateStopLat1() {
			if (this.inputStop.lat1.length === 0) {
				this.inputState.lat1 = null;
			}
			else if (Number.isNaN(Number(this.inputStop.lat1))) {
				this.inputState.lat1 = false;
			}
			else {
				this.inputState.lat1 = true;
			}
		},
		validateStopLong1() {
			if (this.inputStop.long1.length === 0) {
				this.inputState.long1 = null;
			}
			else if (Number.isNaN(Number(this.inputStop.long1))) {
				this.inputState.long1 = false;
			}
			else {
				this.inputState.long1 = true;
			}
		},
		validateStopLat2() {
			if (this.inputStop.lat2.length === 0) {
				this.inputState.lat2 = null;
			}
			else if (Number.isNaN(Number(this.inputStop.lat2))) {
				this.inputState.lat2 = false;
			}
			else {
				this.inputState.lat2 = true;
			}
		},
		validateStopLong2() {
			if (this.inputStop.long2.length === 0) {
				this.inputState.long2 = null;
			}
			else if (Number.isNaN(Number(this.inputStop.long2))) {
				this.inputState.long2 = false;
			}
			else {
				this.inputState.long2 = true;
			}
		},
		validateStopPoints() {
			if (Number(this.inputStop.lat1) <= Number(this.inputStop.lat2) || Number(this.inputStop.long1) >= Number(this.inputStop.long2)) {
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