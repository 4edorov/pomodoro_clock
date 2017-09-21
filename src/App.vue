<template>
  <div>
    <b-card class="clock" header="Pomodoro Clock" header-variant="success">
      <div>
        <CurrentTime></CurrentTime>
      </div>
      <div>
        <b-badge class="table-btn" variant="success">
          -
        </b-badge>
        <b-badge class="table-center">
          Session time
          <br />
          {{diffMin}}
          :
          {{diffSec}}
          <br />
          {{workTime}} min(s)
        </b-badge>
        <b-badge class="table-btn" variant="success">
          +
        </b-badge>
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
      workTime: 25,
      diffMin: '',
      diffSec: '',
      currentTime: Date.now(),
      workInt: ''
    }
  },
  mounted () {
    this.workInt = setInterval(this.restWorkTime, 1000)
  },
  methods: {
    restWorkTime () {
      let completitionTime = this.currentTime + this.workTime * 60 * 1000
      let diffTime = completitionTime - Date.now()
      this.diffMin = ('0' + Math.floor(diffTime / 1000 / 60)).substr(-2)
      this.diffSec = ('0' + Math.floor(diffTime / 1000 % 60)).substr(-2)
      if (this.diffMin === 0 && this.diffSec === 0) {
        clearInterval(this.workInt)
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
</style>
