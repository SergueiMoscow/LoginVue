//import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//Vue.use(Vuex)
//import { createStore } from 'vuex'
import { authServer } from '@/config'

export default new Vuex.Store({
  state: () => ({

    //authServer: 'https://sushkovs.com/login/readparams.php',
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},

  }),
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token){
      state.status = 'success'
      state.token = token
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
   actions: {
    async login({commit}, user){
      //const url = state.authServer
      commit('auth_request')
      return new Promise((resolve, reject) => {
        axios.post(authServer, user)
        .then(resp => {
          console.log(resp.data)
          const token = resp.data.access
          const refresh = resp.data.refresh
          // const user = resp.data.user
          localStorage.setItem('token', token)
          localStorage.setItem('refresh', refresh)
          commit('auth_success', token)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
      },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post(authServer, null, {params: user})
        .then(resp => {
          const token = resp.data.access
          console.log('Resp.data.access: ' + resp.data.access)
          localStorage.setItem('token', token)
          commit('auth_success', token)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
     },
     logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        resolve()
      })
     }
    
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getToken: state => state.token,
//    getAuthServer: state =>state.authServer
  }
})
