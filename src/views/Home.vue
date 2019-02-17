<template>
  <div class="home flex-1 flex">
    <div class="container mx-auto flex-1 flex flex-col justify-center">
      <sign-up v-if='!this.$store.getters.isAuthenticated'></sign-up>
      <button class="uppercase p-3 font-bold shadow-md" v-if="this.$store.getters.isAuthenticated" @click="logOut">Se déconnecter</button>
    </div>
  </div>
</template>

<script>
import signUp from '@/components/SignUp'

export default {
  name: 'home',
  components: {
    signUp
  },
  methods: {
    logOut: function () {
      this.$store.dispatch('logOut')
    }
  }
}
</script>

<style lang="scss">

</style>
