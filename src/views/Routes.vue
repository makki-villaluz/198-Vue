<template>
  <div class="route container-xl">
    <b-alert 
      style="margin: 30px 0 0"
      :variant="alert.variant"
      :show="alert.duration"
      @dismissed="resetAlert"
    >{{ alert.message }}</b-alert>
    <b-row style="margin-top: 30px">
      <b-col>
        <UploadCardRoutes 
          :routes="routes"
          v-on:upload-route="uploadRoute"
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
      <FileTableRoutes
        :routes="routes"
        v-on:row-selected="rowSelected"
        v-on:edit-route="editRoute"
        v-on:delete-route="deleteRoute"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FileTableRoutes from "@/components/routes/FileTableRoutes";
import UploadCardRoutes from "@/components/routes/UploadCardRoutes";
import Map from "@/components/Map";

export default {
  name: "Routes",
  components: {
    FileTableRoutes,
    UploadCardRoutes,
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
      routes: [],
    }
  },
  methods: {
    rowSelected(selected) {
      if (selected.length) {
        axios.get("http://localhost:5000/route/" + selected[0].id.toString())
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
    uploadRoute(name, cell_size, gpx_file) {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("cell_size", cell_size);
      formData.append("gpx_file", gpx_file);

      axios.post("http://localhost:5000/route", formData)
        .then(res => {
					this.routes = [...this.routes, res.data];
          this.alert.message = "File successfully uploaded"
          this.alert.variant = "success"
          this.alert.duration = 3;
        })
        .catch(() => {
          this.alert.message = "File upload error occurred"
          this.alert.variant = "danger"
          this.alert.duration = 3;
        });
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
    deleteRoute(id) {
      axios.delete("http://localhost:5000/route/" + id.toString())
        .then(res => {
					this.routes = this.routes.filter(route => route.id !== res.data.id);
          this.alert.message = "File successfully deleted";
          this.alert.variant = "success";
          this.alert.duration = 3;
				})
				.catch(() => {
          this.alert.message = "File delete error occurred";
          this.alert.variant = "danger";
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
    axios.get("http://localhost:5000/route")
      .then(res => this.routes = res.data)
      .catch(err => console.log(err));
  }
}
</script>