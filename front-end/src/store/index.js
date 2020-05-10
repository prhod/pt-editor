import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      dataSources: []
  },
  mutations: {
    setDataSources(state, payload) {
        state.current_client_id = payload;
      },      
  },
  actions: {
    getDataSources({ commit }) {
        let postgrest = "http://localhost:3000/";
        fetch(postgrest + `data_sources`, {
          method: "GET"
        })
          .then(response => response.json())
          .then(function(resp) {
            commit("setDataSources", resp);
          })
          .catch(err => {
            console.log(err);
          });
      },      
  },
  modules: {
  }
})
