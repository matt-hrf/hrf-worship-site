<template>
  <div>
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
    }
  },
  mounted () {
    var sundayNum = 0 // for Sunday
    // var today = moment().isoWeekday()
    // console.log('this.getNextSundayDate(sundayNum): ' + this.getNextSundayDate(sundayNum))
    // console.log('weeee: ' + this.getDateFromRouteParam(this.$route.params.id))
    var dateToRetrieve = null

    this.dates.nextWeek = {}
    this.dates.nextWeek.date = this.getNextSundayDate(sundayNum)
    this.dates.nextWeek.unix = Number(this.dates.nextWeek.date)

    this.dates.thisWeek = {}
    this.dates.thisWeek.date = this.getThisSundayDate(sundayNum)
    this.dates.thisWeek.unix = Number(this.dates.thisWeek.date)

    this.dates.lastWeek = {}
    this.dates.lastWeek.date = this.getLastSundayDate(sundayNum)
    this.dates.lastWeek.unix = Number(this.dates.lastWeek.date)

    this.dates.urlWeek = {}
    this.dates.urlWeek.date = this.getDateFromRouteParam(this.$route.params.id)
    this.dates.urlWeek.unix = Number(this.dates.urlWeek.date)

    if (this.$route.params.id === 'next-week') {
      // console.log('id: /songs-of-the-week/next-week')
      dateToRetrieve = this.dates.nextWeek.unix
    } else if (this.$route.params.id === 'this-week') {
      // console.log('id: /songs-of-the-week/this-week')
      dateToRetrieve = this.dates.thisWeek.unix
    } else if (this.$route.params.id === 'last-week') {
      // console.log('id: /songs-of-the-week/last-week')
      dateToRetrieve = this.dates.lastWeek.unix
    } else {
      // console.log('id: /songs-of-the-week/june-17-2018')
      dateToRetrieve = this.dates.urlWeek.unix
    }
    // console.log('dateToRetrieve: ' + dateToRetrieve)
    // var dateObj = new Date(dateToRetrieve)
    // var retDate = moment(dateObj).format('MMMM DD, YYYY')
    // console.log('retDate: ' + retDate + '  --  dateObj: ' + dateObj)

    var base = new Airtable({apiKey: 'keymkmleyzMTvKqtQ'}).base('appbKUM9ff992L98h')
    var scope = this
    var propsObj = {
      view: 'Grid view',
      filterByFormula: 'FIND(LOWER("' + dateToRetrieve + '"), LOWER({UnixDate}))'
    }
    console.log(propsObj.filterByFormula)
    base('Services').select(propsObj).eachPage(
      function page (records, fetchNextPage) {
        records.forEach(function (record) {
          console.log('Retrieved', record.get('Name'))
          scope.songData = record
          if (scope.songData.fields.Arrangements) {
            scope.songData.fields.Arrangements.forEach(function (record) {
              console.log('arrangements: ' + record + ', ' + scope)
              base('Arrangements').find(record, function (err, record) {
                if (err) {
                  console.error(err)
                  return
                }
                console.log('arrangement: ' + record.id)
                scope.songs[record.id] = record
                var newObj = {}
                var oldObj = scope.songs
                scope.songs = {}
                scope.songs = Object.assign(oldObj, newObj)
              })
            })
          }
        })
        fetchNextPage()
      }, function done (err) {
        if (err) {
          console.error(err)
        }
      })
    /* base('Services').find(propsObj, function (err, record) {
      if (err) {
        console.error(err)
        return
      }
      console.log(record)
      scope.songData = record
    }) */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
