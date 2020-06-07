<template>
  <div id="app">
    <p style="display: none;">
      <router-link to="/">Cards</router-link>|
      <router-link to="/caller">Caller</router-link>
    </p>
    <router-view/>
  </div>
</template>

<style lang='scss'>
@import "./base";

body {
  text-align: center;
}

.dab {
  &--purple {
    background: #8e44ad;
  }
  &--blue {
    background: #3498db;
  }
  &--red {
    background: #e71b06;
  }
  &--orange {
    background: #ef5f00;
  }
  &--yellow {
    background: #f1c40f;
  }
  &--green {
    background: #2ecc71;
  }
}
</style>
