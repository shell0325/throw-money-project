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
    async registerUser({ commit }, userInfo) {
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(userInfo.email, userInfo.password);
        await response.user.updateProfile({
          displayName: userInfo.userName,
        });
        const user = await firebase.auth().currentUser;
        commit('setEmail', user.email);
        commit('setPassword', user.password);
        router.push('/Home');
      } catch (e) {
        console.log(e);
      }
    },
    logIn({ commit }, userInfo) {
      firebase
        .auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((response) => {
          const user = firebase.auth().currentUser;
          commit('setEmail', user.email);
          commit('setPassword', user.password);
          commit('setUsername', user.userName);
          console.log(response);
          router.push('/Home');
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});
