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
						<b-form>
							<div style="margin: 14px 0 30px">
								<b-form-group label="URL" label-cols="4">
									<b-form-input 
										id="url" 
										size="sm" 
										style="width: 100%"
										:disabled=true
										v-model="northbound_api_key.url_old"
									></b-form-input>						
								</b-form-group>
							</div>
							<div style="margin: 14px 0 30px">
								<b-form-group label="Username" label-cols="4">
									<b-form-input 
										id="username" 
										size="sm" 
										style="width: 100%"
										:disabled=true
										v-model="northbound_api_key.user_old"
									></b-form-input>						
								</b-form-group>
							</div>
							<div style="margin: 30px 0">
								<b-form-group label="Password" label-cols="4">
									<b-form-input 
										id="password" 
										size="sm" 
										style="width: 100%"
										type="password"
										:disabled=true
										v-model="northbound_api_key.pass_old"
									></b-form-input>
								</b-form-group>
							</div>
						</b-form>
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
			<b-form>
				<div class="form-spacer">
					<b-form>
						<div style="margin: 14px 0 30px">
							<b-form-group label="URL" label-cols="4">
								<b-form-input 
									id="url" 
									size="sm" 
									style="width: 100%"
									v-model="northbound_api_key.url_new"
								></b-form-input>						
							</b-form-group>
						</div>
						<div style="margin: 14px 0 30px">
							<b-form-group label="Username" label-cols="4">
								<b-form-input 
									id="username" 
									size="sm" 
									style="width: 100%"
									v-model="northbound_api_key.user_new"
								></b-form-input>						
							</b-form-group>
						</div>
						<div style="margin: 30px 0">
							<b-form-group label="Password" label-cols="4">
								<b-form-input 
									id="password" 
									size="sm" 
									style="width: 100%"
									type="password"
									v-model="northbound_api_key.pass_new"
								></b-form-input>
							</b-form-group>
						</div>
					</b-form>
				</div>
				<b-button 
					variant="outline-primary" 
					size="sm" 
					style="float: right"
					@click="editAPIKey()"
				>Save</b-button>
			</b-form>
		</b-modal>
		<b-modal hide-footer id="new-cut-off-time" @hidden="resetCutOffTimeModal">
			<template #modal-title>
				<h3>New Cut Off Time</h3>
			</template>
			<b-form>
				<div class="form-spacer">
					<b-form-timepicker
						v-model="gps_cut_off_time.new"
					></b-form-timepicker>
				</div>
				<b-button 
					variant="outline-primary" 
					size="sm" 
					style="float: right"
					@click="editCutOffTime()"
				>Save</b-button>
			</b-form>
		</b-modal>
	</b-container>
</template>

<script>
import { fetchCutOffTime, updateCutOffTime, fetchNorthboundKey, updateNorthboundKey } from "@/api/index.js";

export default {
	name: "Admin",
	data() {
		return {
			northbound_api_key: {
				url_old: "",
				url_new: "",
				user_old: "",
				pass_old: "",
				user_new: "",
				pass_new: ""
			},
			gps_cut_off_time: {
				old: "",
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
			this.northbound_api_key.url_new = "";
			this.northbound_api_key.user_new = "";
			this.northbound_api_key.pass_new = "";
		},
		modalAPIKeyInfo() {
			this.northbound_api_key.url_new = this.northbound_api_key.url_old;
			this.northbound_api_key.user_new = this.northbound_api_key.user_old;
			this.northbound_api_key.pass_new = this.northbound_api_key.pass_old;
		},
		editAPIKey() {
			const json = {
				url: this.northbound_api_key.url_new,
				username: this.northbound_api_key.user_new,
				password: this.northbound_api_key.pass_new
			}
			updateNorthboundKey(json)
				.then(res => {
					this.northbound_api_key.url_old = res.data.new_url;
					this.northbound_api_key.user_old = res.data.new_username;
					this.northbound_api_key.pass_old = res.data.new_password;
				})
				.catch(err => console.log(err))
			this.resetAPIKeyModal();
			this.$bvModal.hide("new-api-key");
		},
		resetCutOffTimeModal() {
			this.gps_cut_off_time.new = "";
		},
		modalCutOffTimeInfo() {
			this.gps_cut_off_time.new = this.gps_cut_off_time.old;
		},
		editCutOffTime() {
			const json = {
				cut_off_time: this.gps_cut_off_time.new
			}
			updateCutOffTime(json)
				.then(res => {
					this.gps_cut_off_time.old = res.data.cut_off_time
				})
				.catch(err => console.log(err))
			this.resetCutOffTimeModal();
			this.$bvModal.hide("new-cut-off-time");
		}
	},
	created() {
		fetchCutOffTime()
			.then(res => {
				this.gps_cut_off_time.old = res.data.cut_off_time;
			})
			.catch(err => console.log(err))
		fetchNorthboundKey()
			.then(res => {
				this.northbound_api_key.url_old = res.data.northbound_url;
				this.northbound_api_key.user_old = res.data.northbound_username;
				this.northbound_api_key.pass_old = res.data.northbound_password;
			})
			.catch(err => console.log(err))
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