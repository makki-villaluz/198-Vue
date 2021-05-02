<template>
  <div id="app">
    <NavBar/>
    <div class="content">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default {
  name: "App",
  components: {
    NavBar,
    Footer
  }
}
</script>

<style scoped>
  .content {
    display: flex;
    min-height: calc(100vh - 56px - 44px);
    flex-direction: column;
  }
</style>
