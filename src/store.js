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
    showContent: false,
    index: 0,
    showSendContent: false,
    loginUser: [],
    allUser: [],
    otherLoginUser: [],
    sendWallet: 0,
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
    showContent(state) {
      return state.showContent;
    },
    showSendContent(state) {
      return state.showSendContent;
    },
    index(state) {
      return state.index;
    },
    otherLoginUser(state) {
      return state.otherLoginUser;
    },
    loginUser(state) {
      return state.loginUser;
    },
    sendWallet(state) {
      return state.sendWallet;
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
    openModal(state) {
      state.showContent = true;
    },
    closeModal(state) {
      state.showContent = false;
    },
    openSendModal(state) {
      state.showSendContent = true;
    },
    closeSendModal(state) {
      state.showSendContent = false;
    },
    setIndex(state, index) {
      state.index = index;
    },
    loginUser(state, loginUser) {
      state.loginUser = loginUser;
    },
    allUser(state, allUser) {
      state.allUser = allUser;
    },
    otherLoginUser(state, otherLoginUser) {
      state.otherLoginUser = otherLoginUser;
    },
    resetUser(state) {
      state.allUser = [];
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
    updateUsername({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          console.log('error');
        } else {
          commit('setUsername', user.displayName);
        }
      });
    },
    signOut({ commit }) {
      firebase.auth().signOut();
      commit('resetUser');
    },
    /* eslint-disable */
    async dbRegistration({ commit }, userInfo) {
      await db.collection('user').add({
        userName: userInfo.userName,
        wallet: 1000,
        email: userInfo.email,
        login: 'login',
      });
    },
    /* eslint-enable */
    async getCollections({ commit, state }) {
      commit('resetUser');
      try {
        const snapShot = await db.collection('user').get();
        await snapShot.forEach((doc) => {
          state.allUser.push({
            userName: doc.data().userName,
            wallet: doc.data().wallet,
            email: doc.data().email,
            id: doc.id,
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
    openModal({ commit }, index) {
      commit('openModal');
      commit('setIndex', index);
    },
    closeModal({ commit }) {
      commit('closeModal');
    },
    openSendModal({ commit }, index) {
      commit('openSendModal');
      commit('setIndex', index);
    },
    closeSendModal({ commit }) {
      commit('closeSendModal');
    },
    async getWallet({ commit, state }, sendWallet) {
      const postRef = await db
        .collection('user')
        .doc(state.otherLoginUser[state.index].id);
      const postDoc = await postRef.get();
      const getLogins = await db.collection('user').doc(state.loginUser[0].id);
      const getLogin = await getLogins.get();
      if (getLogin.data().wallet > 0) {
        await postRef.update({
          wallet: postDoc.data().wallet + Number(sendWallet),
        });
        commit('resetUser');
      }
    },
    async sendWallet({ commit, state }, sendWallet) {
      const postRef = await db.collection('user').doc(state.loginUser[0].id);
      const postDoc = await postRef.get();
      if (postDoc.data().wallet > 0) {
        await postRef.update({
          wallet: postDoc.data().wallet - sendWallet,
        });
        commit('resetUser');
      } else if (postDoc.data().wallet <= 0) {
        alert('残高がありません');
      }
    },
    async dataUpdate({ commit, state }) {
      await db
        .collection('user')
        .where('login', '==', 'login')
        .onSnapshot((doc) => {
          commit('resetUser');
          doc.forEach((doc) => {
            state.allUser.push({
              userName: doc.data().userName,
              wallet: doc.data().wallet,
              email: doc.data().email,
              id: doc.id,
            });
          });
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              const filterLoginUser = state.allUser.filter((allUser) => {
                return user.email === allUser.email;
              });
              const filterOtherLoginUser = state.allUser.filter(
                (otherLoginUser) => {
                  return user.email !== otherLoginUser.email;
                }
              );
              commit('loginUser', filterLoginUser);
              commit('otherLoginUser', filterOtherLoginUser);
            }
          });
        });
    },
  },
});
