<template>
	<LMap :bounds="bounds" :center="center" :zoom="zoom">
		<LTileLayer :url="url" :attribution="attribution"></LTileLayer>
		<LGeoJson v-if="geojson !== null" :geojson="geojson" :options="options"></LGeoJson>
		<LPolygon v-if="polygon !== null" :lat-lngs="polygon" color="red" :weight="2" fillColor="red"></LPolygon>
		<div v-if="speeding !== null">
			<LMarker v-for="(item, index) in speeding" :lat-lng="[item.lat1, item.long1]" :key="index">
				<LTooltip>Speeding Violation #{{ index + 1 }}</LTooltip>
				<LIcon
					icon-url="/static/redMarker.png"
					:icon-size="[25, 41]"
					:icon-anchor="[12, 41]"
				></LIcon>
				<!-- <LIcon
					icon-url="../../public/redMarker.png"
					:icon-size="[25, 41]"
					:icon-anchor="[12, 41]"
				></LIcon> -->
			</LMarker>
		</div>
		<div v-if="stop !== null">
			<LMarker v-for="(item, index) in stop_violations" :lat-lng="[item.x, item.y]" :key="index">
				<LTooltip>Stop Violation #{{ item.violations }}</LTooltip>
				<LIcon
					icon-url="/static/orangeMarker.png"
					:icon-size="[25, 41]"
					:icon-anchor="[12, 41]"
				></LIcon>
				<!-- <LIcon
					icon-url="../../public/orangeMarker.png"
					:icon-size="[25, 41]"
					:icon-anchor="[12, 41]"
				></LIcon> -->
			</LMarker>
		</div>
	</LMap>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LGeoJson, LPolygon, LMarker, LTooltip, LIcon } from "vue2-leaflet";

export default {
	name: "Map",
	props: ["geojson", "polygon", "speeding", "stop"],
  components: {
		LMap,
		LTileLayer,
		LGeoJson,
		LPolygon,
		LMarker,
		LTooltip,
		LIcon
	},
	data() {
		return {
			url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
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
			zoom: 0,
			stop_violations: [],
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
		},
		"stop" (stop) {
			const unique_stops = [];

			const temp = {
				x: stop[0].center_lat, 
				y: stop[0].center_long,
				violations: '1'
			};
			unique_stops.push(temp);

			const length = stop.length;
			for (var i = 1; i < length; i++) {
				var match = false;
				for (var j = 0; j < unique_stops.length; j++) {
					if (stop[i].center_lat === unique_stops[j].x && stop[i].center_long === unique_stops[j].y) {
						unique_stops[j].violations = unique_stops[j].violations.concat(", ".concat(i+1));
						match = true;
					}
				}
				if (match === false) {
					const temp = {
						x: stop[i].center_lat, 
						y: stop[i].center_long,
						violations: (i+1).toString()
					};
					unique_stops.push(temp);
				}
			}

			this.stop_violations = unique_stops;
		}
	},
}
</script>