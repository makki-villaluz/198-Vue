<template>
  <div class="trajectory">
    <div style="text-align: left, margin: 20px">
      <h1>GPS Trajectories of Vehicles</h1>
    </div>
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