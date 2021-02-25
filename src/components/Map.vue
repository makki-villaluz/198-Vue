<template>
	<LMap :bounds="bounds" :center="center" :zoom="zoom">
		<LTileLayer :url="url" :attribution="attribution"></LTileLayer>
		<LGeoJson v-if="geojson !== null" :geojson="geojson" :options="options"></LGeoJson>
		<LPolygon v-if="polygon !== null" :lat-lngs="polygon" color="red" weight="2" fillColor="red"></LPolygon>
	</LMap>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LGeoJson, LPolygon } from "vue2-leaflet";

export default {
	name: "Map",
	props: ["geojson", "polygon"],
  components: {
		LMap,
		LTileLayer,
		LGeoJson,
		LPolygon,
	},
	data() {
		return {
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
			bounds: null,
			center: [0,0],
			zoom: 0
		}
	},
	methods: {
		coordsToLatLng(coords){
			return coords.map(coord => [coord[1], coord[0]]);
		},
		polygonToLatLng(array) {
			const result = [];
			array.map(i => i.map(j => result.push(j)));
			return result;
		}
	},
	watch: {
		"geojson" (geojson) {
			if (geojson !== null) {
				const latlng = this.coordsToLatLng(this.geojson.coordinates);
				this.bounds = L.latLngBounds(latlng);
				this.center = null;
				this.zoom = null;
			}
			else {
				this.bounds = null;
				this.center = [0,0];
				this.zoom = 0;
			}
		},
		"polygon" (polygon) {
			if (polygon !== null) {
				const latlng = this.polygonToLatLng(this.polygon);
				this.bounds = L.latLngBounds(latlng);
				this.center = null;
				this.zoom = null;
			}
			else {
				this.bounds = null;
				this.center = [0,0];
				this.zoom = 0;
			}
		}
	},
}
</script>