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

    <iframe v-if="songData.fields" width="560" height="315" v-bind:src="'https://www.youtube.com/embed/videoseries?list=' + songData.fields.YTPlaylistID" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

    <h1 v-if="songData.fields" class="title">
      <span v-html="$options.filters.formatDate(songData.fields.Name)"></span>
    </h1>

    <p v-if="songData.fields">
      <a v-bind:href="'https://www.youtube.com/playlist?list=' + songData.fields.YTPlaylistID" target="_blank">YouTube playlist</a>
        |
      <a href="#">Spotify playlist</a>
    </p>

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

    <p>Tags: </p>

    <br><br><br><br>
    songData: {{songData}}
    <br><br>
    Weeks: <!-- {{dates}} -->
    <ul>
      <li>This week: {{dates.thisWeek}}</li>
      <li>Last week: {{dates.lastWeek}}</li>
      <li>Next week: {{dates.nextWeek}}</li>
      <li>URL Date: {{dates.urlWeek}}</li>
    </ul>
  </div>
</template>

<script>
var Airtable = require('airtable')
var base = new Airtable({apiKey: 'keymkmleyzMTvKqtQ'}).base('appbKUM9ff992L98h')

var moment = require('moment')

export default {
  name: 'SongPost',

  data () {
    return {
      songData: {},
      dates: {},
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
  methods: {
    getNextSundayDate: function (sunday) {
      return moment().startOf('day').add(1, 'weeks').isoWeekday(sunday)
    },
    getLastSundayDate: function (sunday) {
      return moment().startOf('day').subtract(1, 'week').isoWeekday(sunday)
    },
    getThisSundayDate: function (sunday) {
      return moment().startOf('day').day(sunday)
    },
    getDateFromRouteParam: function (urlString) {
      var sanitizedString = urlString.replace('-', ' ')
      // console.log('new date: ' + new Date(sanitizedString))
      // console.log('new date moment: ' + moment(new Date(sanitizedString)))
      return moment(new Date(sanitizedString)).startOf('day')
    },
    getDateToRetrieve: function (id) {
      var date = null
      if (id === 'next-week') {
        // console.log('id: /songs-of-the-week/next-week')
        date = this.dates.nextWeek.unix
      } else if (id === 'this-week') {
        // console.log('id: /songs-of-the-week/this-week')
        date = this.dates.thisWeek.unix
      } else if (id === 'last-week') {
        // console.log('id: /songs-of-the-week/last-week')
        date = this.dates.lastWeek.unix
      } else {
        // console.log('id: /songs-of-the-week/june-17-2018')
        date = this.dates.urlWeek.unix
      }

      return date
    },
    setDateValutes: function (id, sundayNumber) {
      this.dates.nextWeek = {}
      this.dates.nextWeek.date = this.getNextSundayDate(sundayNumber)
      this.dates.nextWeek.unix = Number(this.dates.nextWeek.date)

      this.dates.thisWeek = {}
      this.dates.thisWeek.date = this.getThisSundayDate(sundayNumber)
      this.dates.thisWeek.unix = Number(this.dates.thisWeek.date)

      this.dates.lastWeek = {}
      this.dates.lastWeek.date = this.getLastSundayDate(sundayNumber)
      this.dates.lastWeek.unix = Number(this.dates.lastWeek.date)

      this.dates.urlWeek = {}
      this.dates.urlWeek.date = this.getDateFromRouteParam(id)
      this.dates.urlWeek.unix = Number(this.dates.urlWeek.date)
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

    // var scope = this
    var propsObj = {
      view: 'Grid view',
      filterByFormula: 'FIND(LOWER("' + this.getDateToRetrieve(to.params.id) + '"), LOWER({UnixDate}))'
    }
    // console.log(propsObj.filterByFormula)
    this.getService(this, propsObj)
    console.log('DONE')
    next()
  },
  mounted () {
    this.setDateValutes(this.$route.params.id, 0)

    // var base = new Airtable({apiKey: 'keymkmleyzMTvKqtQ'}).base('appbKUM9ff992L98h')
    // var scope = this
    var propsObj = {
      view: 'Grid view',
      filterByFormula: 'FIND(LOWER("' + this.getDateToRetrieve(this.$route.params.id) + '"), LOWER({UnixDate}))'
    }
    // console.log(propsObj.filterByFormula)
    this.getService(this, propsObj)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
