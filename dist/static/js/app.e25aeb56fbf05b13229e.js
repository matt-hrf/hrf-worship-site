webpackJsonp([1],{"3N0B":function(e,s){},BV4n:function(e,s){},GK12:function(e,s){},NHnr:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=t("7+uW"),a=t("NYxO"),r={name:"App",created:function(){console.log("App created!"),this.$store.dispatch("initialize")}},o={render:function(){var e=this.$createElement,s=this._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},staticRenderFns:[]};var i=t("VU/8")(r,o,!1,function(e){t("3N0B")},null,null).exports,u=t("/ocq"),d={render:function(){var e=this.$createElement,s=this._self._c||e;return s("div",[s("h1",[this._v(this._s(this.msg))]),this._v(" "),s("router-link",{attrs:{to:{name:"SongPost",params:{id:"next-week"}}}},[this._v("Songs of the Week")])],1)},staticRenderFns:[]};var c=t("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},d,!1,function(e){t("Us9c")},"data-v-e77eab74",null).exports,l=t("Dd8w"),j=t.n(l),f=t("PJh5"),h={name:"SongPost",data:function(){return{}},filters:{formatDate:function(e,s){s||(s="MMMM DD, YYYY");var t=new Date(e);return f(t).format(s)}},computed:j()({},Object(a.b)({dateLastSunday:"dateLastSunday",dateThisSunday:"dateThisSunday",dateNextSunday:"dateNextSunday",dateCURLSunday:"dateCURLSunday",services:"services",arrangements:"arrangements",songsOfTheWeekDate:"songsOfTheWeekDate"})),methods:{getDateToRetrieve:function(e){}},beforeRouteUpdate:function(e,s,t){t(),this.$store.dispatch("setSongsOfTheWeekPage",{page:"songs-of-the-week",id:this.$route.params.id})},mounted:function(){this.$store.dispatch("setSongsOfTheWeekPage",{page:"songs-of-the-week",id:this.$route.params.id})}},m={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("ul",[t("li",{staticStyle:{display:"inline-block"}},[t("router-link",{attrs:{to:{name:"SongPost",params:{id:"last-week"}}}},[e._v("\n        Last Week\n      ")])],1),e._v("\n     | \n    "),t("li",{staticStyle:{display:"inline-block"}},[t("router-link",{attrs:{to:{name:"SongPost",params:{id:"this-week"}}}},[e._v("\n        This Week\n      ")])],1),e._v("\n     | \n    "),t("li",{staticStyle:{display:"inline-block"}},[t("router-link",{attrs:{to:{name:"SongPost",params:{id:"next-week"}}}},[e._v("\n        Next Week\n      ")])],1)]),e._v(" "),t("p",[e._v("Description for the week.")]),e._v(" "),e.services[Number(e.songsOfTheWeekDate)]?t("p",[t("a",{attrs:{href:"https://www.youtube.com/playlist?list="+e.services[Number(e.songsOfTheWeekDate)].fields.YTPlaylistID,target:"_blank"}},[e._v("YouTube playlist")])]):e._e(),e._v(" "),t("p",[e._v("Tags (themes): ")]),e._v(" "),t("br"),e._v(" "),e.services[Number(e.songsOfTheWeekDate)]?t("ul",e._l(e.services[Number(e.songsOfTheWeekDate)].fields.Arrangements,function(s,n){return t("li",{key:n,staticStyle:{"padding-bottom":"16px"}},[e.arrangements[s]?t("span",[t("span",[e._v(e._s(n+1)+". "+e._s(e.arrangements[s].fields.SongName[0]))]),e._v(" "),t("br"),e._v(" "),e.arrangements[s].fields.Video?t("span",[t("a",{attrs:{href:e.arrangements[s].fields.Video,target:"_blank"}},[e._v("YouTube")])]):e._e()]):e._e()])})):e._e(),e._v(" "),t("br"),t("br"),e._v("\n  "+e._s(Number(e.songsOfTheWeekDate))+"\n  "),t("br"),t("br"),e._v("\n  Wee: "+e._s(e.services[Number(e.songsOfTheWeekDate)])+"\n  "),t("br"),t("br"),t("br")])},staticRenderFns:[]};var g=t("VU/8")(h,m,!1,function(e){t("BV4n")},"data-v-c075d1b4",null).exports;n.a.use(u.a);var v=new u.a({mode:"history",routes:[{path:"/",name:"HelloWorld",component:c},{path:"/songs-of-the-week/:id",name:"SongPost",component:g}]}),y=t("woOf"),p=t.n(y),k=t("PJh5"),b=t.n(k),S=t("M4fF"),w=t.n(S),T=t("+7MW"),O=new(t.n(T).a)({apiKey:"keymkmleyzMTvKqtQ"}).base("appbKUM9ff992L98h");n.a.use(a.a);var z={initialize:function(e){var s=e.commit,t=e.state;console.log("initializing..."),s("setDates");var n=[],a="",r={},o={};a+="OR(",a+='{UnixDate} = "'+t.dateLastSunday+'", ',a+='{UnixDate} = "'+t.dateThisSunday+'", ',a+='{UnixDate} = "'+t.dateNextSunday+'"',a+=")",O("Services").select({view:"Grid view",sort:[{field:"UnixDate",direction:"desc"}],filterByFormula:a}).eachPage(function(e,s){e.forEach(function(e){t.services[e.fields.UnixDate]=e,e.fields.Arrangements&&e.fields.Arrangements.forEach(function(e){w.a.has(t.arrangements,e)||n.push(e)})}),s()},function(e){e&&console.error(e),r={},o=t.services,t.services={},t.services=p()(o,r),a="OR(",n.forEach(function(e,s){a+='RECORD_ID() = "'+e+'"',s<n.length-1&&(a+=", ")}),a+=")",O("Arrangements").select({view:"Grid view",filterByFormula:a}).eachPage(function(e,s){e.forEach(function(e){t.arrangements[e.id]=e}),s()},function(e){e&&console.error(e),r={},o=t.arrangements,t.arrangements={},t.arrangements=p()(o,r)})})},setSongsOfTheWeekPage:function(e,s){e.commit;var t=e.state;console.log("setPage: "+s.page+", "+s.id),"next-week"===s.id?t.songsOfTheWeekDate=t.dateNextSunday:"this-week"===s.id?(console.log("id: /songs-of-the-week/this-week"),t.songsOfTheWeekDate=t.dateThisSunday):"last-week"===s.id?t.songsOfTheWeekDate=t.dateLastSunday:t.songsOfTheWeekDate=b()(new Date(s.id.replace("-"," "))).startOf("day")}},D={increment:function(e){e.count++},setDates:function(e){e.dateToday=b()().startOf("day"),e.dateLastSunday=b()().startOf("day").subtract(1,"week").isoWeekday(e.sunday),e.dateThisSunday=b()().startOf("day").day(e.sunday),e.dateNextSunday=b()().startOf("day").add(1,"weeks").isoWeekday(e.sunday)},setCustomDate:function(e,s){e.dateCURLSunday=s.val}},_=new a.a.Store({actions:z,getters:{count:function(e){return e.count},services:function(e){return e.services},arrangements:function(e){return e.arrangements},dateToday:function(e){return e.dateToday},dateLastSunday:function(e){return e.dateLastSunday},dateThisSunday:function(e){return e.dateThisSunday},dateNextSunday:function(e){return e.dateNextSunday},dateCURLSunday:function(e){return e.dateCURLSunday},songsOfTheWeekDate:function(e){return e.songsOfTheWeekDate}},mutations:D,state:{count:1,sunday:0,dateToday:null,dateLastSunday:null,dateThisSunday:null,dateNextSunday:null,dateCURLSunday:null,services:{},arrangements:{},songsOfTheWeekDate:null}});t("GK12");n.a.use(a.a),n.a.config.productionTip=!1,new n.a({el:"#app",router:v,store:_,components:{App:i},template:"<App/>"})},"O+0Q":function(e,s){e.exports={RETRY_DELAY_IF_RATE_LIMITED:5e3}},Us9c:function(e,s){},uslO:function(e,s,t){var n={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function a(e){return t(r(e))}function r(e){var s=n[e];if(!(s+1))throw new Error("Cannot find module '"+e+"'.");return s}a.keys=function(){return Object.keys(n)},a.resolve=r,e.exports=a,a.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.e25aeb56fbf05b13229e.js.map