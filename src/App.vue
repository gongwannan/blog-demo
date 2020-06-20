<template>
  <div id="app">
    <h1>Django VueJs Template</h1>
    <!-- <div id="nav">
      <router-link :to="{ name: 'home' }">Vue</router-link> |
      <router-link :to="{ name: 'messages' }">Django Rest</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css'; /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
