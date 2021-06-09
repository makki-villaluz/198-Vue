<template>
	<div class="container-xl" style="padding-top: 30px">
		<b-row>
			<b-col cols="5">
				<b-row>
					<b-col cols="12">
						<Info
							:name="info.name"
							:date_uploaded="info.date_uploaded"
							:route_name="info.route_name"
							:stops_name="info.stops_name"
						/>
					</b-col>
					<b-col style="padding-top: 30px">
						<Distance :id="id"/>
					</b-col>
					<b-col style="padding-top: 30px">
						<Loop 
							:id="id"
							:route_id="loop.route_id"
						/> 
					</b-col>
				</b-row>
			</b-col>
			<b-col cols="7">
				<Map
					:geojson="map.geojson"
					:speeding="map.speeding"
					:stop="map.stop"
				/>
			</b-col>
		</b-row>
		<b-row style="padding-top: 30px">
			<b-col cols="6">
				<Speeding 
					:id="id"
					v-on:update-speeding-violations="updateSpeedingViolations"
				/>
			</b-col>
			<b-col cols="6">
				<Stop 
					:id="id"
					:stops_id="stop.stops_id"
					v-on:update-stop-violations="updateStopViolations"
				/>
			</b-col>
		</b-row>
		<b-row style="padding: 30px 0 60px">
			<b-col cols="12">
				<Liveness :id="id"/>
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
	props: ["id"],
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
			info: {
				name: null,
				date_uploaded: null,
				route_name: null,
				stops_name: null,
			},
			loop: {
				route_id: null
			},
			stop: {
				stops_id: null
			},
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
				this.info.name = res.data.name;
				this.info.date_uploaded = res.data.date_uploaded;
				this.info.route_name = res.data.route_name;
				this.info.stops_name = res.data.stops_name;
				this.map.geojson = res.data.geojson;
				this.loop.route_id = res.data.route_id;
				this.stop.stops_id = res.data.stops_id;
			})
			.catch(err => console.log(err));
	},
}
</script>