<template>
  <div>
    <form v-if="!isLoggedIn" class="login" @submit.prevent="login">
      <input class="login-input" required v-model="email" type="email" placeholder="Name" />
      <input class="login-input"
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
    <div v-else>
        <button type="submit" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
      login: function () {
        this.$store.dispatch('login', { email: this.email, password: this.password })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      },
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
      },
    },
  computed: {
    isLoggedIn : function(){ 
        console.log("LoggedIn" + this.$store.getters.isLoggedIn)
        return this.$store.getters.isLoggedIn
    }
  },

  name: "login-form",
};
</script>
<style scoped>
.login-input {
    width: 100px;
}
</style>
