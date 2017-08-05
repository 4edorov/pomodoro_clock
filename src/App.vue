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
          {{diffMin}}
          :
          {{this.diffSec}}
          <br />
          {{workTime}}
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
      workTime: 1,
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
      this.diffMin = Math.floor(diffTime / 1000 / 60)
      this.diffSec = Math.floor(diffTime / 1000 % 60)
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
