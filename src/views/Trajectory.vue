<template>
  <div class="trajectory container-xl" style="padding-top: 30px">
    <b-row>
      <b-col>
        <UploadCard
          v-on:upload-trajectory="uploadTrajectory"
        />
      </b-col>
      <b-col cols="8">
        <LMap :zoom="map.zoom" :center="map.center" >
          <LTileLayer :url="map.url" :attribution="map.attribution"></LTileLayer>
          <LGeoJson :geojson="map.geojson" :options="map.options"></LGeoJson>
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
import L from "leaflet";
import { LMap, LTileLayer, LGeoJson} from "vue2-leaflet";
import FileTable from "@/components/trajectory/FileTable";
import UploadCard from "@/components/trajectory/UploadCard";

export default {
  name: "Trajectory",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    FileTable,
    UploadCard,
  },
  data() {
    return {
      table: {
        fields: ["id", "name", "filename", "actions"],
      },
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
      trajectories: [],
    }
  },
  methods: {
    rowSelected(selected) {
      if (selected.length) {
        axios.get("http://localhost:5000/vehicle/" + selected[0].id.toString())
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