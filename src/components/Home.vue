<template>
  <div class="Home">
    <div class="userlist">
      <p>{{ userName }}さんようこそ!!</p>
      <p>残高{{ wallet }}</p>
    </div>
    <h1>ユーザ一覧</h1>
    <p>ユーザ名</p>
  </div>
</template>

<script>
import firebase from '../plugin/firebase.js';
export default {
  data() {
    return {
      userName: '',
      wallet: 1000,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userName = user.displayName;
      }
    });
  },
};
</script>

<style scoped>
.userlist {
  display: flex;
  width: 100%;
  margin: auto;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
}
</style>
