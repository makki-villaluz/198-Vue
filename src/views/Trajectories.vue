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
          v-on:upload-trajectory="uploadTrajectory"
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
      <FileTableTrajectories
        :trajectories="trajectories"
        v-on:row-selected="rowSelected"
        v-on:edit-trajectory="editTrajectory"
        v-on:delete-trajectory="deleteTrajectory"
      />
    </div>
  </div>
</template>

<script>
import { fetchTrajectory, postTrajectory, updateTrajectory, removeTrajectory, fetchTrajectories } from "@/api/index.js";
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
        zoom: 0,
        center: [0, 0],
        geojson: null,
      },
      alert: {
        message: "",
        variant: "",
        duration: 0,
      },
      trajectories: [],
    }
  },
  methods: {
    rowSelected(selected) {
      if (selected.length) {
        fetchTrajectory(selected[0].id)
          .then(res => {
            this.map.center = [res.data.geojson.coordinates[0][1], res.data.geojson.coordinates[0][0]];
            this.map.geojson = res.data.geojson;
          })
          .catch(err => console.log(err));
        this.map.zoom = 12;
      }
      else {
        this.map.zoom = 0;
        this.map.center = [0, 0];
        this.map.geojson = null;
      }
    },
    uploadTrajectory(name, gpx_file) {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("gpx_file", gpx_file);

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
    editTrajectory(id, name) {
      const formData = new FormData();

      formData.append("name", name)

      updateTrajectory(id, formData)
        .then(res => {
          const index = this.trajectories.findIndex(trajectory => trajectory.id == res.data.id);
          this.trajectories[index].name = res.data.name;
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
  }
}
</script>