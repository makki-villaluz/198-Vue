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
            <b-form-group label="Name" label-cols="2">
              <b-form-input class="w-100 form-control-sm" required v-model="form.name"></b-form-input>
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
      <b-table outlined fixed hover light ref="table" sticky-header="500px" head-variant="light" :items="trajectories" :fields="table.fields">
        <template #cell(actions)="row">
          <b-button variant="outline-info" to="/route">Analyze</b-button>
          <b-button variant="outline-primary" v-b-modal="'edit-modal'" @click="modalInfo(row.item.id, row.item.name)">Edit</b-button>
          <b-button variant="outline-danger" @click="deleteTrajectory(row.item.id)">Delete</b-button>
        </template>
      </b-table>
    </div>
    <b-modal hide-footer id="edit-modal" @hidden="resetModal">
      <template #modal-title>
        <p>Editing GPX File:</p>
        {{ modal.title }}
      </template>
      <b-form @submit.prevent="editTrajectory">
        <b-form-group label="New Name" label-cols="3">
          <b-form-input required class="w-100 form-control-sm" v-model="modal.name"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="outline-primary" style="float: right">Edit</b-button>
      </b-form>
    </b-modal>
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
        gpx_file: null,
      },
      table: {
        fields: ["id", "name", "filename", "actions"],
      },
      modal: {
        title: "",
        id: null,
        name: "",
      },
      trajectories: [],
    }
  },
  methods: {
    modalInfo(id, name){
      this.modal.id = id;
      this.modal.title = name;
    },
    resetModal(){
      this.modal.name = "";
      this.modal.id = null;
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
    editTrajectory(){
      const formData = new FormData();

      formData.append("name", this.modal.name)

      axios.put("http://localhost:5000/vehicle/" + this.modal.id.toString(), formData)
        .then(res => {
          const index = this.trajectories.findIndex(trajectory => trajectory.id == res.data.id);
          this.trajectories[index].name = res.data.name;
        })
        .catch(err => console.log(err));

      this.modal.name = "";
      this.modal.id = null;
      this.$bvModal.hide("edit-modal");
    },
    deleteTrajectory(id){
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