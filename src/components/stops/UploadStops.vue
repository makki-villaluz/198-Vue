<template>
	<div>
		<b-card>
			<template #header>
				<h3>Upload Stop Coordinates</h3>
			</template>
			<div v-if="addStopsPage === 0">
				<b-form @submit.prevent="goToAddStopsPage">
					<b-form-group label="Input Name:">
						<b-form-input required class="w-100 form-control-sm" v-model="name"></b-form-input>
					</b-form-group>
					<b-form-group label="Input Minimum Time:">
						<b-form-input required class="w-100 form-control-sm" v-model="min_time"></b-form-input>
					</b-form-group>
					<b-form-group label="Input Maximum Time:">
						<b-form-input required class="w-100 form-control-sm" v-model="max_time"></b-form-input>
					</b-form-group>
					<b-button
						type="submit"
						style="float: right"
						variant="outline-info"
					>Add Points</b-button>
				</b-form>
			</div>
			<div v-else>
				<b-form @submit.prevent="addPoints">
					<p>Input Top Left and Bottom Right Points</p>
					<b-form-group label="Latitude Pt.1:" label-cols="5">
						<b-form-input required class="form-control-sm" v-model="inputStop.lat1"></b-form-input>
					</b-form-group>
					<b-form-group label="Longitude Pt.1:" label-cols="5">
						<b-form-input required class="form-control-sm" v-model="inputStop.long1"></b-form-input>
					</b-form-group>
					<b-form-group label="Latitude Pt.2:" label-cols="5">
						<b-form-input required class="form-control-sm" v-model="inputStop.lat2"></b-form-input>
					</b-form-group>
					<b-form-group label="Longitude Pt.2:" label-cols="5">
						<b-form-input required class="form-control-sm" v-model="inputStop.long2"></b-form-input>
					</b-form-group>
					<b-button
						style="float: right"
						variant="outline-primary"
						@click="uploadStops"
					>Submit</b-button>
					<b-button
						type="submit"
						style="margin-right: 5px; float: right"
						variant="outline-info"
					>Add Points</b-button>
				</b-form>
			</div>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "UploadStops",
	data() {
		return {
			name: "",
			filename: "",
			min_time: null,
			max_time: null,
			stops: [],
			addStopsPage: 0,
			inputStop: {
				lat1: null,
				long1: null,
				lat2: null,
				long2: null,
			},
		}
	},
	methods: {
		goToAddStopsPage() {
			this.addStopsPage = 1;
		},
		goToInfoStopsPage() {
			this.addStopsPage = 0;
		},
		clearInfoStopsPage() {
			this.name = "";
			this.filename = "";
			this.min_time = null;
			this.max_time = null;
			this.stops = [];
		},
		clearAddStopsPage() {
			this.inputStop.lat1 = null;
			this.inputStop.long1 = null;
			this.inputStop.lat2 = null;
			this.inputStop.long2 = null;
		},
		createFilename() {
			return this.name.split(" ").join("_").toLowerCase() + ".gpx";
		},
		addPoints() {
			const stop = {
				"lat1": this.inputStop.lat1,
				"long1": this.inputStop.long1,
				"lat2": this.inputStop.lat2,
				"long2": this.inputStop.long2,
			};

			this.stops.push(stop);
			this.clearAddStopsPage();
		},
		uploadStops() {
			this.filename = this.createFilename();

			this.$emit("upload-stop", this.name, this.filename, this.min_time, this.max_time, this.stops)
			
			this.goToInfoStopsPage();
			this.clearInfoStopsPage();
			this.clearAddStopsPage();
		},
	},
}
</script>