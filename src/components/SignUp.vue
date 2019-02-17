<template>
  <div class="flex flex-1 flex-col justify-center items-center">
    <div class="mb-8 w-full">
      <p class="form-notification p-3 text-center w-full" v-if="error.message" v-text="error.message"></p>
    </div>
    <div class="w-full sm:w-1/3 relative">
      <input class="p-3 w-full shadow-md" type="email" placeholder="Email" v-model="email">
      <p class="absolute mt-1 p-1 pin-x form-notification flex" v-if='error.email'>
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path class="primary" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/>
          <path class="secondary" d="M12 19.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.5a1 1 0 0 1-2 0v-1.41a1 1 0 0 1 .55-.9L14 10.5C14.64 10.08 15 9.53 15 9c0-1.03-1.3-2-3-2-1.35 0-2.49.62-2.87 1.43a1 1 0 0 1-1.8-.86C8.05 6.01 9.92 5 12 5c2.7 0 5 1.72 5 4 0 1.3-.76 2.46-2.05 3.24L13 13.2V14z"/>
        </svg>
        <span v-text="error.email"></span>
      </p>
    </div>
    <div class="w-full sm:w-1/3 relative">
      <input class="mt-12 p-3 w-full shadow-md" type="password" placeholder="Mot de passe" v-model="password">
      <p class="absolute mt-1 p-1 pin-x form-notification flex" v-if='error.password'>
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path class="primary" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/>
          <path class="secondary" d="M12 19.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.5a1 1 0 0 1-2 0v-1.41a1 1 0 0 1 .55-.9L14 10.5C14.64 10.08 15 9.53 15 9c0-1.03-1.3-2-3-2-1.35 0-2.49.62-2.87 1.43a1 1 0 0 1-1.8-.86C8.05 6.01 9.92 5 12 5c2.7 0 5 1.72 5 4 0 1.3-.76 2.46-2.05 3.24L13 13.2V14z"/>
        </svg>
        <span v-text="error.password"></span>
      </p>
    </div>
    <div class="mt-12 flex w-full sm:w-1/3 justify-between">
      <button class="uppercase p-3 font-bold shadow-md" @click="signUp">S'enregistrer</button>
      <button class="uppercase p-3 font-bold shadow-md" @click="signIn">Se connecter</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'SignUp',
  data: () => {
    return {
      email: '',
      password: '',
      error: {
        email: null,
        password: null,
        message: null
      }
    }
  },
  computed: {
    formData: function () {
      let formData = new FormData()
      formData.append('email', this.email)
      formData.append('password', this.password)

      return formData
    },
    questionMark: function () {
      return `
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path class="primary" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/>
          <path class="secondary" d="M12 19.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.5a1 1 0 0 1-2 0v-1.41a1 1 0 0 1 .55-.9L14 10.5C14.64 10.08 15 9.53 15 9c0-1.03-1.3-2-3-2-1.35 0-2.49.62-2.87 1.43a1 1 0 0 1-1.8-.86C8.05 6.01 9.92 5 12 5c2.7 0 5 1.72 5 4 0 1.3-.76 2.46-2.05 3.24L13 13.2V14z"/>
        </svg>
      `
    }
  },
  methods: {
    signUp: function () { this.signUpOrIn(process.env.VUE_APP_API_URL + '/users') },
    signIn: function () { this.signUpOrIn(process.env.VUE_APP_API_URL + '/users/login') },
    signUpOrIn: function (endpoint) {
      this.clearError()

      axios.post(endpoint, this.formData)
        .then((response) => {
          this.$store.dispatch('signIn', response.data.user)
        })
        .catch((error) => {
          if (error.response.data.hasOwnProperty('email')) {
            this.error.email = error.response.data.email
          }
          if (error.response.data.hasOwnProperty('password')) {
            this.error.password = error.response.data.password
          }

          if (error.response.data.hasOwnProperty('message')) {
            this.error.message = error.response.data.message
          }
        })
    },
    clearError: function () {
      this.error.email = null
      this.error.password = null
      this.error.message = null
    }
  }
}
</script>
<style lang="scss">
  button {
    background-color: $light-grey;
    color: $dark-grey;
  }

  .form-notification {
    background-color: $dark-grey;
    color: $light-grey;

    .secondary {
      fill: $dark-grey;
    }
  }
</style>
