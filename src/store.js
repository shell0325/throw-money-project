import Vue from 'vue';
import Vuex from 'vuex';
import firebase, { db } from './plugin/firebase.js';
import router from './router.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    email: '',
    password: '',
    wallet: 1000,
    users: [],
    showContent: false,
    index: 0,
    otherUsers: [],
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
    users(state) {
      return state.users;
    },
    showContent(state) {
      return state.showContent;
    },
    index(state) {
      return state.index;
    },
    newUser(state) {
      return state.otherUsers;
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
    openModal(state, index) {
      state.showContent = true;
      state.index = index;
    },
    closeModal(state) {
      state.showContent = false;
    },
    setIndex(state, index) {
      state.index = index;
    },
    setFilter(state, newUser) {
      state.otherUsers = newUser;
    },
    clearUsers(state) {
      state.users = [];
    }
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
    updateUser({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          console.log('error');
        } else {
          commit('setUsername', user.displayName);
        }
      });
    },
    signOut() {
      firebase.auth().signOut();
    },
    /* eslint-disable */
    async dbCollection({ commit }, userInfo) {
      await db.collection('user').add({
        userName: userInfo.userName,
        wallet: 1000,
        email: userInfo.email,
      });
    },
    /* eslint-enable */
    async getCollections({ commit, state }) {
      commit('clearUsers');
      try {
        const snapShot = await db.collection('user').get();
        await snapShot.forEach((doc) => {
          state.users.push({
            userName: doc.data().userName,
            wallet: doc.data().wallet,
            email: doc.data().email,
          });
        });
        const user = await firebase.auth().currentUser;
        const filterEmail = state.users.filter((users) => {
          return users.email !== user.email;
        });
        commit('setFilter', filterEmail);
      } catch (e) {
        console.log(e);
      }
    },
    openModal({ commit }, index) {
      commit('openModal', index);
      commit('setIndex', index);
    },
    closeModal({ commit }) {
      commit('closeModal');
    },
  },
});
