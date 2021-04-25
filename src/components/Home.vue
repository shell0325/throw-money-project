<template>
  <div class="Home">
    <div class="userlist">
      <p v-if="loginUser.length !== 0">
        {{ loginUser[0].userName }}さんようこそ!!
      </p>
      <div class="button">
        <p v-if="loginUser.length !== 0">残高{{ loginUser[0].wallet }}</p>
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
      <p class="username">ユーザ名</p>
      <table class="usernamelist">
        <tr
          v-for="(otherLogin, index) in otherLoginUser"
          :key="index"
          class="usertr"
        >
          <td class="tableuser">{{ otherLogin.userName }}</td>
          <div>
            <td>
              <button
                class="walletButton"
                @click="openModal(index), getCollections()"
              >
                walletを見る
              </button>
            </td>
            <td>
              <button class="walletButton" @click="openSendModal(index)">
                送る
              </button>
            </td>
          </div>
        </tr>
      </table>
    </div>
    <modal></modal>
    <sendmodal></sendmodal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import Sendmodal from './Sendmodal.vue';

export default {
  data() {
    return {
      showContent: false,
      index: 0,
      showSendContent: false,
    };
  },
  components: {
    Modal,
    Sendmodal,
  },
  computed: {
    otherLoginUser() {
      return this.$store.getters.otherLoginUser;
    },
    loginUser() {
      return this.$store.getters.loginUser;
    },
  },
  methods: {
    updateUsername() {
      this.$store.dispatch('updateUsername');
    },
    signOut() {
      this.$store.dispatch('signOut');
    },
    openModal(index) {
      this.$store.dispatch('openModal', index);
      this.index = index;
    },
    openSendModal(index) {
      this.$store.dispatch('openSendModal', index);
      this.index = index;
    },
    async getCollections() {
      await this.$store.dispatch('getCollections');
    },
    async getcollection() {
      await this.$store.dispatch('getcollection');
    },
    async dataUpdate() {
      await this.$store.dispatch('dataUpdate');
    },
    submitButton(index) {
      this.$store.dispatch('submitButton', index);
      this.index = index;
    },
  },
  created: async function() {
    await this.getCollections();
    await this.dataUpdate();
    await this.updateUsername(this.userName);
  },
};
</script>

<style>
.userlist {
  display: flex;
  width: 100%;
  margin: auto;
  align-items: center;
  justify-content: space-around;
}
.button {
  display: flex;
}
.logout {
  margin-top: 20px;
  margin-left: 10px;
  outline: none;
  background-color: white;
  height: 20px;
}
.username {
  text-align: left;
  margin-left: 150px;
}
.usernamelist {
  text-align: left;
  margin-left: 160px;
}
.walletButton {
  color: white;
  background-color: blue;
  outline: none;
}
.tableuser {
  width: 200px;
}
</style>
