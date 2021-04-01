import Vue from 'vue';
import Vuex from 'vuex';
import firebase from './plugin/firebase.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    email: '',
    password: '',
  },
  mutations: {
    registerUser(state) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then((response) => {
          response.user.updateProfile({
            displayName: state.userName,
          });
          console.log(response);
          state.userName = '';
          state.email = '';
          state.password = '';
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setEmail(state,email) {
      state.email = email
    },
    setPassword(state, password) {
      state.password = password
    },
    setUsername(state, userName) {
      state.userName = userName
    }
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
});
