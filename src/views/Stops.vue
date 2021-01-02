<template>
	<div class="container-xl">
    <b-alert 
      style="margin: 30px 0 0"
      :variant="alert.variant"
      :show="alert.duration"
      @dismissed="resetAlert"
    >{{ alert.message }}</b-alert>
		<b-row style="margin-top: 30px">
			<b-col>
				<UploadCardStops
					:stops="stops"
					v-on:upload-stop="uploadStop"
				/>
			</b-col>
			<b-col cols="8">
				<Map
					:zoom="map.zoom"
					:center="map.center"
					:geojson="map.geojson"
				/>
			</b-col>
		</b-row>
		<div style="margin-top: 30px">
			<FileTableStops
				:stops="stops"
				v-on:row-selected="rowSelected"
				v-on:edit-stop="editStop"
				v-on:delete-stop="deleteStop"
			/>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import UploadCardStops from "@/components/stops/UploadCardStops";
import FileTableStops from "@/components/stops/FileTableStops";
import Map from "@/components/Map";

export default {
	name: "Stops",
	components: {
		UploadCardStops,
		FileTableStops,
		Map
	},
	data() {
		return {
			map: {
				zoom: 0,
				center: [0, 0],
				geojson: null,
			},
			alert: {
				message: "",
				variant: "",
				duration: 0,
			},
			stops: [],
		}
	},
	methods: {
		rowSelected(selected) {
			if (selected.length) {
				axios.get("http://localhost:5000/stop/" + selected[0].id.toString())
					.then(res => {
						this.map.center = [res.data.geojson.coordinates[0][1], res.data.geojson.coordinates[0][0]];
						this.map.geojson = res.data.geojson;
					})
					.catch(err => console.log(err))
				this.map.zoom = 12;
			}
			else {
				this.map.zoom = 0;
				this.map.center = [0, 0];
				this.map.geojson = null;
			}
		},
		uploadStop(name, filename, min_time, max_time, stops) {
			const data = {
				"name": name,
				"filename": filename,
				"min_time": min_time,
				"max_time": max_time,
				"stops": stops
			}

			axios.post("http://localhost:5000/stop", data)
				.then(res => {
					this.stops = [...this.stops, res.data];
          this.alert.message = "File successfully uploaded"
          this.alert.variant = "success"
          this.alert.duration = 3;
				})
				.catch(() => {
          this.alert.message = "File upload error occurred"
          this.alert.variant = "danger"
          this.alert.duration = 3;
        });
		},
		editStop(id, name, min_time, max_time) {
			const formData = new FormData();

			formData.append("name", name);
			formData.append("min_time", min_time);
			formData.append("max_time", max_time);

			axios.put("http://localhost:5000/stop/" + id.toString(), formData)
				.then(res => {
					const index = this.stops.findIndex(stop => stop.id == res.data.id);
					this.stops[index].name = res.data.name;
					this.stops[index].min_time = res.data.min_time;
					this.stops[index].max_time = res.data.max_time;
          this.alert.message = "File successfully edited";
          this.alert.variant = "success";
          this.alert.duration = 3;
				})
				.catch(() => {
          this.alert.message = "File edit error occurred";
          this.alert.variant = "danger";
          this.alert.duration = 3;
        });
		},
		deleteStop(id) {
			axios.delete("http://localhost:5000/stop/" + id.toString())
				.then(res => {
					this.stops = this.stops.filter(stop => stop.id !== res.data.id);
          this.alert.message = "File successfully deleted";
          this.alert.variant = "success";
          this.alert.duration = 3;
				})
				.catch(() => {
          this.alert.message = "File delete error occurred";
          this.alert.variant = "danger";
          this.alert.duration = 3;
        });
		},
    resetAlert() {
      this.alert.message = "";
      this.alert.variant = "";
      this.alert.duration = 0;
    },
	},
	created() {
		axios.get("http://localhost:5000/stop")
			.then(res => this.stops = res.data)
			.catch(err => console.log(err));
	},
}
</script>