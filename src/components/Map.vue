<template>
	<LMap :zoom="zoom" :center="center">
		<LTileLayer :url="url" :attribution="attribution"></LTileLayer>
		<LGeoJson v-if="geojson !== null" :geojson="geojson" :options="options"></LGeoJson>
		<LPolygon v-if="polygon !== null" :lat-lngs="polygon"></LPolygon>
	</LMap>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LGeoJson, LPolygon } from "vue2-leaflet";

export default {
	name: "Map",
	props: ["zoom", "center", "geojson", "polygon"],
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
		}
	},
}
</script>