<template>
	<div>
		<b-table outlined fixed hover selectable light
			ref="table"
			sticky-header="400px"
			head-variant="light"
			@row-selected="rowSelected"
			select-mode="single"
			:items="routes"
			:fields="table.fields"
		>
			<template #cell(cell_size)="row">
				{{ row.item.cell_size }}km
			</template>
			<template #cell(actions)="row">
				<b-button style="margin: 0 5px 0" variant="outline-primary" v-b-modal="'edit-modal'" @click="modalInfo(row.item.id, row.item.name, row.item.cell_size)">Edit</b-button>
				<b-button style="margin: 0 5px 0" variant="outline-danger" v-b-modal="'delete-modal'" @click="modalInfo(row.item.id, row.item.name, '')">Delete</b-button>
			</template>
		</b-table>

		<b-modal hide-footer id="edit-modal" @hidden="resetModal">
			<template #modal-title>
				<p>Editing GPX File:</p>
				{{ modal.title }}
			</template>
			<b-form @submit.prevent="editRoute">
				<div style="margin-top: 20px">
					<b-form-group label="Input New Name of File" style="margin-bottom: 0">
						<b-form-input 
							required 
							class="w-100 form-control-sm" 
							v-model="modal.name"
							:state="modal.stateName"
							aria-describedby="name-validity"
							@update="validateName"
						></b-form-input>
						<b-form-invalid-feedback id="name-validity">
							Name already taken
						</b-form-invalid-feedback>
					</b-form-group>
					<div v-if="modal.stateName==false" style="margin-top: 4px"></div>
					<div v-else style="margin-top: 27px"></div>
					<b-form-group label="Input New Cell Size of File" style="margin-bottom: 0">
						<b-form-input 
							required 
							class="w-100 form-control-sm" 
							v-model="modal.cell_size"
							:state="modal.stateCellSize"
							aria-describedby="cell-size-validity"
							@update="validateCellSize"							
						></b-form-input>
						<b-form-invalid-feedback id="cell-size-validity">
							Not a number greater than 0
						</b-form-invalid-feedback>
					</b-form-group>
					<div v-if="modal.stateCellSize==false" style="margin-top: 24px"></div>
					<div v-else style="margin-top: 47px"></div>
				</div>
				<div v-if="modal.stateName==false || modal.stateCellSize==false">
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
				fields: ["id", "name", "cell_size", "filename", {key: "actions", label: ""}],
			},
			modal: {
				title: "",
				id: null,
				name: "",
				cell_size: "",
				stateName: null,
				stateCellSize: null,
			}
		}
	},
	methods: {
		modalInfo(id, name, cell_size) {
			this.modal.id = id;
			this.modal.title = name;
			this.modal.name = name;
			this.modal.cell_size = cell_size;
			this.modal.stateName = true;
			this.modal.stateCellSize = true;
		},
		resetModal() {
			this.modal.id = null;
			this.modal.cell_size = "";
			this.modal.name = "";
			this.modal.title = "";
			this.modal.stateName = null;
			this.modal.stateCellSize = null;
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
		},
		validateName() {
			const taken = this.routes.find(route => route.name === this.modal.name);

			if (this.modal.name.length === 0) {
				this.modal.stateName = null;
			}
			else if (taken === undefined || this.modal.name === this.modal.title){
				this.modal.stateName = true;
			}
			else {
				this.modal.stateName = false;
			}
		},
		validateCellSize() {
			if (this.modal.cell_size.length === 0) {
				this.modal.stateCellSize = null;
			}
			else if (Number.isNaN(Number(this.modal.cell_size)) || Number(this.modal.cell_size) <= 0) {
				this.modal.stateCellSize = false;
			}
			else {
				this.modal.stateCellSize = true;
			}
		}
	},
}
</script>