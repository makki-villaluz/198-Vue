<template>
  <div class="trajectory container-xl">
    <div style="padding-top: 10px">
      <h1 style="text-align: center">GPX Trajectories of Vehicles</h1>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <b-form @submit.prevent="uploadTrajectory">
            <h3>Upload Vehicle Trajectory GPX File</h3>
            <b-form-group label="Name" label-cols="2" style="margin">
              <b-form-input class="w-50 form-control-sm" required v-model="form.name"></b-form-input>
            </b-form-group>
            <div style="margin-bottom:18px">    
              <b-form-file class="w-25" v-model="form.gpx_file" required plain></b-form-file>
            </div>
            <b-button type="submit" variant="outline-primary">Upload</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col cols="8">
        <h1 style="text-align: center">Map should appear here</h1>
      </b-col>
    </b-row>
    <div style="margin-top: 20px">
      <b-table outlined fixed hover light sticky-header="500px" head-variant="light" :items="trajectories" :fields="fields">
        <template #cell(actions)="row">
          <b-button variant="outline-info" to="/route">Analyze</b-button>
          <b-button variant="outline-secondary" v-b-modal="'edit-modal'">Edit</b-button>
          <b-button variant="outline-danger" @click="deleteTrajectory(row.item.id)">Delete</b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Trajectory",
  data() {
    return {
      form: {
        name: "",
        gpx_file: null
      },
      fields: ["id", "name", "filename", "actions"],
      trajectories: []
    }
  },
  methods: {
    uploadTrajectory() {
      const formData = new FormData();

      formData.append('name', this.form.name);
      formData.append('gpx_file', this.form.gpx_file)

      axios.post("http://localhost:5000/vehicle", formData)
        .then(res => this.trajectories = [...this.trajectories, res.data])
        .catch(err => console.log(err));

      this.form.name = '';
      this.form.gpx_file = null;
    },
    editTrajectory(id){
      console.log("edit trajectory " + id.toString());
    },
    deleteTrajectory(id){
      axios.delete("http://localhost:5000/vehicle/" + id.toString())
        .then(res => this.trajectories = this.trajectories.filter(trajectory => trajectory.id !== res.data.gpx_vehicle_id))
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