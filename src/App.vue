<template>
  <div id="app">

    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log('App created!')
    this.$store.dispatch('initialize')
  }
}
</script>

<style></style>
