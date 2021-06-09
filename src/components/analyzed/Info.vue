<template>
	<b-card bg-variant="light">
		<h1>{{ name }}</h1>
		<h3>Date Uploaded: {{ date_uploaded }}</h3>
		<h3>Route: {{ route_name }}</h3>
		<h3>Stops: {{ stops_name }}</h3>
	</b-card>
</template>

<script>
export default {
	name: "Info",
	props: ["name", "date_uploaded", "route_name", "stops_name"],
}
</script>