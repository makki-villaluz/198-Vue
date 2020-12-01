<template>
  <div class="trajectory container-xl" style="padding-top: 30px">
    <b-row>
      <b-col>
        <b-card>
          <template #header>
            <h3>Upload Vehicle Trajectory GPX File</h3>
          </template>
          <b-form @submit.prevent="uploadTrajectory">
            <div style="margin: 30px 0 30px">
              <b-form-group label="Input Name of File:">
                <b-form-input class="w-100 form-control-sm" required v-model="form.name"></b-form-input>
              </b-form-group>
            </div>
            <b-form-file class="w-25" v-model="form.gpx_file" required plain></b-form-file>
            <div style="margin-top: 40px">
              <b-button type="submit" variant="outline-primary" style="float: right">Upload</b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
      <b-col cols="8">
        <LMap>
          <LTileLayer 
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          ></LTileLayer>
        </LMap>
      </b-col>
    </b-row>
    <div style="margin-top: 30px">
      <FileTableTrajectory 
        :fields="table.fields" 
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
import { LMap, LTileLayer } from "vue2-leaflet";
import FileTableTrajectory from "@/components/trajectory/FileTableTrajectory";

export default {
  name: "Trajectory",
  components: {
    LMap,
    LTileLayer,
    FileTableTrajectory,
  },
  data() {
    return {
      form: {
        name: "",
        gpx_file: null,
      },
      table: {
        fields: ["id", "name", "filename", "actions"],
        selected: []
      },
      trajectories: [],
    }
  },
  methods: {
    rowSelected(selected) {
      this.table.selected = selected;
    },
    uploadTrajectory() {
      const formData = new FormData();

      formData.append("name", this.form.name);
      formData.append("gpx_file", this.form.gpx_file);

      axios.post("http://localhost:5000/vehicle", formData)
        .then(res => this.trajectories = [...this.trajectories, res.data])
        .catch(err => console.log(err));
        
      this.form.name = '';
      this.form.gpx_file = null;
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