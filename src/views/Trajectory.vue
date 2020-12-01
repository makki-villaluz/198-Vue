<template>
  <div class="trajectory container-xl" style="padding-top: 30px">
    <b-row>
      <b-col>
        <UploadCard
          v-on:upload-trajectory="uploadTrajectory"
        />
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
      <FileTable
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
import FileTable from "@/components/trajectory/FileTable";
import UploadCard from "@/components/trajectory/UploadCard";

export default {
  name: "Trajectory",
  components: {
    LMap,
    LTileLayer,
    FileTable,
    UploadCard,
  },
  data() {
    return {
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