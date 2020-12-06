<template>
	<div>
		<b-card bg-variant="light" style="height: 300px">
			<div v-if="selected.length === 0">
				<h4 style="text-align: center">Loop Counter</h4>
				<p style="margin-bottom: 8px">Select route for counting number of loops</p>
				<b-table
					outlined fixed hover selectable small
					sticky-header="190px"
					head-variant="light"
					select-mode="single"
					:fields="fields"
					:items="routes"
					@row-selected="rowSelected"
					style="margin-bottom: 0"
				/>
			</div>
			<div v-else-if="loops === null">
				<div class="center" style="height: 258px">
					<b-spinner label="spinning"></b-spinner>				
				</div>
			</div>
			<div v-else>
				<div class="center" style="height: 258px">
					<div style="text-align: center">
						<h5>Loops Counted Using:</h5>
						<h4>{{ selected[0].name }}</h4>
						<h2>{{ loops}} loops</h2>
					</div>
				</div>
				<b-button 
					variant="outline-secondary" 
					size="sm"
					style="position: absolute; bottom: 10px; right: 10px"
					@click="resetCard"
				>Compute Again</b-button>
			</div>
		</b-card>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "Loop",
	props: ["id"],
	data() {
		return {
			fields: ["name", { key: "cell_size", label: "Cell Size (km)" }],
			routes: [],
			loops: null,
			selected: [],
		}
	},
	methods: {
		rowSelected(selected) {
			if (selected.length) {
				this.selected = selected;
				axios.get("http://localhost:5000/loop/" + this.id.toString() + "/" + selected[0].id.toString())
					.then(res => this.loops = res.data.loops)
					.catch(err => console.log(err));
			}
		},
		resetCard() {
			this.selected = [];
			this.loops = null;
		}
	},
	created() {
    axios.get("http://localhost:5000/route")
      .then(res => this.routes = res.data)
      .catch(err => console.log(err));
	},
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>