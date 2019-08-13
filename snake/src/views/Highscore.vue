<template>
    <div>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card style="background: linear-gradient(90deg,#239FE9,#cce6ff)">
                    <v-container fluid grid-list-sm>
                        <v-layout row v-for="score in highscore" :key="score.id">
                            <v-flex shrink pa-1>
                                <v-card-text style="font-size: 150%; color: white">{{ score.place }}.</v-card-text>
                            </v-flex>
                            <v-flex grow pa-1>
                                <v-card-text  style="font-size: 150%; color: #e6e6e6">{{ score.name }}</v-card-text>
                            </v-flex>
                            <v-flex shrink pa-1>
                                <v-card-text style="font-size: 150%; color: #595959">{{ score.score }}</v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <v-container fluid fill-height>
            <v-layout justify-center align-center>
                <v-btn large flat class="blue--text" @click="resetScore">Reset Highscore</v-btn>
                <v-btn large flat class="blue--text" router to="/" >back to main menu</v-btn>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    computed: {
        highscore(){
            return this.$store.state.highscore;
        }
    },
    methods: {
        resetScore: function() {
            return this.$store.dispatch('resetScore');
        }
    }
}
</script>