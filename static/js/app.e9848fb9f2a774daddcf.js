webpackJsonp([0],[,,function(s,t){},function(s,t){},function(s,t,e){function i(s){e(10)}var a=e(0)(e(7),e(16),i,null,null);s.exports=a.exports},,function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e(5),a=e(4),n=e.n(a),r=e(1),o=e(3),c=(e.n(o),e(2));e.n(c);i.a.config.productionTip=!1,i.a.use(r.a),new i.a({el:"#app",template:"<App/>",components:{App:n.a}})},function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e(14),a=e.n(i),n=e(12),r=e(13);t.default={name:"app",components:{CurrentTime:a.a},data:function(){return{sessionTime:25,sessionCurrentTime:0,sessionDiffMin:"",sessionDiffSec:"",sessionInt:"",breakTime:5,breakCurrentTime:0,breakDiffMin:"",breakDiffSec:"",breakInt:"",circles:1,sessionState:!1,breakState:!1}},methods:{startOrPause:function(){(this.circles||this.sessionCurrentTime)&&(this.sessionInt&&this.breakInt&&!this.sessionState&&!this.breakState&&!this.breakCurrentTime&&!this.sessionCurrentTime||!this.sessionInt&&!this.breakInt?(this.circles-=1,this.sessionInt=setInterval(this.sessionTimer,1e3),this.sessionState=!0,this.breakState=!1,r&&new Audio(r).play()):this.breakCurrentTime&&this.breakState&&!this.sessionState?(clearInterval(this.breakInt),this.breakState=!1):this.sessionCurrentTime&&this.sessionState&&!this.breakState?(clearInterval(this.sessionInt),this.sessionState=!1):!this.breakCurrentTime||this.breakState||this.sessionState?!this.sessionCurrentTime||this.sessionState||this.breakState||(this.sessionInt=setInterval(this.sessionTimer,1e3),this.sessionState=!0):(this.breakInt=setInterval(this.breakTimer,1e3),this.breakState=!0))},stop:function(){clearInterval(this.sessionInt),clearInterval(this.breakInt),this.sessionTime=25,this.sessionCurrentTime=0,this.sessionDiffMin="",this.sessionDiffSec="",this.breakTime=5,this.breakCurrentTime=0,this.breakDiffMin="",this.breakDiffSec="",this.circles=1,this.sessionInt="",this.breakInt="",this.sessionState=!1,this.breakState=!1},sessionTimer:function(){this.sessionCurrentTime+=1e3;var s=60*this.sessionTime*1e3-this.sessionCurrentTime;this.sessionDiffMin=("0"+Math.floor(s/1e3/60)).substr(-2),this.sessionDiffSec=("0"+Math.floor(s/1e3%60)).substr(-2),0===s&&this.circles>0?(clearInterval(this.sessionInt),this.sessionState=!1,this.sessionCurrentTime=0,this.breakInt=setInterval(this.breakTimer,1e3),this.breakState=!0,n&&new Audio(n).play()):0===s&&0===this.circles&&(n&&new Audio(n).play(),this.stop())},breakTimer:function(){this.breakCurrentTime+=1e3;var s=60*this.breakTime*1e3-this.breakCurrentTime;this.breakDiffMin=("0"+Math.floor(s/1e3/60)).substr(-2),this.breakDiffSec=("0"+Math.floor(s/1e3%60)).substr(-2),0===s&&(clearInterval(this.breakInt),this.breakState=!1,this.breakCurrentTime=0,this.startOrPause())},setIntervals:function(s,t){"session"===s?"minus"===t?(this.sessionTime-=1,this.sessionTime=Math.max(this.sessionTime,1)):(this.sessionTime+=1,this.sessionTime=Math.min(this.sessionTime,60)):"break"===s?"minus"===t?(this.breakTime-=1,this.breakTime=Math.max(this.breakTime,1)):(this.breakTime+=1,this.breakTime=Math.min(this.breakTime,15)):"minus"===t?(this.circles-=1,this.circles=Math.max(this.circles,1)):(this.circles+=1,this.circles=Math.min(this.circles,99))}}}},function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"CurrentTime",data:function(){return{time:"",date:""}},mounted:function(){setInterval(this.updateTimeAndDate,1e3)},methods:{updateTimeAndDate:function(){var s=new Date;this.time=s.toLocaleTimeString(),this.date=s.toDateString()}}}},function(s,t){},function(s,t){},,function(s,t,e){s.exports=e.p+"static/media/end.723fb8f.mp3"},function(s,t,e){s.exports=e.p+"static/media/start.b6d4e2b.mp3"},function(s,t,e){function i(s){e(9)}var a=e(0)(e(8),e(15),i,"data-v-1062a6e5",null);s.exports=a.exports},function(s,t){s.exports={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",[e("b-badge",{staticClass:"table-big",attrs:{variant:"primary"}},[s._v("\n    Current time\n    "),e("br"),s._v("\n    "+s._s(s.time)+"\n    "),e("br"),s._v("\n    "+s._s(s.date)+"\n  ")])],1)},staticRenderFns:[]}},function(s,t){s.exports={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",[e("b-card",{staticClass:"clock",attrs:{header:"Pomodoro Clock","header-variant":"success"}},[e("div",[e("div",{staticClass:"row-disp"},[e("div",[s.sessionState||s.breakState?e("b-button",{staticClass:"table-big",attrs:{variant:"warning"},on:{click:s.startOrPause}},[e("i",{staticClass:"fa fa-pause fa-2x"})]):e("b-button",{staticClass:"table-big",attrs:{variant:"success"},on:{click:s.startOrPause}},[e("i",{staticClass:"fa fa-play fa-2x"})])],1),s._v(" "),e("div",[e("CurrentTime")],1),s._v(" "),e("div",[e("b-button",{staticClass:"table-big",attrs:{variant:"danger"},on:{click:s.stop}},[e("i",{staticClass:"fa fa-stop fa-2x"})])],1)]),s._v(" "),e("div",{staticClass:"row-disp"},[e("div",{staticClass:"btns-table"},[e("b-button",{staticClass:"table-btn",attrs:{variant:"success",disabled:!!s.sessionInt},on:{click:function(t){s.setIntervals("session","minus")}}},[e("i",{staticClass:"fa fa-minus"})]),s._v(" "),e("b-badge",{staticClass:"table-center",attrs:{variant:"info"}},[s._v("\n            Session time\n            "),e("br"),s._v("\n            "+s._s(s.sessionDiffMin)+"\n            :\n            "+s._s(s.sessionDiffSec)+"\n            "),e("br"),s._v("\n            "+s._s(s.sessionTime)+" min(s)\n          ")]),s._v(" "),e("b-button",{staticClass:"table-btn",attrs:{variant:"success",disabled:!!s.sessionInt},on:{click:function(t){s.setIntervals("session","plus")}}},[e("i",{staticClass:"fa fa-plus"})])],1),s._v(" "),e("div",{staticClass:"btns-table"},[e("b-button",{staticClass:"table-btn",attrs:{variant:"success",disabled:!!s.sessionInt},on:{click:function(t){s.setIntervals("circle","minus")}}},[e("i",{staticClass:"fa fa-minus"})]),s._v(" "),e("b-badge",{staticClass:"table-center",attrs:{variant:"info"}},[s._v("\n            Circles\n            "),e("br"),s._v("\n            "+s._s(s.circles)+"\n          ")]),s._v(" "),e("b-button",{staticClass:"table-btn",attrs:{variant:"success",disabled:!!s.sessionInt},on:{click:function(t){s.setIntervals("circle","plus")}}},[e("i",{staticClass:"fa fa-plus"})])],1),s._v(" "),e("div",{staticClass:"btns-table"},[e("b-button",{staticClass:"table-btn",attrs:{variant:"success",disabled:!!s.sessionInt},on:{click:function(t){s.setIntervals("break","minus")}}},[e("i",{staticClass:"fa fa-minus"})]),s._v(" "),e("b-badge",{staticClass:"table-center",attrs:{variant:"info"}},[s._v("\n            Break time\n            "),e("br"),s._v("\n            "+s._s(s.breakDiffMin)+"\n            :\n            "+s._s(s.breakDiffSec)+"\n            "),e("br"),s._v("\n            "+s._s(s.breakTime)+" min(s)\n          ")]),s._v(" "),e("b-button",{staticClass:"table-btn",attrs:{variant:"success",disabled:!!s.sessionInt},on:{click:function(t){s.setIntervals("break","plus")}}},[e("i",{staticClass:"fa fa-plus"})])],1)])]),s._v(" "),e("div",{attrs:{slot:"footer"},slot:"footer"},[s.sessionInt?e("b-badge",{attrs:{variant:"success"}},[s._v("On")]):e("b-badge",{attrs:{variant:"danger"}},[s._v("Off")])],1)])],1)},staticRenderFns:[]}}],[6]);
//# sourceMappingURL=app.e9848fb9f2a774daddcf.js.map