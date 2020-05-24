import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    MapBoxToken: "pk.eyJ1IjoicHJob2QiLCJhIjoiY2o2Njh6dGl0MHV6azJxcXhmaTdhdnJ0dyJ9.mSLMtT6tbazdkZGcu3-gCA",
    MapGlStyle: "mapbox://styles/mapbox/streets-v11",
    current_data_source_id: "",
    dataSources: [],
    networks: [],
    lines: []
  },
  mutations: {
    setDataSourceId(state, payload) {
      state.current_data_source_id = payload;
    },
    setDataSources(state, payload) {
      state.dataSources = payload;
    },
    setNetworks(state, payload) {
      state.networks = payload;
    },
    setLines(state, payload) {
      state.lines = payload;
    },
  },
  actions: {
    getDataSources({ commit }) {
      let postgrest = "http://localhost:3000/";
      fetch(postgrest + `data_sources_detailed`, {
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
    getNetworks({ state, commit }) {
      let postgrest = "http://localhost:3000/";
      fetch(postgrest + `networks?data_source_id=eq.${state.current_data_source_id}`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(function (resp) {
          commit("setNetworks", resp);
        })
        .catch(err => {
          console.log(err);
        });
    },    
    getLines({ commit }, data_source_id) {
      let postgrest = "http://localhost:3000/";
      fetch(postgrest + `lines?data_source_id=eq.${data_source_id}`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(function (resp) {
          commit("setLines", resp);
        })
        .catch(err => {
          console.log(err);
        });
    },    
    updateObjectProperty({ dispatch }, payload) {
      let postgrest = "http://localhost:3000/";
      let obj = {};
      obj[payload.property] = payload.value;
      fetch(postgrest + `${payload.collection}?id=eq.${payload.id}`, {
        method: "PATCH",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Prefer: "return=representation"
        }
      })
        .then(response => response.json())
        .then(function () {
          if (payload.collection == "networks") {
            dispatch("getNetworks");
          } 
          if (payload.collection == "data_sources") {
            dispatch("getDataSources");
          } 
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  modules: {
  }
})
