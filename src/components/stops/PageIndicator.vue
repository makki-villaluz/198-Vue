<template>
  <div>
    <span v-for="n in pages-1" :key="n">
      <span v-if="n===currentPage">
        <b-icon-circle-fill :font-scale="iconSize" style="margin-right: 5px"></b-icon-circle-fill>
      </span>
      <span v-else>
        <b-icon-circle :font-scale="iconSize" style="margin-right: 5px"></b-icon-circle>
      </span>
    </span>
    <span v-if="pages===currentPage">
      <b-icon-circle-fill :font-scale="iconSize" style="margin-right: 5px"></b-icon-circle-fill>
    </span>
    <span v-else>
      <b-icon-circle :font-scale="iconSize" style="margin-right: 5px"></b-icon-circle>
    </span>
  </div>
</template>

<script>
export default {
  name: "PageIndicator",
  props: ["pages","currentPage", "iconSize"],
}
</script>