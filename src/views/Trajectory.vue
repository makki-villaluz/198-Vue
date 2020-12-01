<template>
  <div class="trajectory container-xl">
    <div style="padding-top: 10px">
      <h1 style="text-align: center">GPX Trajectories of Vehicles</h1>
    </div>
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
    <div style="margin-top: 20px">
      <b-table outlined fixed hover selectable light 
        ref="table" 
        sticky-header="400px" 
        head-variant="light" 
        @row-selected="rowSelected" 
        select-mode="single"
        :items="trajectories" 
        :fields="table.fields"
      >
        <template #cell(actions)="row">
          <b-button variant="outline-info" to="/route">Analyze</b-button>
          <b-button variant="outline-primary" v-b-modal="'edit-modal'" @click="modalInfo(row.item.id, row.item.name)">Edit</b-button>
          <b-button variant="outline-danger" v-b-modal="'delete-modal'" @click="modalInfo(row.item.id, row.item.name)">Delete</b-button>
        </template>
      </b-table>
    </div>

    <b-modal hide-footer id="edit-modal" @hidden="resetModal">
      <template #modal-title>
        <p>Editing GPX File:</p>
        {{ modal.title }}
      </template>
      <b-form @submit.prevent="editTrajectory">
        <div style="margin: 20px 0 40px">
          <b-form-group label="Input New Name of File:">
            <b-form-input required class="w-100 form-control-sm" v-model="modal.name"></b-form-input>
          </b-form-group>
        </div>
        <b-button type="submit" variant="outline-primary" style="float: right">Edit</b-button>
      </b-form>
    </b-modal>
    
    <b-modal hide-footer id="delete-modal" @hidden="resetModal">
      <template #modal-title>
        <p>Deleting GPX File:</p>
        {{ modal.title }}
      </template>
      <p>Are you sure you want to delete this GPX File?</p>
      <b-form @submit.prevent="deleteTrajectory">
        <b-button type="submit" variant="outline-danger" style="float: right">Delete</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { LMap, LTileLayer } from 'vue2-leaflet';

export default {
  name: "Trajectory",
  components: {
    LMap,
    LTileLayer,
  },
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
      selected: [],
      trajectories: [],
    }
  },
  methods: {
    modalInfo(id, name) {
      this.modal.id = id;
      this.modal.title = name;
    },
    resetModal() {
      this.modal.name = "";
      this.modal.id = null;
    },
    rowSelected(selected) {
      this.selected = selected;
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
    editTrajectory() {
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
    deleteTrajectory() {
      axios.delete("http://localhost:5000/vehicle/" + this.modal.id.toString())
        .then(res => this.trajectories = this.trajectories.filter(trajectory => trajectory.id !== res.data.id))
        .catch(err => console.log(err));

      this.modal.name = "";
      this.modal.id = null;
      this.$bvModal.hide("delete-modal");
    }
  },
  created() {
    axios.get("http://localhost:5000/vehicle")
      .then(res => this.trajectories = res.data)
      .catch(err => console.log(err));
  }
}
</script>