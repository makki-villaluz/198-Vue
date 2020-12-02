<template>
  <div class="route container-xl" style="padding-top: 30px">
    <b-row>
      <b-col>
        Upload here
      </b-col>
      <b-col cols="8">
        Map here
      </b-col>
    </b-row>
    <FileTableRoute 
      :routes="routes"
      v-on:row-selected="rowSelected"
      v-on:edit-route="editRoute"
      v-on:delete-route="deleteRoute"
    />
  </div>
</template>

<script>
import axios from "axios";
import FileTableRoute from "@/components/route/FileTableRoute";

export default {
  name: "Route",
  components: {
    FileTableRoute,
  },
  data() {
    return {
      routes: [],
    }
  },
  methods: {
    rowSelected(selected) {
      console.log(selected)
    },
    uploadTrajectory(name, cell_size, gpx_file) {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("cell_size", cell_size);
      formData.append("gpx_file", gpx_file);

      axios.post("http://localhost:5000/vehicle", formData)
        .then(res => this.routes = [...this.routes, res.data])
        .catch(err => console.log(err));
    },
    editRoute(id, name, cell_size) {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("cell_size", cell_size);

      axios.put("http://localhost:5000/route/" + id.toString(), formData)
        .then(res => {
          const index = this.routes.findIndex(route => route.id == res.data.id);
          this.routes[index].name = res.data.name;
          this.routes[index].cell_size = res.data.cell_size;
        })
        .catch(err => console.log(err));
    },
    deleteRoute(id) {
      axios.delete("http://localhost:5000/route/" + id.toString())
        .then(res => this.routes = this.routes.filter(route => route.id !== res.data.id))
        .catch(err => console.log(err));
    },
  },
  created() {
    axios.get("http://localhost:5000/route")
      .then(res => this.routes = res.data)
      .catch(err => console.log(err));
  }
}
</script>