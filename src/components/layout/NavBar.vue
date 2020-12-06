<template>
  <b-navbar type="dark" variant="dark" fixed-top>
    <b-navbar-brand to="/">NDSG</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item to="/trajectories">Trajectories</b-nav-item>
      <b-nav-item to="/routes">Routes</b-nav-item>
      <b-nav-item to="/stops">Stops</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
	name: "NavBar",
}
</script>

<style scoped>

</style>