<template>
	<div>
		<b-table outlined fixed hover selectable light 
			ref="table" 
			sticky-header="400px" 
			head-variant="light" 
			@row-selected="rowSelected" 
			select-mode="single"
			:items="trajectories" 
			:fields="table.fields"
		>
			<template #cell(actions)="row">
				<b-button style="margin: 0 5px 0" variant="outline-info" :to="{ name: 'Analyzed', params: { id: row.item.id, name: row.item.name, filename: row.item.filename } }">Analyze</b-button>
				<b-button style="margin: 0 5px 0" variant="outline-primary" v-b-modal="'edit-modal'" @click="modalInfo(row.item.id, row.item.name)">Edit</b-button>
				<b-button style="margin: 0 5px 0" variant="outline-danger" v-b-modal="'delete-modal'" @click="modalInfo(row.item.id, row.item.name)">Delete</b-button>
			</template>
		</b-table>

		<b-modal hide-footer id="edit-modal" @hidden="resetModal">
			<template #modal-title>
				<p>Editing GPX File:</p>
				{{ modal.title }}
			</template>
			<b-form @submit.prevent="editTrajectory">
				<div style="margin: 20px 0 40px">
					<b-form-group label="Input New Name of File">
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
				</div>
				<div v-if="modal.stateName==false">
					<b-button disabled type="submit" variant="outline-primary" style="float: right">Edit</b-button>
				</div>
				<div v-else>
					<b-button type="submit" variant="outline-primary" style="float: right">Edit</b-button>
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
	props: ["trajectories"],
	data() {
		return {
			table: {
				selected: [],
				fields: ["id", "name", "filename", {key: "actions", label: ""}],
			},
			modal: {
				title: "",
				id: null,
				name: "",
				stateName: null,
			}
		}
	},
	methods: {
		modalInfo(id, name) {
			this.modal.id = id;
			this.modal.title = name;
		},
		resetModal() {
			this.modal.name = "";
			this.modal.id = null;
			this.modal.title = "";
			this.modal.stateName = null;
		},
		rowSelected(selected) {
			this.$emit("row-selected", selected);
		},
		editTrajectory() {
			this.$emit("edit-trajectory", this.modal.id, this.modal.name)
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
			else if(taken === undefined) {
				this.modal.stateName = true;
			}
			else {
				this.modal.stateName = false;
			}
		},
	}
}
</script>