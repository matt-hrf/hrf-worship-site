<template>
  <div>
    <ul>
      <li style="display: inline-block;">
        <router-link :to="{ name: 'SongPost', params: { id:'last-week' } }">
          Last Week
        </router-link>
      </li>
      &nbsp;|&nbsp;
      <li style="display: inline-block;">
        <router-link :to="{ name: 'SongPost', params: { id:'this-week' } }">
          This Week
        </router-link>
      </li>
      &nbsp;|&nbsp;
      <li style="display: inline-block;">
        <router-link :to="{ name: 'SongPost', params: { id:'next-week' } }">
          Next Week
        </router-link>
      </li>
    </ul>

    <!-- <iframe v-if="songData.fields" width="560" height="315" v-bind:src="'https://www.youtube.com/embed/videoseries?list=' + songData.fields.YTPlaylistID" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

    <h1 v-if="songData.fields" class="title">
      <span v-html="$options.filters.formatDate(songData.fields.Name)"></span>
    </h1> -->

    <p>Description for the week.</p>
    <p v-if="services[Number(songsOfTheWeekDate)]">
      <a v-bind:href="'https://www.youtube.com/playlist?list=' + services[Number(songsOfTheWeekDate)].fields.YTPlaylistID" target="_blank">YouTube playlist</a>
        <!-- |
      <a href="#">Spotify playlist</a> -->
    </p>
    <p>Tags (themes): </p>
    <br>

    <ul v-if="services[Number(songsOfTheWeekDate)]">
      <li
          v-for="(value, key) in services[Number(songsOfTheWeekDate)].fields.Arrangements"
          v-bind:key="key"
          style="padding-bottom:16px;"
      >
        <span v-if="arrangements[value]">
          <span>{{key+1}}. {{arrangements[value].fields.SongName[0]}}</span>
          <br>
          <span v-if="arrangements[value].fields.Video">
            <a v-bind:href="arrangements[value].fields.Video" target="_blank">YouTube</a>
          </span>
        </span>
      </li>
    </ul>

    <br><br>
    {{Number(songsOfTheWeekDate)}}
    <br><br>
    Wee: {{services[Number(songsOfTheWeekDate)]}}
    <br><br><br>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

var moment = require('moment')


export default {
  name: 'SongPost',

  data () {
    return {
    }
  },
  filters: {
    formatDate: function (value, format) {
      if (!format) {
        format = 'MMMM DD, YYYY'
      }
      var dateObj = new Date(value)
      var retDate = moment(dateObj).format(format)
      return retDate
    }
  },
  computed: {
    ...mapGetters({
      dateLastSunday: 'dateLastSunday',
      dateThisSunday: 'dateThisSunday',
      dateNextSunday: 'dateNextSunday',
      dateCURLSunday: 'dateCURLSunday',
      services: 'services',
      arrangements: 'arrangements',
      songsOfTheWeekDate: 'songsOfTheWeekDate'
    })
  },
  methods: {
    getDateToRetrieve: function (id) {
    }
  },
  beforeRouteUpdate (to, from, next) {

    next()
    this.$store.dispatch('setSongsOfTheWeekPage', { page: 'songs-of-the-week', id: this.$route.params.id })
  },
  mounted () {
    this.$store.dispatch('setSongsOfTheWeekPage', { page: 'songs-of-the-week', id: this.$route.params.id })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
