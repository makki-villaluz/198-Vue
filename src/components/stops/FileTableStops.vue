<template>
	<div>
		<b-table outlined fixed howver selectable light
			ref="table"
			sticky-header="400px"
			head-variant="light"
			@row-selected="rowSelected"
			select-mode="single"
			:items="stops"
			:fields="table.fields"
		>
			<template #cell(min_time)="row">
				{{ row.item.min_time }}s
			</template>
			<template #cell(max_time)="row">
				{{ row.item.max_time }}s
			</template>
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
			<b-form @submit.prevent="editStop">
				<div style="margin: 20px 0 40px">
					<b-form-group label="Input New Name of File:">
						<b-form-input required class="w-100 form-control-sm" v-model="modal.name"></b-form-input>
					</b-form-group>
					<b-form-group label="Input New Minimum Time of File">
						<b-form-input required class="w-100 form-control-sm" v-model="modal.min_time"></b-form-input>
					</b-form-group>
					<b-form-group label="Input New Maximum Time of File">
						<b-form-input required class="w-100 form-control-sm" v-model="modal.max_time"></b-form-input>
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
			<p style="margin: 20px 0 40px">Are you sure you want to delete this GPX file?</p>
			<b-form @submit.prevent="deleteStop">
				<b-button type="submit" variant="outline-danger" style="float: right">Delete</b-button>
			</b-form>
		</b-modal>
	</div>
</template>

<script>
export default {
	name: "FileTableStops",
	props: ["stops"],
	data() {
		return {
			table: {
				selected: [],
				fields: ["id", "name", "min_time", "max_time", "filename", {key: "actions", label: ""}],
			},
			modal: {
				title: "",
				id: null,
				name: "",
				min_time: null,
				max_time: null,
			},
		}
	},
	methods: {
		modalInfo(id, name) {
			this.modal.id = id;
			this.modal.title = name;
		},
		resetModal() {
			this.modal.id = null;
			this.modal.title = "";
			this.modal.name = "";
			this.modal.min_time = null;
			this.modal.max_time = null;
		},
		rowSelected(selected) {
			this.$emit("row-selected", selected);
		},
		editStop() {
			this.$emit("edit-stop", this.modal.id, this.modal.name, this.modal.min_time, this.modal.max_time)
			this.resetModal();
			this.$bvModal.hide("edit-modal");
		},
		deleteStop() {
			this.$emit("delete-stop", this.modal.id);
			this.resetModal();
			this.$bvModal.hide("delete-modal")
		}
	}
}
</script>