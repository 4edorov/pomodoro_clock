<template>
  <div>
    <b-badge class="table" variant="primary">
      Current time
      <br />
      {{time}}
      <br />
      {{date}}
    </b-badge>
  </div>
</template>

<script>
export default {
  name: 'CurrentTime',
  data () {
    return {
      time: '',
      date: ''
    }
  },
  mounted () {
    setInterval(this.updateTimeAndDate, 1000)
  },
  methods: {
    updateTimeAndDate () {
      let valueDate = new Date()

      this.time = valueDate.toLocaleTimeString()
      this.date = valueDate.toDateString()
    }
  }
}
</script>

<style scoped>
</style>
