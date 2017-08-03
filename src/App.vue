<template>
  <div id="app">
    <CurrentTime/></CurrentTime/>
  </div>
</template>

<script>
import CurrentTime from './components/CurrentTime'

export default {
  name: 'app',
  components: {
    CurrentTime
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
