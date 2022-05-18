<template>
	<b-container fluid>
		<b-row style="margin: 32px 0;">
			<b-col>
				<b-card style="height: 784px">
					<template #header>
						<h3>Accounts</h3>
						<b-button 
							variant="outline-primary" 
							size="sm" 
							style="float: right"
							v-b-modal="'new_user'"
						>
							<b-icon-plus></b-icon-plus>
							User
						</b-button>
					</template>
					<div style="margin: 12px 0 32px">
						<b-form inline>
							<label for="name-form">Username</label>
							<b-form-input id="name-form" type="search" size="sm" style="width: calc(100% - 74px - 63px - 30px); margin: 0 15px"></b-form-input>
							<b-button variant="outline-primary" size="sm">Search</b-button>
						</b-form>
					</div>
					<div style="margin: 32px 0 0">
						<b-table
							:fields="accounts_table.fields"
							:items="accounts_table.items"
						>
							<template #cell(username)="row">
								<div class="data-row">{{ row.item.username }}</div>
							</template>
							<template #cell(routes)="row">
								<div class="data-row">{{ row.item.routes }}</div>
							</template>
							<template #cell(actions)>
								<div style="float: right">
									<b-button
										style="padding: 3px 12px 5px"
										variant="outline-primary"
									>
										<b-icon-pencil-square font-scale="0.80"></b-icon-pencil-square>
									</b-button>
								</div>
							</template>
						</b-table>
						<div style="width: 100%; display: flex; justify-content: center">
							<b-pagination></b-pagination>
						</div>
					</div>
				</b-card>
			</b-col>
			<b-col cols="3">
				<b-row style="padding: 0 15px 15px">
					<b-card>
						<template #header>
							<h3>Northbound API Key</h3>
						</template>
						<p>{{ northbound_api_key.old }}</p>
						<b-button 
							variant="outline-primary" 
							size="sm" 
							style="float: right"
							v-b-modal="'new-api-key'"
							@click="modalAPIKeyInfo()"
						>Edit</b-button>
					</b-card>
				</b-row>
				<b-row style="padding: 15px 15px 0">
					<b-card>
						<template #header>
							<h3>GPS Cut Off Time</h3>
						</template>
						<div class="form-spacer">
							<b-form-timepicker 
								show-seconds
								:disabled=true
								v-model="gps_cut_off_time.old"
							></b-form-timepicker>
						</div>
						<b-button 
							variant="outline-primary" 
							size="sm" 
							style="float: right"
							v-b-modal="'new-cut-off-time'"
							@click="modalCutOffTimeInfo()"
						>Edit</b-button>
					</b-card>
				</b-row>
			</b-col>
		</b-row>

		<b-modal hide-footer id="new-user">
			<template #modal-title>
				<h3>New User</h3>
			</template>
			<b-form>
				<div style="margin: 14px 0 30px">
					<b-form-group label="Username" label-cols="4">
						<b-form-input id="username" size="sm" style="width: 100%"></b-form-input>						
					</b-form-group>
				</div>
				<div style="margin: 30px 0">
					<b-form-group label="Password" label-cols="4">
						<b-form-input id="password" size="sm" style="width: 100%"></b-form-input>
					</b-form-group>
				</div>
				<div style="margin: 30px 0">
					<b-form inline>
						<label for="add-routes" cols="4">Add Routes</label>
						<b-form-input id="add-routes" type="search" size="sm" style="width: calc(100% - 159px - 44px)"></b-form-input>
						<b-input-group-append>
							<b-button variant="outline-primary" size="sm">Add</b-button>
						</b-input-group-append>
					</b-form>
				</div>
			</b-form>
		</b-modal>
		<b-modal hide-footer id="new-api-key" @hidden="resetAPIKeyModal">
			<template #modal-title>
				<h3>New API Key</h3>
			</template>
			<b-form @submit.prevent="updateAPIKey">
				<div class="form-spacer">
					<b-form-textarea
						rows="3"
						max-rows="3"
						no-resize
						v-model="northbound_api_key.new"
					></b-form-textarea>
				</div>
				<b-button type="submit" variant="outline-primary" size="sm" style="float: right">Save</b-button>
			</b-form>
		</b-modal>
		<b-modal hide-footer id="new-cut-off-time" @hidden="resetCutOffTimeModal">
			<template #modal-title>
				<h3>New Cut Off Time</h3>
			</template>
			<b-form @submit.prevent="updateCutOffTime">
				<div class="form-spacer">
					<b-form-timepicker
						show-seconds
						v-model="gps_cut_off_time.new"
					></b-form-timepicker>
				</div>
				<b-button type="submit" variant="outline-primary" size="sm" style="float: right">Save</b-button>
			</b-form>
		</b-modal>
	</b-container>
</template>

<script>
export default {
	name: "Admin",
	data() {
		return {
			northbound_api_key: {
				old: "awefawefkawuefhxanwilufhwanlifxwauhfxliwaufhwalmieufwhfliwuehflawieuflufawleiufjaxwlmufxwjamlfauwejfmxalweufjm,laweufjaxwlfeu",
				new: "",
			},
			gps_cut_off_time: {
				old: "23:59:59",
				new: "",
			},
			accounts_table: {
				fields: [
					{key: "username", sortable: true, label: "Username"},
					{key: "routes", label: "Visible Routes"},
					{key: "actions", label: ""}
				],
				items: [
					{username: "Person0", routes: "DS 0"},
					{username: "Person1", routes: "DS 0, DS 1"},
					{username: "Person2", routes: "DS 0, DS 1, DS 2"},
					{username: "Person3", routes: "DS 0, DS 1, DS 2, DS 3"},
					{username: "Person4", routes: "DS 0, DS 1, DS 2, DS 3, DS 4"},
					{username: "Person5", routes: "DS 0, DS 1, DS 2, DS 3, DS 4, DS 5"},
				]
			}
		}
	},
	methods: {
		resetAPIKeyModal() {
			this.northbound_api_key.new = "";
		},
		modalAPIKeyInfo() {
			this.northbound_api_key.new = this.northbound_api_key.old;
		},
		updateAPIKey() {
			this.northbound_api_key.old = this.northbound_api_key.new;
			this.resetAPIKeyModal();
			this.$bvModal.hide("new-api-key");
		},
		resetCutOffTimeModal() {
			this.gps_cut_off_time.new = "";
		},
		modalCutOffTimeInfo() {
			this.gps_cut_off_time.new = this.gps_cut_off_time.old;
		},
		updateCutOffTime() {
			this.gps_cut_off_time.old = this.gps_cut_off_time.new;
			this.resetCutOffTimeModal();
			this.$bvModal.hide("new-cut-off-time");
		}
	}
}
</script>

<style scoped>
	h3 {
		display: inline-block;
		margin: 0;
	}
	.card {
		width: 100%;
	}
	.form-spacer {
		margin-bottom: 16px
	}
	.data-row {
		padding-top: 5px
	}
</style>