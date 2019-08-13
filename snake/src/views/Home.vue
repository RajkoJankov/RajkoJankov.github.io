<template>
<v-container fill-height>
<v-layout justify-center align-center>
  <section style="text-align: center">
    <div style="height: 200px">
      <input type="text" placeholder="Enter your name" maxlength="15" style="width: 210px;
      font-size: 150%; text-align: center; padding: 2px" v-model="playerName">
      <v-btn flat class="blue--text" @click="submitName(playerName)"><v-icon>check</v-icon></v-btn>
    </div>
    <v-btn flat class="blue--text" router to="/game">Start</v-btn>
    <v-btn flat class="blue--text" router to="/highscore">Highscore</v-btn>
  </section>
</v-layout>
</v-container>   
</template>

<script>
  export default {
    data() {
      return {
        playerName: ""
      }
    },
    methods: {
      submitName: function(playerName) {
        this.$store.dispatch('submitName', playerName)
      }
    }
  }
</script>
