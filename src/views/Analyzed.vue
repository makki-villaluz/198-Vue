<template>
	<div class="container-xl" style="padding-top: 30px">
		<b-row>
			<b-col cols="4">
				<b-row>
					<b-col cols="12">
						<Info
							:id="id"
							:name="name"
							:filename="filename"
						/>
					</b-col>
					<b-col style="padding-top: 30px">
						<Distance :id="id"/>
					</b-col>
				</b-row>
			</b-col>
			<b-col cols="8">
				<Map
					:zoom="map.zoom"
					:center="map.center" 
					:geojson="map.geojson"
				/>
			</b-col>
		</b-row>
		<b-row style="padding-top: 30px">
			<b-col cols="5">
				<Loop :id="id"/> 
			</b-col>
			<b-col cols="7">
				<Liveness :id="id"/>
			</b-col>
		</b-row>
		<b-row style="padding: 30px 0 60px">
			<b-col cols="6">
				<Speeding :id="id"/>
			</b-col>
			<b-col cols="6">
				<Stop :id="id"/>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { fetchTrajectory } from "@/api/index.js";
import Distance from "@/components/analyzed/Distance";
import Liveness from "@/components/analyzed/Liveness";
import Speeding from "@/components/analyzed/Speeding";
import Stop from "@/components/analyzed/Stop";
import Loop from "@/components/analyzed/Loop";
import Info from "@/components/analyzed/Info";
import Map from "@/components/Map";

export default {
	name: "Analyzed",
	props: ["id", "name", "filename"],
	components: {
		Distance,
		Liveness,
		Speeding,
		Stop,
		Loop,
		Info,
		Map
	},
	data() {
		return {
			map: {
				zoom: 0,
				center: [0, 0],
				geojson: null
			},
		}
	},
	created() {
		fetchTrajectory(this.id)
			.then(res => {
				this.map.center = [res.data.geojson.coordinates[0][1], res.data.geojson.coordinates[0][0]];
				this.map.geojson = res.data.geojson;
			})
			.catch(err => console.log(err));
		this.map.zoom = 12;
	},
}
</script>