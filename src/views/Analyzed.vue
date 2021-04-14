<template>
	<div class="container-xl" style="padding-top: 30px">
		<b-row>
			<b-col cols="4">
				<b-row>
					<b-col cols="12">
						<Info
							:id="id"
							:name="name"
							:date_uploaded="date_uploaded"
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
					:geojson="map.geojson"
					:speeding="map.speeding"
					:stop="map.stop"
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
				<Speeding 
					:id="id"
					v-on:update-speeding-violations="updateSpeedingViolations"
				/>
			</b-col>
			<b-col cols="6">
				<Stop 
					:id="id"
					v-on:update-stop-violations="updateStopViolations"
				/>
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
	props: ["id", "name", "date_uploaded", "filename"],
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
				geojson: null,
				speeding: null,
				stop: null,
			},
		}
	},
	methods: {
		updateSpeedingViolations(violations){
			this.map.speeding = violations;
		},
		updateStopViolations(violations){
			this.map.stop = violations;
		}
	},
	created() {
		fetchTrajectory(this.id)
			.then(res => {
				this.map.geojson = res.data.geojson;
			})
			.catch(err => console.log(err));
	},
}
</script>