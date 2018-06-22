<template>
  <div>
    <router-link :to="{ name: 'SongPost', params: { id: 'next-week' } }">Songs of the Week</router-link>

    <ul>
      <li>Songs for the Week</li>
      <li>Songs from last week</li>
      <li>About HRF worship/vision</li>
      <li>Follow HRF on Spotify</li>
      <li>Follow HRF on YouTube</li>
      <li>Recommended reading -> page</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
