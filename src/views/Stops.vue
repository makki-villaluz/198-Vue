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
					:polygon="map.polygon"
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
import { fetchStop, postStop, updateStop, removeStop, fetchStops} from "@/api/index.js";
import UploadCardStops from "@/components/stops/UploadCardStops";
import FileTableStops from "@/components/stops/FileTableStops";
import Map from "@/components/Map";

export default {
	name: "Stops",
	components: {
		UploadCardStops,
		FileTableStops,
		Map,
	},
	data() {
		return {
			map: {
				polygon: null,
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
		definePolygon(geojson) {
			const latlng = geojson.map(x => [x[1], x[0]]);

			var result = [];
			for (var i = 0; i < latlng.length; i += 2) {
				const upperLeft = latlng[i];
				const upperRight = [latlng[i][0], latlng[i+1][1]];
				const lowerRight = latlng[i+1];
				const lowerLeft = [latlng[i+1][0], latlng[i][1]];

				result.push([upperLeft, upperRight, lowerRight, lowerLeft]);
			}

			return result;
		},
		rowSelected(selected) {
			if (selected.length) {
				fetchStop(selected[0].id)
					.then(res => {
						this.map.polygon = this.definePolygon(res.data.geojson.coordinates);
					})
			}
			else {
				this.map.polygon = null;
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

			postStop(data)
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

			updateStop(id, formData)
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
			removeStop(id)
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
		fetchStops()
			.then(res => this.stops = res.data)
			.catch(err => console.log(err));
	},
}
</script>