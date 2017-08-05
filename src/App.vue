<template>
  <div>
    <div>
      <CurrentTime></CurrentTime>
    </div>
    <div>
      <b-badge>{{diffMin}}:{{this.diffSec}}</b-badge>
    </div>
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
</style>
