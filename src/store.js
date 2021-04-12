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
    wallet: 1000,
    isLogin: false,
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
    wallet(state) {
      return state.wallet;
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
    logout(state) {
      state.isLogin = false;
    },
    login(state) {
      state.isLogin = true;
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
        commit('login');
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
          commit('login');
          console.log(response);
          router.push('/Home');
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateUser({ commit, state }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          console.log('error');
        } else {
          commit('setUsername', user.displayName);
          console.log(state.isLogin);
        }
      });
    },
    signOut({ commit }) {
      firebase.auth().signOut();
      commit('logout');
      router.push('/');
    },
  },
});
