<template>
	<b-card bg-variant="light">
		<h3>Vehicle ID: {{ vehicle_id }}</h3>
		<h3>Route: {{ route_name }}</h3>
		<h3>Date Uploaded: {{ date_uploaded }}</h3>
	</b-card>
</template>

<script>
export default {
	name: "Info",
	props: ["vehicle_id", "route_name", "date_uploaded"],
}
</script>