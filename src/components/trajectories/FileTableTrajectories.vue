<template>
	<div>
		<b-table outlined hover selectable light fixed
			ref="table" 
			sticky-header="400px" 
			head-variant="light" 
			@row-selected="rowSelected" 
			select-mode="single"
			:items="trajectories" 
			:fields="table.fields"
		>
			<template #cell(actions)="row">
				<div style="float: right">
					<b-button 
						style="margin: 0 5px 0; padding: 10px 12px 6px" 
						variant="outline-info" 
						:to="{ name: 'Analyzed', params: { id: row.item.id } }"
					>
						<b-icon-clipboard-data></b-icon-clipboard-data>
					</b-button>
					<b-button 
						style="margin: 0 5px 0; padding: 10px 12px 6px" 
						variant="outline-primary" 
						v-b-modal="'edit-modal'" 
						@click="modalInfo(row.item.id, row.item.name, row.item.route_id, row.item.stops_id)"
					>
						<b-icon-pencil-square></b-icon-pencil-square>
					</b-button>
					<b-button
						style="margin: 0 5px 0; padding: 10px 12px 6px" 
						variant="outline-danger" 
						v-b-modal="'delete-modal'" 
						@click="modalInfo(row.item.id, row.item.name)"
					>
						<b-icon-trash></b-icon-trash>
					</b-button>
				</div>
			</template>
		</b-table>

		<b-modal hide-footer id="edit-modal" @hidden="resetModal">
			<template #modal-title>
				<p>Editing GPX File:</p>
				{{ modal.title }}
			</template>
			<b-form @submit.prevent="editTrajectory">
				<div style="margin-top: 20px">
					<b-form-group label="Input New Name of File" style="margin-bottom: 0px">
						<b-form-input 
							required 
							class="w-100 form-control-sm" 
							v-model="modal.name"
							:state="modal.stateName"
							aria-describedby="name-validity"
							@update="validateName"
						></b-form-input>
						<b-form-invalid-feedback id="name=validity">
							Name already taken
						</b-form-invalid-feedback>
					</b-form-group>
					<div v-if="modal.stateName==false" style="margin-top: 4px"></div>
					<div v-else style="margin-top: 27px"></div>
					<b-form-group label="Route" style="margin-bottom: 27px" label-cols="2">
						<b-form-select
							required
							class="w-100 form-control-sm"
							v-model="modal.route_selected"
							:options="route_options"
						>
						</b-form-select>
					</b-form-group>
					<b-form-group label="Stops" style="margin-bottom: 47px" label-cols="2">
						<b-form-select
							required
							class="w-100 form-control-sm"
							v-model="modal.stops_selected"
							:options="stops_options"
						>
						</b-form-select>
					</b-form-group>
				</div>
				<div v-if="modal.stateName==false">
					<b-button disabled type="submit" variant="outline-primary" style="float: right">Save</b-button>
				</div>
				<div v-else>
					<b-button type="submit" variant="outline-primary" style="float: right">Save</b-button>
				</div>
			</b-form>
		</b-modal>
		
		<b-modal hide-footer id="delete-modal" @hidden="resetModal">
			<template #modal-title>
				<p>Deleting GPX File:</p>
				{{ modal.title }}
			</template>
			<p style="margin: 20px 0 40px">Are you sure you want to delete this GPX File?</p>
			<b-form @submit.prevent="deleteTrajectory">
				<b-button type="submit" variant="outline-danger" style="float: right">Delete</b-button>
			</b-form>
		</b-modal>
	</div>
</template>

<script>
export default {
	name: "FileTableTrajectories",
	props: ["trajectories", "route_options", "stops_options"],
	data() {
		return {
			table: {
				selected: [],
				fields: ["name", "route_name", "stops_name", "date_uploaded", {key: "actions", label: ""}],
			},
			modal: {
				title: "",
				id: null,
				name: "",
				stateName: null,
				route_selected: null,
				stops_selected: null,
			}
		}
	},
	methods: {
		modalInfo(id, name, route_id, stops_id) {
			this.modal.id = id;
			this.modal.title = name;
			this.modal.name = name;
			this.modal.stateName = true;
			this.modal.route_selected = route_id;
			this.modal.stops_selected = stops_id;
		},
		resetModal() {
			this.modal.name = "";
			this.modal.id = null;
			this.modal.title = "";
			this.modal.stateName = null;
			this.modal.route_selected = null;
			this.modal.stops_selected = null;
		},
		rowSelected(selected) {
			this.$emit("row-selected", selected);
		},
		editTrajectory() {
			this.$emit("edit-trajectory", this.modal.id, this.modal.name, this.modal.route_selected, this.modal.stops_selected);
			this.resetModal();
			this.$bvModal.hide("edit-modal");
		},
		deleteTrajectory() {
			this.$emit("delete-trajectory", this.modal.id);
			this.resetModal();
			this.$bvModal.hide("delete-modal");
		},
		validateName() {
			const taken = this.trajectories.find(trajectory => trajectory.name === this.modal.name);

			if (this.modal.name.length === 0) {
				this.modal.stateName = null;
			}
			else if(taken === undefined || this.modal.name === this.modal.title) {
				this.modal.stateName = true;
			}
			else {
				this.modal.stateName = false;
			}
		},
	}
}
</script>