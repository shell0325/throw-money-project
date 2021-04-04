<template>
  <div>
    <div>
      <h1>新規登録画面</h1>
    </div>
    <form @submit.prevent="signUp()">
      <div>
        <label>ユーザ名</label>
        <input
          type="text"
          v-model="userInfo.userName"
          placeholder="userName"
          class="text"
        />
      </div>
      <div>
        <label>メールアドレス</label>
        <input
          type="email"
          v-model="userInfo.email"
          placeholder="E-mail"
          class="email"
        />
      </div>
      <div>
        <label>パスワード</label>
        <input
          type="text"
          v-model="userInfo.password"
          placeholder="Password"
          class="password"
        />
      </div>
      <button class="register" type="submit">新規登録</button><br />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        email: '',
        password: '',
        userName: '',
      },
    };
  },
  methods: {
    signUp() {
      this.$store.dispatch('registerUser', this.userInfo);
    },
  },
};
</script>

<style scoped>
.text,
.email,
.password {
  border: 1px solid;
}
ul li {
  list-style: none;
}
.email {
  margin-right: 47px;
}
.password {
  margin-right: 18px;
}
label {
  text-align: center;
}
.register {
  border: 1px solid;
  background-color: white;
  color: blue;
  outline: none;
}
</style>
