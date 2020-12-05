<template>
	<div>
		<b-table outlined fixed hover selectable light
			ref="table"
			sticky-header="322px"
			head-variant="light"
			@row-selected="rowSelected"
			select-mode="single"
			:items="routes"
			:fields="table.fields"
		>
			<template #cell(actions)="row">
				<b-button style="margin: 0 5px 0" variant="outline-primary" v-b-modal="'edit-modal'" @click="modalInfo(row.item.id, row.item.name)">Edit</b-button>
				<b-button style="margin: 0 5px 0" variant="outline-danger" v-b-modal="'delete-modal'" @click="modalInfo(row.item.id, row.item.name)">Delete</b-button>
			</template>
		</b-table>

		<b-modal hide-footer id="edit-modal" @hidden="resetModal">
			<template #modal-title>
				<p>Editing GPX File:</p>
				{{ modal.title }}
			</template>
			<b-form @submit.prevent="editRoute">
				<div style="margin: 20px 0 40px">
					<b-form-group label="Input New Name of File:">
						<b-form-input required class="w-100 form-control-sm" v-model="modal.name"></b-form-input>
					</b-form-group>
					<b-form-group label="Input New Cell Size of File:">
						<b-form-input required class="w-100 form-control-sm" v-model="modal.cell_size"></b-form-input>
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
			<p style="margin: 20px 0 40px">Are you sure you want to delete this GPX File?</p>
			<b-form @submit.prevent="deleteRoute">
				<b-button type="submit" variant="outline-danger" style="float: right">Delete</b-button>
			</b-form>
		</b-modal>
	</div>
</template>

<script>
export default {
	name: "FileTableRoute",
	props: ["routes"],
	data() {
		return {
			table: {
				selected: [],
				fields: ["id", "name", {key: "cell_size", label: "Cell Size (km)"}, "filename", {key: "actions", label: ""}],
			},
			modal: {
				title: "",
				id: null,
				name: "",
				cell_size: null,
			}
		}
	},
	methods: {
		modalInfo(id, name) {
			this.modal.id = id;
			this.modal.title = name;
		},
		resetModal() {
			this.modal.id = null;
			this.modal.cell_size = null;
			this.modal.name = "";
			this.modal.title = "";
		},
		rowSelected(selected) {
			this.$emit("row-selected", selected);
		},
		editRoute() {
			this.$emit("edit-route", this.modal.id, this.modal.name, this.modal.cell_size)
			this.resetModal();
			this.$bvModal.hide("edit-modal");
		},
		deleteRoute() {
			this.$emit("delete-route", this.modal.id);
			this.resetModal();
			this.$bvModal.hide("delete-modal");
		}
	},
}
</script>