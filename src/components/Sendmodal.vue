<template>
  <div class="overlay" v-show="showSendContent">
    <div class="content">
      <p v-if="loginUser.length !== 0">
        あなたの残高:{{ loginUser[0].wallet }}
      </p>
      <p>送る金額</p>
      <input type="number" v-model="sendWallet" class="sendWallet" />
      <button @click="getWallet(), sendWallets()">送信</button>
      <p><button class="close" @click="closeSendModal">close</button></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendWallet: '',
    };
  },
  computed: {
    showSendContent() {
      return this.$store.getters.showSendContent;
    },
    index() {
      return this.$store.getters.index;
    },
    loginUser() {
      return this.$store.getters.loginUser;
    },
  },
  methods: {
    closeSendModal() {
      this.$store.dispatch('closeSendModal');
    },
    getWallet() {
      this.$store.dispatch('getWallet', this.sendWallet);
    },
    sendWallets() {
      this.$store.dispatch('sendWallet', this.sendWallet);
      this.sendWallet = '';
    },
  },
};
</script>

<style scoped>
.overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.content {
  z-index: 2;
  width: 20%;
  height: 30%;
  margin-bottom: 200px;
  padding: 1em;
  background: #fff;
  position: relative;
}
.close {
  right: 5px;
  top: 5px;
}
.sendWallet {
  border: 1px black solid;
}
</style>
