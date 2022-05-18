<template>
	<div class="container-xl" style="padding-top:30px">
		<b-row>
			<b-col cols="5">
				<b-row>
					<b-col cols="12">
						<Info
							:vehicle_id="info.vehicle_id"
							:route_name="info.route_name"
							:date_uploaded="info.date_uploaded"
						/>
					</b-col>
					<b-col style="padding-top: 30px">
						<Distance
							:analysis_id="analysis_id"
						/>
					</b-col>
					<b-col style="padding-top: 30px">
						<Loop
							:analysis_id="analysis_id"
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
					:analysis_id="analysis_id"
					v-on:update-speeding-violations="updateSpeedingViolations"
				/>
			</b-col>
			<b-col cols="6">
				<Stop
					:analysis_id="analysis_id"
					v-on:update-stop-violations="updateStopViolations"
				/>
			</b-col>
		</b-row>
		<b-row style="padding: 30px 0 60px">
			<b-col>
				<Liveness
					:analysis_id="analysis_id"
				/>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { fetchVehicle, fetchRoute } from "@/api/index.js"
import Distance from "@/components/analyzed/Distance";
import Speeding from "@/components/analyzed/Speeding";
import Liveness from "@/components/analyzed/Liveness";
import Stop from "@/components/analyzed/Stop";
import Loop from "@/components/analyzed/Loop";
import Info from "@/components/analyzed/Info";
import Map from "@/components/Map";

export default {
	name: "Analyzed",
	props: ["id"],
	components: {
		Distance,
		Speeding,
		Liveness,
		Stop,
		Loop,
		Info,
		Map
	},
	data() {
		return {
			info: {
				vehicle_id: null,
				route_name: null,
				date_uploaded: null
			},
			map: {
				geojson: null,
				speeding: null,
				stop: null
			},
			route_id: null,
			analysis_id: null,
		}
	},
	methods: {
		updateSpeedingViolations(violations) {
			this.map.speeding = violations;
		},
		updateStopViolations(violations) {
			this.map.stop = violations;
		}
	},
	created() {
		fetchVehicle(this.id) 
			.then(res => {
				this.info.vehicle_id = res.data.vehicle_id;
				this.info.date_uploaded = res.data.date_uploaded;
				this.route_id = res.data.route_id;
				this.analysis_id = res.data.analysis_id;
				this.map.geojson = res.data.geojson;

				if (this.analysis_id === 'null') {
					this.$bvToast.toast('This vehicle has not yet been analyzed', 
						{title: "Error", variant: 'danger', solid: true}
					)
				}

				fetchRoute(this.route_id)
					.then(res => {
						this.info.route_name = res.data.name;
					})
					.catch(err => console.log(err))
			})
			.catch(err => console.log(err))
	}
}
</script>
