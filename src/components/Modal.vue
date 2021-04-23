<template>
  <div class="overlay" v-show="showContent">
    <div class="content">
      <p v-if="otherUsers.length !== 0">
        {{ otherUsers[index].userName }}さんの残高
      </p>
      <p v-if="otherUsers.length !== 0">{{ otherUsers[index].wallet }}</p>
      <p><button class="close" @click="closeModal">close</button></p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showContent() {
      return this.$store.getters.showContent;
    },
    index() {
      return this.$store.getters.index;
    },
    otherUsers() {
      return this.$store.getters.newUser;
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch('closeModal');
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
  height: 20%;
  margin-bottom: 200px;
  padding: 1em;
  background: #fff;
  position: relative;
}
.close {
  right: 5px;
  top: 5px;
}
</style>
