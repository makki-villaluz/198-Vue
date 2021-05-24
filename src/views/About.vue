<template>
  <b-container>
    <div class="content">
      <b-card>
        <template #header>
          <h2>About the Project</h2>
        </template>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus dignissimos ullam corrupti natus doloremque exercitationem. Expedita tempora ratione ab consequuntur nihil voluptatem recusandae molestiae laborum quibusdam, dicta fuga enim dolorum?
      </b-card>
    </div>
    <div class="content">
      <b-card>
        <template #header>
          <h2>About the System</h2>
        </template>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, maiores tempore ratione illum eligendi ea id dolorem aperiam animi consectetur ducimus accusantium sunt repellendus delectus, repudiandae fugit impedit velit voluptate.
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

