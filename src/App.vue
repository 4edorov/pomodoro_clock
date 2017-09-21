<template>
  <div>
    <b-card class="clock" header="Pomodoro Clock" header-variant="success">
      <div>
        <div class="row">
          <div>
            <b-button v-if="sessionInt" class="table" variant="success">
              <i class="fa fa-pause fa-2x"></i>
            </b-button>
            <b-button v-else class="table" variant="success" @click="start">
              <i class="fa fa-play fa-2x"></i>
            </b-button>
          </div>
          <div>
            <CurrentTime></CurrentTime>
          </div>
          <div>
            <b-button class="table" variant="success" @click="stop">
              <i class="fa fa-stop fa-2x"></i>
            </b-button>
          </div>
        </div>
        <div class="row">
          <div class="row">
            <b-button class="table-btn" variant="success" @click="setIntervals('session', 'minus')">
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
            <b-button class="table-btn" variant="success" @click="setIntervals('session', 'plus')">
              <i class="fa fa-plus"></i>
            </b-button>
          </div>
          <div class="row">
            <b-button class="table-btn" variant="success" @click="setIntervals('circle', 'minus')">
              <i class="fa fa-minus"></i>
            </b-button>
            <b-badge class="table-center">
              Circles
              <br />
              {{circles}}
            </b-badge>
            <b-button class="table-btn" variant="success" @click="setIntervals('circle', 'plus')">
              <i class="fa fa-plus"></i>
            </b-button>
          </div>
          <div class="row">
            <b-button class="table-btn" variant="success" @click="setIntervals('break', 'minus')">
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
            <b-button class="table-btn" variant="success" @click="setIntervals('break', 'plus')">
              <i class="fa fa-plus"></i>
            </b-button>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import CurrentTime from './components/CurrentTime'

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
      currentTime: Date.now(),
      breakTime: 5,
      breakCurrentTime: 0,
      breakDiffMin: '',
      breakDiffSec: '',
      breakInt: '',
      circles: 1
    }
  },

  methods: {
    start () {
      this.circles -= 1
      this.sessionInt = setInterval(this.sessionTimer, 1000)
    },

    stop () {
      clearInterval(this.sessionInt)
      console.log('sesInt', this.sessionInt)
    },

    sessionTimer () {
      this.sessionCurrentTime += 1000
      let sessionDiffTime = this.sessionTime * 60 * 1000 - this.sessionCurrentTime
      this.sessionDiffMin = ('0' + Math.floor(sessionDiffTime / 1000 / 60)).substr(-2)
      this.sessionDiffSec = ('0' + Math.floor(sessionDiffTime / 1000 % 60)).substr(-2)
    },

    breakTimer () {
      this.breakCurrentTime += 1000
      let breakDiffTime = this.breakTime * 60 * 1000 - this.breakCurrentTime
      this.breakDiffMin = ('0' + Math.floor(breakDiffTime / 1000 / 60)).substr(-2)
      this.breakDiffSec = ('0' + Math.floor(breakDiffTime / 1000 % 60)).substr(-2)
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
  width: 140px;
  height: 50px;
}
.table-center {
  width: 80px;
  height: 50px;
}
.table-btn {
  width: 30px;
  height: 50px;
}
.row {
  display: flex;
  justify-content: space-around;
}
</style>
