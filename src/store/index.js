import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import _ from 'lodash'
import Airtable from 'airtable'
var base = new Airtable({apiKey: 'keymkmleyzMTvKqtQ'}).base('appbKUM9ff992L98h')

Vue.use(Vuex)

const state = {
  count: 1,
  sunday: 0,
  dateToday: null,
  dateLastSunday: null,
  dateThisSunday: null,
  dateNextSunday: null,
  dateCURLSunday: null,
  services: {},
  arrangements: {}
}
const actions = {
  initialize ({ commit, state }) {
    // state.arrangements['rec82eUg59p3p9T8n'] = { fruit: 'banana' }
    console.log('lodash check: ' + _.has(state.arrangements, 'rec82eUg59p3p9T8n'))
    console.log('initializing...')
    // assign the important dates based around today
    commit('setDates')
    // fetch pertinent post data based on dates
    var arrangementsToFetch = []
    var fbf = ''
    var newObj = {}
    var oldObj = {}

    fbf += 'OR('
    fbf += '{UnixDate} = "' + state.dateLastSunday + '", '
    fbf += '{UnixDate} = "' + state.dateThisSunday + '", '
    fbf += '{UnixDate} = "' + state.dateNextSunday + '"'
    fbf += ')'

    base('Services').select({
      // Selecting the first 3 records in Grid view:
      view: 'Grid view',
      sort: [{field: 'UnixDate', direction: 'desc'}],
      filterByFormula: fbf
    }).eachPage(function page (records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function (record) {
        console.log('Retrieved', record.get('Name') + ', state: ' + state)
        state.services[record.id] = record
        // store arrangements that don't already exist in arrangements Object
        if (record.fields.Arrangements) {
          record.fields.Arrangements.forEach(function (arrangement) {
            console.log(arrangementsToFetch.length + '. arrangement: ' + arrangement)
            if (!_.has(state.arrangements, arrangement)) {
              arrangementsToFetch.push(arrangement)
            } else {
              console.log(arrangement + ' arrangement already exists!')
            }
          })
        }
      })
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage()

    }, function done (err) {
      if (err) {
        console.error(err)
      }
      // rebuild services array
      newObj = {}
      oldObj = state.services
      state.services = {}
      state.services = Object.assign(oldObj, newObj)
      // fetch any non-existing arrangements
      // console.log('I need to retrieve ' + arrangementsToFetch.length + ' arrangements.')
      fbf = 'OR('
      arrangementsToFetch.forEach(function (value, index) {
        fbf += 'RECORD_ID() = "' + value + '"'
        if (index < arrangementsToFetch.length - 1) {
          fbf += ', '
        }
      })
      fbf += ')'
      console.log('fbf: ' + fbf)
      base('Arrangements').select({
        view: 'Grid view',
        filterByFormula: fbf
      }).eachPage(function page (records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {
          console.log('Retrieved', record.get('Name'))
          state.arrangements[record.id] = record
        })
        fetchNextPage()
      }, function done (err) {
        if (err) {
          console.error(err)
        }
        // rebuild services array
        newObj = {}
        oldObj = state.arrangements
        state.arrangements = {}
        state.arrangements = Object.assign(oldObj, newObj)
      })
    })
  },
  setCurrentSongPostDate ({ commit, state }, argObj) {
    // console.log('setCurrentSongPostDate - postId: ' + argObj.postId)
    commit('setCustomDate', { val: moment(new Date(argObj.postId.replace('-', ' '))).startOf('day') })
    // commit('get')
    console.log('state.count: ' + state.count)
  },
  setCurrentPagePost ({ commit }) {
    console.log('setCurrentPagePost')
  }
}
const mutations = {
  increment (state) {
    state.count++
  },
  setDates (state) {
    state.dateToday = moment().startOf('day')
    state.dateLastSunday = moment().startOf('day').subtract(1, 'week').isoWeekday(state.sunday)
    state.dateThisSunday = moment().startOf('day').day(state.sunday)
    state.dateNextSunday = moment().startOf('day').add(1, 'weeks').isoWeekday(state.sunday)
  },
  setCustomDate (state, obj) {
    state.dateCURLSunday = obj.val
  }
}
const getters = {
  count: state => state.count,
  services: state => state.services,
  arrangements: state => state.arrangements,
  dateToday: state => state.dateToday,
  dateLastSunday: state => state.dateLastSunday,
  dateThisSunday: state => state.dateThisSunday,
  dateNextSunday: state => state.dateNextSunday,
  dateCURLSunday: state => state.dateCURLSunday
}

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
