<template>
	<div>
		<b-card>
			<template #header>
				<p>This is the Stop Violation Detector Card</p>
			</template>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "Stop",
	props: ["id"],
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>