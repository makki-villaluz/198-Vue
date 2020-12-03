<template>
  <div class="trajectory container-xl" style="padding-top: 30px">
    <b-row>
      <b-col>
        <UploadCardTrajectory
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
      <FileTableTrajectory
        :trajectories="trajectories"
        v-on:row-selected="rowSelected"
        v-on:edit-trajectory="editTrajectory"
        v-on:delete-trajectory="deleteTrajectory"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FileTableTrajectory from "@/components/trajectory/FileTableTrajectory";
import UploadCardTrajectory from "@/components/trajectory/UploadCardTrajectory";
import Map from "@/components/Map";

export default {
  name: "Trajectory",
  components: {
    FileTableTrajectory,
    UploadCardTrajectory,
    Map,
  },
  data() {
    return {
      map: {
        zoom: 0,
        center: [0, 0],
        geojson: null,
      },
      trajectories: [],
    }
  },
  methods: {
    rowSelected(selected) {
      if (selected.length) {
        axios.get("http://localhost:5000/vehicle/" + selected[0].id.toString())
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

      axios.post("http://localhost:5000/vehicle", formData)
        .then(res => this.trajectories = [...this.trajectories, res.data])
        .catch(err => console.log(err));
    },
    editTrajectory(id, name) {
      const formData = new FormData();

      formData.append("name", name)

      axios.put("http://localhost:5000/vehicle/" + id.toString(), formData)
        .then(res => {
          const index = this.trajectories.findIndex(trajectory => trajectory.id == res.data.id);
          this.trajectories[index].name = res.data.name;
        })
        .catch(err => console.log(err));
    },
    deleteTrajectory(id) {
      axios.delete("http://localhost:5000/vehicle/" + id.toString())
        .then(res => this.trajectories = this.trajectories.filter(trajectory => trajectory.id !== res.data.id))
        .catch(err => console.log(err));
    }
  },
  created() {
    axios.get("http://localhost:5000/vehicle")
      .then(res => this.trajectories = res.data)
      .catch(err => console.log(err));
  }
}
</script>