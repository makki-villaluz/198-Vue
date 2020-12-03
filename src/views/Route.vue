<template>
  <div class="route container-xl" style="padding-top: 30px">
    <b-row>
      <b-col>
        <UploadCardRoute v-on:upload-route="uploadRoute"/>
      </b-col>
      <b-col cols="8">
        <LMap :zoom="map.zoom" :center="map.center">
          <LTileLayer :url="map.url" :attribution="map.attribution"></LTileLayer>
          <LGeoJson :geojson="map.geojson" :options="map.options" v-if="map.geojson !== null"></LGeoJson>
        </LMap>
      </b-col>
    </b-row>
    <div style="margin-top: 30px">
      <FileTableRoute 
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
import L from "leaflet";
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";
import FileTableRoute from "@/components/route/FileTableRoute";
import UploadCardRoute from "@/components/route/UploadCardRoute";

export default {
  name: "Route",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    FileTableRoute,
    UploadCardRoute,
  },
  data() {
    return {
      map: {
        zoom: 0,
        center: [0, 0],
        url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        options: {
          style: function () {
            return {
              color: "blue"
            }
          },
          pointToLayer: function (feature, latlng) {
            return new L.CircleMarker(latlng, {
              radius: 1,
              fillOpacity: 0.85
            })
          }
        },
        geojson: null,
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