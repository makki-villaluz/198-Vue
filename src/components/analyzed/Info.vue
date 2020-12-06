<template>
	<b-card bg-variant="light">
		<h1>{{ name }}</h1>
		<h3>Filename: {{ filename }}</h3>
	</b-card>
</template>

<script>
export default {
	name: "Info",
	props: ["id", "name", "filename"],
}
</script>