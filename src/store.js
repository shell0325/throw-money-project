import Vue from 'vue';
import Vuex from 'vuex';
import firebase from './plugin/firebase.js';
import router from './router.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    email: '',
    password: '',
  },
  getters: {
    email(state) {
      return state.email;
    },
    password(state) {
      return state.password;
    },
    userName(state) {
      return state.userName;
    },
  },
  mutations: {
    emptyWord(state) {
      state.userName = '';
      state.email = '';
      state.password = '';
    },
    setEmail(state, email) {
      state.email = email;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setUsername(state, userName) {
      state.userName = userName;
    },
  },
  actions: {
    registerUser({ commit, state }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then((response) => {
          response.user.updateProfile({
            displayName: state.userName,
          });
          console.log(response), commit('emptyWord', state);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    signIn({ state, commit }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then((response) => {
          commit('emptyWord', state);
          console.log(response);
          router.push('/Home');
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});
