<template>
  <div class="Home">
    <div class="userlist">
      <p>{{ userName }}さんようこそ!!</p>
      <div class="button">
        <p>残高{{ wallet }}</p>
        <input
          type="button"
          value="ログアウト"
          @click="signOut()"
          class="logout"
        />
      </div>
    </div>
    <h1>ユーザ一覧</h1>
    <div>
      <p>ユーザ名</p>
      <table class="username-list">
        <tr v-for="(newUser, index) in otherUsers" :key="index" class="usertr">
          <td class="table-user">{{ newUser.userName }}</td>
          <div>
            <td>
              <button class="wallet-button" @click="openModal(index)">
                walletを見る
              </button>
            </td>
            <td>
              <button class="wallet-button">送る</button>
            </td>
          </div>
        </tr>
      </table>
    </div>
    <modal></modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
export default {
  data() {
    return {
      showContent: false,
      index: 0,
    };
  },
  components: {
    Modal,
  },
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    wallet() {
      return this.$store.getters.wallet;
    },
    otherUsers() {
      return this.$store.getters.newUser;
    },
  },
  methods: {
    updateUser() {
      this.$store.dispatch('updateUser');
    },
    signOut() {
      this.$store.dispatch('signOut');
    },
    openModal(index) {
      this.$store.dispatch('openModal', index);
      this.index = index;
    },
    getCollections() {
      this.$store.dispatch('getCollections');
    },
    userUpdate() {
      this.$store.dispatch('userUpdate');
    },
  },
  created: async function() {
    await this.getCollections();
    await this.updateUser(this.userName);
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
.button {
  display: flex;
}
.logout {
  margin-top: 20px;
  outline: none;
  background-color: white;
  height: 20px;
}
.username {
  text-align: left;
  margin-left: 150px;
}
.username-list {
  text-align: left;
  margin-left: 160px;
}
.wallet-button {
  color: white;
  background-color: blue;
  outline: none;
}
.table-user {
  width: 200px;
}
</style>
