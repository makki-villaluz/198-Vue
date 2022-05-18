<template>
  <b-navbar type="dark" variant="dark" fixed-top>
    <b-navbar-brand to="/home">
      <img src="/static/favicon.png" height="25">
      <!-- <img src="../../../public/favicon.png" height="25"> -->
      JeePS
    </b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item to="/vehicles" exact-active-class="active">Vehicles</b-nav-item>
      <b-nav-item to="/routes" exact-active-class="active">Routes</b-nav-item>
      <b-nav-item to="/parameters" exact-active-class="active">Parameters</b-nav-item>
      <b-nav-item to="/admin" exact-active-class="active">Admin</b-nav-item>
      <b-nav-item to="/about" exact-active-class="active">About</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
	name: "NavBar",
}
</script>

<style scoped>
  .active {
    font-weight: 600;
    color: white;
    
  }
</style>