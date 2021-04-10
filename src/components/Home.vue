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
export default {
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    wallet() {
      return this.$store.getters.wallet;
    },
  },
  methods: {
    updateUser() {
      this.$store.dispatch('updateUser');
    },
  },
  created: function() {
    this.updateUser(this.userName);
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
