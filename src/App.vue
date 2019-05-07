<template>
  <div id="app">
    <Header v-if = 'this.$route.path !== "/index"'></Header>
    <router-view/>
    <Footer v-if = 'this.$route.path !== "/login" && this.$route.path !== "/forgot"'></Footer>
  </div>
</template>

<script>
import Header from './components/common/Header'
import Footer from './components/common/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>
