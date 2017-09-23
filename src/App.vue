<template>
  <div>
    <b-card class="clock" header="Pomodoro Clock" header-variant="success">
      <div>
        <div class="row">
          <div>
            <b-button v-if="sessionState || breakState" class="table" variant="warning" @click="startOrPause">
              <i class="fa fa-pause fa-2x"></i>
            </b-button>
            <b-button v-else class="table" variant="success" @click="startOrPause">
              <i class="fa fa-play fa-2x"></i>
            </b-button>
          </div>
          <div>
            <CurrentTime></CurrentTime>
          </div>
          <div>
            <b-button class="table" variant="danger" @click="stop">
              <i class="fa fa-stop fa-2x"></i>
            </b-button>
          </div>
        </div>
        <div class="row">
          <div class="row">
            <b-button class="table-btn" variant="success" @click="setIntervals('session', 'minus')" :disabled="!!sessionInt">
              <i class="fa fa-minus"></i>
            </b-button>
            <b-badge class="table-center">
              Session time
              <br />
              {{sessionDiffMin}}
              :
              {{sessionDiffSec}}
              <br />
              {{sessionTime}} min(s)
            </b-badge>
            <b-button class="table-btn" variant="success" @click="setIntervals('session', 'plus')" :disabled="!!sessionInt">
              <i class="fa fa-plus"></i>
            </b-button>
          </div>
          <div class="row">
            <b-button class="table-btn" variant="success" @click="setIntervals('circle', 'minus')" :disabled="!!sessionInt">
              <i class="fa fa-minus"></i>
            </b-button>
            <b-badge class="table-center">
              Circles
              <br />
              {{circles}}
            </b-badge>
            <b-button class="table-btn" variant="success" @click="setIntervals('circle', 'plus')" :disabled="!!sessionInt">
              <i class="fa fa-plus"></i>
            </b-button>
          </div>
          <div class="row">
            <b-button class="table-btn" variant="success" @click="setIntervals('break', 'minus')" :disabled="!!sessionInt">
              <i class="fa fa-minus"></i>
            </b-button>
            <b-badge class="table-center">
              Break time
              <br />
              {{breakDiffMin}}
              :
              {{breakDiffSec}}
              <br />
              {{breakTime}} min(s)
            </b-badge>
            <b-button class="table-btn" variant="success" @click="setIntervals('break', 'plus')" :disabled="!!sessionInt">
              <i class="fa fa-plus"></i>
            </b-button>
          </div>
        </div>
      </div>
      <div slot="footer">
        <b-badge v-if="sessionInt" variant="success">On</b-badge>
        <b-badge v-else variant="danger">Off</b-badge>
      </div>
    </b-card>
  </div>
</template>

<script>
import CurrentTime from './components/CurrentTime'
const endAudio = require('./assets/audio/end.mp3')
const startAudio = require('./assets/audio/start.mp3')

export default {
  name: 'app',
  components: {
    CurrentTime
  },
  data () {
    return {
      sessionTime: 25,
      sessionCurrentTime: 0,
      sessionDiffMin: '',
      sessionDiffSec: '',
      sessionInt: '',
      breakTime: 5,
      breakCurrentTime: 0,
      breakDiffMin: '',
      breakDiffSec: '',
      breakInt: '',
      circles: 1,
      sessionState: false,
      breakState: false
    }
  },

  methods: {
    startOrPause () {
      if (!this.circles && !this.sessionCurrentTime) {
        return
      }
      if ((this.sessionInt && this.breakInt && !this.sessionState && !this.breakState && !this.breakCurrentTime && !this.sessionCurrentTime) || // call by breakTimer
        (!this.sessionInt && !this.breakInt)) { // first call
        this.circles -= 1
        this.sessionInt = setInterval(this.sessionTimer, 1000)
        this.sessionState = true
        this.breakState = false
        startAudio && new Audio(startAudio).play()
      } else if (this.breakCurrentTime && this.breakState && !this.sessionState) {
        clearInterval(this.breakInt)
        this.breakState = false
      } else if (this.sessionCurrentTime && this.sessionState && !this.breakState) {
        clearInterval(this.sessionInt)
        this.sessionState = false
      } else if (this.breakCurrentTime && !this.breakState && !this.sessionState) {
        this.breakInt = setInterval(this.breakTimer, 1000)
        this.breakState = true
      } else if (this.sessionCurrentTime && !this.sessionState && !this.breakState) {
        this.sessionInt = setInterval(this.sessionTimer, 1000)
        this.sessionState = true
      }
    },

    stop () {
      clearInterval(this.sessionInt)
      clearInterval(this.breakInt)

      this.sessionTime = 25
      this.sessionCurrentTime = 0
      this.sessionDiffMin = ''
      this.sessionDiffSec = ''

      this.breakTime = 5
      this.breakCurrentTime = 0
      this.breakDiffMin = ''
      this.breakDiffSec = ''

      this.circles = 1

      this.sessionInt = ''
      this.breakInt = ''
      this.sessionState = false
      this.breakState = false
    },

    sessionTimer () {
      this.sessionCurrentTime += 1000
      let sessionDiffTime = this.sessionTime * 60 * 1000 - this.sessionCurrentTime
      this.sessionDiffMin = ('0' + Math.floor(sessionDiffTime / 1000 / 60)).substr(-2)
      this.sessionDiffSec = ('0' + Math.floor(sessionDiffTime / 1000 % 60)).substr(-2)

      if (sessionDiffTime === 0 && this.circles > 0) {
        clearInterval(this.sessionInt)
        this.sessionState = false
        this.sessionCurrentTime = 0

        this.breakInt = setInterval(this.breakTimer, 1000)
        this.breakState = true
        endAudio && new Audio(endAudio).play()
      } else if (sessionDiffTime === 0 && this.circles === 0) {
        endAudio && new Audio(endAudio).play()
        this.stop()
      }
    },

    breakTimer () {
      this.breakCurrentTime += 1000
      let breakDiffTime = this.breakTime * 60 * 1000 - this.breakCurrentTime
      this.breakDiffMin = ('0' + Math.floor(breakDiffTime / 1000 / 60)).substr(-2)
      this.breakDiffSec = ('0' + Math.floor(breakDiffTime / 1000 % 60)).substr(-2)

      if (breakDiffTime === 0) {
        clearInterval(this.breakInt)
        this.breakState = false
        this.breakCurrentTime = 0

        this.startOrPause()
      }
    },

    setIntervals (timer, shift) {
      if (timer === 'session') {
        if (shift === 'minus') {
          this.sessionTime -= 1
          this.sessionTime = Math.max(this.sessionTime, 1)
        } else {
          this.sessionTime += 1
          this.sessionTime = Math.min(this.sessionTime, 25)
        }
      } else if (timer === 'break') {
        if (shift === 'minus') {
          this.breakTime -= 1
          this.breakTime = Math.max(this.breakTime, 1)
        } else {
          this.breakTime += 1
          this.breakTime = Math.min(this.breakTime, 10)
        }
      } else {
        if (shift === 'minus') {
          this.circles -= 1
          this.circles = Math.max(this.circles, 1)
        } else {
          this.circles += 1
          this.circles = Math.min(this.circles, 99)
        }
      }
    }
  }
}
</script>

<style>
.clock {
  width: 500px;
  margin: 100px auto;
}
.table {
  width: 150px;
  height: 47px;
}
.table-center {
  width: 80px;
  height: 47px;
  margin: 0 5px;
}
.table-btn {
  width: 30px;
  height: 47px;
  padding: 8px;
}
.row {
  display: flex;
  justify-content: space-around;
}
</style>
