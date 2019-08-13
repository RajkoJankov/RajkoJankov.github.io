import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        highscore: localStorage.getItem('snakeHighscore') ? 
        JSON.parse(localStorage.getItem('snakeHighscore')) : [
            {place: 1, name: 'numero uno', score: 10},
            {place: 2, name: 'numero duo', score: 9},
            {place: 3, name: 'numero tre', score: 8},
            {place: 4, name: 'numero quattro', score: 7},
            {place: 5, name: 'numero cinque', score: 6},
            {place: 6, name: 'numero sei', score: 5},
            {place: 7, name: 'numero sette', score: 4},
            {place: 8, name: 'numero otto', score: 3},
            {place: 9, name: 'numero nove', score: 2},
            {place: 10, name: 'numero dieci', score: 1}
        ],
        username: ""
    },
    getters: {
        firstScore: state => {
            return state.highscore[0].score;
        }
    },
    mutations: {
        gameover: (state, value) => {
            let object1 = state.highscore.find(x => x.score <= value);
            let index1 = state.highscore.indexOf(object1);
            if(value >= state.highscore[9].score) {
                state.highscore.splice(index1,0, {
                    place: index1 + 1,
                    name: state.username,
                    score: value
                })
            }
            if(state.highscore.length > 10) {
                state.highscore.pop();
                for(let i=index1 +1;i<state.highscore.length;i++) {
                    state.highscore[i].place += 1;
                }
            }
            localStorage.setItem('snakeHighscore', JSON.stringify(state.highscore));
        },
        submitName: (state, name) => {
            state.username = name;
        },
        resetScore: state => {
            state.highscore = [
                {place: 1, name: 'numero uno', score: 10},
                {place: 2, name: 'numero duo', score: 9},
                {place: 3, name: 'numero tre', score: 8},
                {place: 4, name: 'numero quattro', score: 7},
                {place: 5, name: 'numero cinque', score: 6},
                {place: 6, name: 'numero sei', score: 5},
                {place: 7, name: 'numero sette', score: 4},
                {place: 8, name: 'numero otto', score: 3},
                {place: 9, name: 'numero nove', score: 2},
                {place: 10, name: 'numero dieci', score: 1}
            ];
            localStorage.setItem('snakeHighscore', JSON.stringify(state.highscore));
        }
    },
    actions: {
        gameover: (context, value) => {
            context.commit('gameover', value)
        },
        submitName: (context, name) => {
            context.commit('submitName', name)
        },
        resetScore: context => {
            context.commit('resetScore')
        }
    }
})
//treba da se namesti username da radi