<template>
  <div class="trajectory">
    <h1>GPS Trajectories of Vehicles</h1>
    <b-table fixed hover light :items="trajectories" :fields="fields"></b-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Trajectory",
  data() {
    return {
      fields: ['id', 'name', 'filename'],
      trajectories: []
    }
  },
  methods: {
    uploadTrajectory() {
      console.log('upload');
    }
  },
  created() {
    axios.get("http://localhost:5000/vehicle")
      .then(res => this.trajectories = res.data)
      .catch(err => console.log(err));
  }
}
</script>