<template>
  <div>
    <div>
      <h1>新規登録画面</h1>
    </div>
    <form @submit.prevent="registerUser">
      <div>
        <label>ユーザ名</label>
        <input
          type="text"
          v-model="userName"
          placeholder="userName"
          class="text"
        />
      </div>
      <div>
        <label>メールアドレス</label>
        <input
          type="email"
          v-model="email"
          placeholder="E-mail"
          class="email"
        />
      </div>
      <div>
        <label>パスワード</label>
        <input
          type="text"
          v-model="password"
          placeholder="Password"
          class="password"
        />
      </div>
      <button class="register" type="submit">新規登録</button><br />
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations(['registerUser']),
  },
  computed: {
    email: {
      get() {
        return this.$store.getters.email;
      },
      set(value) {
        this.$store.commit('setEmail', value);
      },
    },
    userName:{
      get(){
        return this.$store.getters.userName;
      },
      set(value){
        this.$store.commit('setUsername',value)
      }
    },
    password:{
      get(){
        return this.$store.getters.password
      },
      set(value){
        this.$store.commit('setPassword',value)
      }
    }
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
