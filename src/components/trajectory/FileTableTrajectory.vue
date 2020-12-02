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
				<b-button style="margin: 0 5px 0" variant="outline-info" to="/route">Analyze</b-button>
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
					<b-form-group label="Input New Name of File:">
						<b-form-input required class="w-100 form-control-sm" v-model="modal.name"></b-form-input>
					</b-form-group>
				</div>
				<b-button type="submit" variant="outline-primary" style="float: right">Edit</b-button>
			</b-form>
		</b-modal>
		
		<b-modal hide-footer id="delete-modal" @hidden="resetModal">
			<template #modal-title>
				<p>Deleting GPX File:</p>
				{{ modal.title }}
			</template>
			<p>Are you sure you want to delete this GPX File?</p>
			<b-form @submit.prevent="deleteTrajectory">
				<b-button type="submit" variant="outline-danger" style="float: right">Delete</b-button>
			</b-form>
		</b-modal>
	</div>
</template>

<script>
export default {
		name: "FileTableTrajectory",
		props: ["trajectories"],
		data() {
			return {
				table: {
					selected: [],
					fields: ["id", "name", "filename", "actions"],
				},
				modal: {
					title: "",
					id: null,
					name: "",
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
			}
		}
}
</script>