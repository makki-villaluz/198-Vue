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
				<div style="float: right">
					<b-button 
						style="margin: 0 5px 0; padding: 10px 12px 6px" 
						variant="outline-primary" 
						v-b-modal="'edit-modal'" 
						@click="modalInfo(row.item.id, row.item.name, row.item.min_time, row.item.max_time)"
					>
						<b-icon-pencil-square></b-icon-pencil-square>
					</b-button>
					<b-button 
						style="margin: 0 5px 0; padding: 10px 12px 6px" 
						variant="outline-danger" 
						v-b-modal="'delete-modal'" 
						@click="modalInfo(row.item.id, row.item.name, '','')"
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
			<b-form @submit.prevent="editStop">
				<div style="margin-top: 20px">
					<b-form-group label="Input New Name of File:" style="margin-bottom: 0">
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
					<div v-if="modal.stateName==false" style="margin-top: 4px"></div>
					<div v-else style="margin-top: 27px"></div>
					</b-form-group>
					<b-form-group label="Input New Minimum Time of File" style="margin-bottom: 0">
						<b-form-input 
							required 
							class="w-100 form-control-sm" 
							v-model="modal.min_time"
							:state="modal.stateMinTime"
							aria-describedby="min-time-validity"
							@update="validateTime"
						></b-form-input>
						<b-form-invalid-feedback id="min-time-validity">
							Not a number greater than 0
						</b-form-invalid-feedback>
					<div v-if="modal.stateMinTime==false" style="margin-top: 4px"></div>
					<div v-else style="margin-top: 27px"></div>
					</b-form-group>
					<b-form-group label="Input New Maximum Time of File" style="margin-bottom: 0">
						<b-form-input 
							required 
							class="w-100 form-control-sm" 
							v-model="modal.max_time"
							:state="modal.stateMaxTime"
							aria-describedby="max-time-validity"
							@update="validateTime"
						></b-form-input>
						<b-form-invalid-feedback id="max-time-validity">
							Not a number greater than min time
						</b-form-invalid-feedback>
					</b-form-group>
					<div v-if="modal.stateMaxTime==false" style="margin-top: 24px"></div>
					<div v-else style="margin-top: 47px"></div>
				</div>
				<div v-if="modal.stateName==false || modal.stateMinTime==false || modal.stateMaxTime==false">	
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
				fields: ["name", "min_time", "max_time", "date_uploaded", {key: "actions", label: ""}],
			},
			modal: {
				title: "",
				id: null,
				name: "",
				max_time: "",
				min_time: "",
				stateName: null,
				stateMinTime: null,
				stateMaxTime: null,
			},
		}
	},
	methods: {
		modalInfo(id, name, min_time, max_time) {
			this.modal.id = id;
			this.modal.title = name;
			this.modal.name = name;
			this.modal.min_time = min_time;
			this.modal.max_time = max_time;
			this.modal.stateName = true;
			this.modal.stateMinTime = true;
			this.modal.stateMaxTime = true;
		},
		resetModal() {
			this.modal.id = null;
			this.modal.title = "";
			this.modal.name = "";
			this.modal.min_time = "";
			this.modal.max_time = "";
			this.modal.stateName = null;
			this.modal.stateMinTime = null;
			this.modal.stateMaxTime = null;
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
		},
		validateName() {
			const taken = this.stops.find(stop => stop.name === this.modal.name);

			if (this.modal.name.length === 0) {
				this.modal.stateName = null;
			}
			else if (taken === undefined || this.modal.name === this.modal.title) {
				this.modal.stateName = true;
			}
			else {
				this.modal.stateName = false;
			}
		},
		validateTime() {
			if (this.modal.min_time.length === 0) {
				this.modal.stateMinTime = null;
			}
			else if (Number.isNaN(Number(this.modal.min_time)) || Number(this.modal.min_time) <= 0) {
				this.modal.stateMinTime = false;
			}
			else {
				this.modal.stateMinTime = true;
			}

			if (this.modal.max_time.length === 0) {
				this.modal.stateMaxTime = null;
			}
			else if (Number.isNaN(Number(this.modal.max_time)) || Number(this.modal.max_time) <= Number(this.modal.min_time)) {
				this.modal.stateMaxTime = false;
			}
			else {
				this.modal.stateMaxTime = true;
			}
		},
	}
}
</script>