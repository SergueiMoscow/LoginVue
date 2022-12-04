<template>
    <div class="nav-bar">
        <div @click="$router.push('/')">{{ appName }}</div>
        <login-form class="login-form">

        </login-form>
    </div>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue'
import { appName } from '@/config'

export default {
    components: {
        LoginForm
    },
    data() {
        return {
            appName: appName
        }
    },
    name: 'nav-bar',
}
</script>
<style scoped>
.nav-bar {
    height: 33px;
    background: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
}
.login-form {
    margin-left: auto;
}
</style>
