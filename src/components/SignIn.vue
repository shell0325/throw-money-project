<template>
  <div>
    <form @submit.prevent="signIn()">
      <div>
        <label>メールアドレス</label>
        <input
          type="email"
          placeholder="E-mail"
          v-model="userInfo.email"
          class="email"
        />
      </div>
      <div>
        <label>パスワード</label>
        <input
          type="password"
          v-model="userInfo.password"
          placeholder="Password"
          class="password"
        />
      </div>
      <button type="submit" class="signIn">ログイン</button>
    </form>
    <button>
      <router-link to="/Register" class="Registration"
        >新規登録はこちらから</router-link
      >
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch('logIn', this.userInfo);
    },
  },
};
</script>

<style>
.text,
.email,
.password {
  border: 1px solid;
}
.password {
  margin-left: 10px;
}
.email {
  margin-right: 20px;
}
.signIn {
  border: 1px solid;
  background-color: white;
  color: blue;
  outline: none;
  margin-top: 30px;
}
.Registration {
  color: mediumblue;
}
</style>
