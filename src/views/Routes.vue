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
import { fetchRoute, postRoute, updateRoute, removeRoute, fetchRoutes } from "@/api/index.js";
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
        fetchRoute(selected[0].id)
          .then(res => {
            this.map.geojson = res.data.geojson;
          })
          .catch(err => console.log(err));
      }
      else {
        this.map.geojson = null;
      }
    },
    uploadRoute(name, cell_size, gpx_file) {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("cell_size", cell_size);
      formData.append("gpx_file", gpx_file);

      postRoute(formData)
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

      updateRoute(id, formData)
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
      removeRoute(id)
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
    fetchRoutes()
      .then(res => this.routes = res.data)
      .catch(err => console.log(err));
  }
}
</script>