import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataSources: []
  },
  mutations: {
    setDataSources(state, payload) {
      state.dataSources = payload;
    },
  },
  actions: {
    getDataSources({ commit }) {
      let postgrest = "http://localhost:3000/";
      fetch(postgrest + `data_sources`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(function (resp) {
          commit("setDataSources", resp);
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveDataSource({ dispatch }, payload) {
      let postgrest = "http://localhost:3000/";
      let new_ds = {
        name: payload.name
      };
      fetch(postgrest + `data_sources`, {
        method: "POST",
        body: JSON.stringify(new_ds),
        headers: {
          "Content-Type": "application/json",
          Prefer: "return=representation"
        }
      })
        .then(response => response.json())
        .then(function () {
          dispatch("getDataSources");
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  modules: {
  }
})
