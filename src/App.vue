<template>
  <div id="app" class="flex flex-col p-5">
    <h1 class="text-center">FRONT API</h1>
    <router-view/>
  </div>
</template>

<style lang="scss">
  body {
    background: $grey;
    color: $dark-grey;
    font-family: $font-text;
  }

  #app {
    min-height: 100vh;
    h1 {
      font-family: $font-title;
    }
  }
</style>
