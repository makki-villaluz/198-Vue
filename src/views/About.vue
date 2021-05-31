<template>
  <b-container>
    <div class="content">
      <b-card>
        <template #header>
          <h2>The Project</h2>
        </template>
        This is the official website of JeePS, a part of the Arangkadata project by the University of the Philippines – Diliman, funded by the Department of Science and Technology, and supported by the Department of Transportation.
      </b-card>
    </div>
    <div class="content">
      <b-card>
        <template #header>
          <h2>The System</h2>
        </template>
        JeePS is a system that enables you to monitor several service contracting measures, just by uploading a GPX file. These measures include counting the total distance travelled, checking for speeding violations, checking for stop violations, and counting the number of loops made. All the information is presented alongside a map for visualization. These features are especially important with the shift towards a service contracting scheme.
      </b-card>
    </div>
  </b-container>
</template>

<script>

export default {
  name: 'About',
}
</script>

<style scoped>
  .content {
    margin: 32px 0 32px;
  }
</style>

