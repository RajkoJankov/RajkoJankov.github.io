import Vuex from 'vuex';
import Vue from 'vue';
import { firestoreAction } from 'vuexfire'
import { db } from '../db'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        highscore: [
            {place: 1, name: 'Numero uno', score: 10},
            {place: 2, name: 'Numero Duo', score: 9},
            {place: 3, name: 'Numero Tre', score: 8},
            {place: 4, name: 'Numero Quattro', score: 7},
            {place: 5, name: 'Numero Cinque', score: 6},
            {place: 6, name: 'Numero Sei', score: 5},
            {place: 7, name: 'Numero Sette', score: 4},
            {place: 8, name: 'Numero Otto', score: 3},
            {place: 9, name: 'Numero Nove', score: 2},
            {place: 10, name: 'Numero Dieci', score: 1}
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
            db.collection('highscore').get().then(docSnapshot => {
                docSnapshot.forEach(doc => {
                    let docRef = db.collection('highscore').doc(doc.id);
                    let counter = doc.data().place - 1; 
                    return docRef.update({
                        name : state.highscore[counter].name,
                        score : state.highscore[counter].score
                    });
                });
            });
        },
        submitName: (state, name) => {
            state.username = name;
        },
        resetScore: state => {
            state.highscore = [
                {place: 1, name: 'Numero Uno', score: 10},
                {place: 2, name: 'Numero Duo', score: 9},
                {place: 3, name: 'Numero Tre', score: 8},
                {place: 4, name: 'Numero Quattro', score: 7},
                {place: 5, name: 'Numero Cinque', score: 6},
                {place: 6, name: 'Numero Sei', score: 5},
                {place: 7, name: 'Numero Sette', score: 4},
                {place: 8, name: 'Numero Otto', score: 3},
                {place: 9, name: 'Numero Nove', score: 2},
                {place: 10, name: 'Numero Dieci', score: 1}
            ];
            db.collection('highscore').get().then(docSnapshot => {
                docSnapshot.forEach(doc => {
                    let docRef = db.collection('highscore').doc(doc.id);
                    let counter = doc.data().place - 1; 
                    return docRef.update({
                        name : state.highscore[counter].name,
                        score : state.highscore[counter].score
                    });
                });
            });
        }
    },
    actions: {
        bindscores: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('highscore', db.collection('highscore'))
        }),
        unbindscores: firestoreAction(({ unbindFirestoreRef }) => {
            unbindFirestoreRef('highscore')
        }),
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

db.collection('highscore').get().then(docSnapshot => {
    store.state.highscore = [];
    docSnapshot.docs.forEach(doc => {
        store.state.highscore.push(
            {
                place : doc.data().place,
                name : doc.data().name,
                score : doc.data().score
            }   
        );
    });
});