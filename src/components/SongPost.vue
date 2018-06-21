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
    <p v-if="songData.fields">
      <a v-bind:href="'https://www.youtube.com/playlist?list=' + songData.fields.YTPlaylistID" target="_blank">YouTube playlist</a>
        <!-- |
      <a href="#">Spotify playlist</a> -->
    </p>
    <p>Tags (themes): </p>
    <br>

    <ul v-if="songData.fields">
      <li
          v-for="(value, key) in songData.fields.Arrangements"
          v-bind:key="key"
          style="padding-bottom:16px;"
      >
        <span v-if="songs[value]">
          <span>{{key+1}}. {{songs[value].fields.SongName[0]}}</span>
          <br>
          <span v-if="songs[value].fields.Video">
            <a v-bind:href="songs[value].fields.Video" target="_blank">YouTube</a>
          </span>
        </span>
      </li>
    </ul>

    <br><br><br><br>
    services: {{services}}
    <br><br><br><br>
    arrangements: {{arrangements}}
    <br><br><br><br>
    songData: {{songData}}
    <br><br>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

var Airtable = require('airtable')
var base = new Airtable({apiKey: 'keymkmleyzMTvKqtQ'}).base('appbKUM9ff992L98h')
var moment = require('moment')


export default {
  name: 'SongPost',

  data () {
    return {
      songData: {},
      songs: {}
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
      arrangements: 'arrangements'
    })
  },
  methods: {
    getDateToRetrieve: function (id) {
      var date = null
      if (id === 'next-week') {
        // console.log('id: /songs-of-the-week/next-week')
        date = this.dateNextSunday
      } else if (id === 'this-week') {
        // console.log('id: /songs-of-the-week/this-week')
        date = this.dateThisSunday
      } else if (id === 'last-week') {
        // console.log('id: /songs-of-the-week/last-week')
        date = this.dateLastSunday
      } else {
        // console.log('id: /songs-of-the-week/june-17-2018')
        date = this.dateCURLSunday
      }
      return date
    },
    getSongArrangement: function (record, scope) {
      base('Arrangements').find(record, function (err, record) {
        if (err) {
          console.error(err)
          return
        }
        // console.log('arrangement: ' + record.id)
        scope.songs[record.id] = record
        var newObj = {}
        var oldObj = scope.songs
        scope.songs = {}
        scope.songs = Object.assign(oldObj, newObj)
      })
    },
    getService: function (scope, propsObj) {

      base('Services').select(propsObj).eachPage(
        function page (records, fetchNextPage) {
          records.forEach(function (record) {
            // console.log('Retrieved', record.get('Name'))
            scope.songData = record
            if (scope.songData.fields.Arrangements) {
              scope.songData.fields.Arrangements.forEach(function (record) {
                // console.log('arrangements: ' + record + ', ' + scope)
                scope.getSongArrangement(record, scope)
              })
            }
          })
          fetchNextPage()
        }, function done (err) {
          if (err) {
            console.error(err)
          }
        })
    }
  },
  beforeRouteUpdate (to, from, next) {

    var propsObj = {
      view: 'Grid view',
      filterByFormula: 'FIND(LOWER("' + this.getDateToRetrieve(to.params.id) + '"), LOWER({UnixDate}))'
    }
    this.getService(this, propsObj)
    this.$store.dispatch('setCurrentPagePost')
    next()
    this.$store.dispatch('setCurrentSongPostDate', { postId: this.$route.params.id })
  },
  mounted () {
    this.$store.dispatch('setCurrentSongPostDate', { postId: this.$route.params.id })
    var propsObj = {
      view: 'Grid view',
      filterByFormula: 'FIND(LOWER("' + this.getDateToRetrieve(this.$route.params.id) + '"), LOWER({UnixDate}))'
    }
    this.getService(this, propsObj)
    this.$store.dispatch('setCurrentPagePost')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
