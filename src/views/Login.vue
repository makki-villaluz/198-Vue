<template>
	<div class="center">
		<b-row>
			<b-col>
				<!-- <img src="../../public/favicon.png" height="140"> -->
				<img src="/static/favicon.png" height="140">
			</b-col>
			<b-col>
				<div style="font-size: 72px; padding: 16px 0;">
					JeePS
				</div>
			</b-col>
		</b-row>
		<b-row>
			<b-card bg-variant="light" border-variant="light" style="width: 100%; text-align: center">
				<b-row>
					<div style="width: 100%; font-size: 40px; text-align: center;">
						Login
					</div>
				</b-row>
				<b-row style="display: flex; justify-content: center">
					<b-form class="w-75">
						<b-form-input
							required
							class="w-100 form-control-sm"
							placeholder="Username"
							style="margin: 40px 0"
						></b-form-input>
						<b-form-input
							required
							class="w-100 form-control-sm"
							type="password"
							placeholder="Password"
							style="margin: 40px 0"
						></b-form-input>
						<b-button 
							type="submit" 
							variant="primary" 
							style="font-size: 28px"
							to="/home"
						>Login</b-button>
					</b-form>
				</b-row>
			</b-card>
		</b-row>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {

		}
	}
}
</script>

<style scoped>
	.center {
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
</style>