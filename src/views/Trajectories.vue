<template>
  <div class="trajectory container-xl">
    <b-alert 
      style="margin: 30px 0 0"
      :variant="alert.variant"
      :show="alert.duration"
      @dismissed="resetAlert"
    >{{ alert.message }}</b-alert>
    <b-row style="margin-top: 30px">
      <b-col>
        <UploadCardTrajectories
          :trajectories="trajectories"
          :route_options="route_options"
          :stops_options="stops_options"
          v-on:upload-trajectory="uploadTrajectory"
        />
      </b-col>
      <b-col cols="8">
        <Map
          :geojson="map.geojson"
        />
      </b-col>
    </b-row>
    <div style="margin-top: 30px">
      <FileTableTrajectories
        :trajectories="trajectories"
        :route_options="route_options"
        :stops_options="stops_options"
        v-on:row-selected="rowSelected"
        v-on:edit-trajectory="editTrajectory"
        v-on:delete-trajectory="deleteTrajectory"
      />
    </div>
  </div>
</template>

<script>
import { fetchTrajectory, postTrajectory, updateTrajectory, removeTrajectory, fetchTrajectories, fetchRoutes, fetchStops } from "@/api/index.js";
import FileTableTrajectories from "@/components/trajectories/FileTableTrajectories";
import UploadCardTrajectories from "@/components/trajectories/UploadCardTrajectories";
import Map from "@/components/Map";

export default {
  name: "Trajectories",
  components: {
    FileTableTrajectories,
    UploadCardTrajectories,
    Map,
  },
  data() {
    return {
      map: {
        geojson: null,
      },
      alert: {
        message: "",
        variant: "",
        duration: 0,
      },
      trajectories: [],
      route_options: [{value: null, text: "Please select an option"}],
      stops_options: [{value: null, text: "Please select an option"}],
    }
  },
  methods: {
    rowSelected(selected) {
      if (selected.length) {
        fetchTrajectory(selected[0].id)
          .then(res => {
            this.map.geojson = res.data.geojson;
          })
          .catch(err => console.log(err));
      }
      else {
        this.map.geojson = null;
      }
    },
    uploadTrajectory(name, gpx_file, route_id, stops_id) {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("gpx_file", gpx_file);
      formData.append("route_id", route_id);
      formData.append("stops_id", stops_id);

      postTrajectory(formData)
        .then(res => {
          this.trajectories = [...this.trajectories, res.data];
          this.alert.message = "File successfully uploaded";
          this.alert.variant = "success";
          this.alert.duration = 3;
        })
        .catch(() => {
          this.alert.message = "File upload error occurred";
          this.alert.variant = "danger";
          this.alert.duration = 3;
        });
    },
    editTrajectory(id, name, route_id, stops_id) {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("route_id", route_id);
      formData.append("stops_id", stops_id);

      updateTrajectory(id, formData)
        .then(res => {
          const index = this.trajectories.findIndex(trajectory => trajectory.id == res.data.id);
          this.trajectories[index].name = res.data.name;
          this.trajectories[index].route_id = res.data.route_id;
          this.trajectories[index].route_name = res.data.route_name;
          this.trajectories[index].stops_id = res.data.stops_id;
          this.trajectories[index].stops_name = res.data.stops_name;
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
    deleteTrajectory(id) {
      removeTrajectory(id)
        .then(res => { 
          this.trajectories = this.trajectories.filter(trajectory => trajectory.id !== res.data.id);
          this.alert.message = "File successfully deleted"
          this.alert.variant = "success"
          this.alert.duration = 3;
        })
        .catch(() => {
          this.alert.message = "File delete error occurred"
          this.alert.variant = "danger"
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
    fetchTrajectories()
      .then(res => this.trajectories = res.data)
      .catch(err => console.log(err));
    fetchRoutes()
      .then(res => {
        res.data.forEach(route => {
          this.route_options.push({value: route.id, text: route.name});
        });
      })
			.catch(err => console.log(err));
    fetchStops()
      .then(res => {
        res.data.forEach(stop => {
          this.stops_options.push({value: stop.id, text: stop.name});
        });
      })
      .catch();
  }
}
</script>