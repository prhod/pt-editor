<template>
  <div>
    <v-container>
      <h1>Networks</h1>
      <v-card>
        <v-card-title class="ma-0 pa-0">
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-card>
      <v-data-table :headers="headers" :items="networks" class="elevation-1"></v-data-table>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
var _ = require("lodash");
/* eslint-enable no-unused-vars */

import { mapState, mapActions } from "vuex";

export default {
  name: "Networks",
  components: {},
  data: () => ({
    headers: [
      { text: "id", value: "id", align: "center" },
      { text: "Name", value: "name", align: "center" },
      { text: "OSM Name", value: "osm_name", align: "center" }
    ]
  }),
  computed: mapState(["networks"]),
  methods: {
    ...mapActions(["getNetworks"]),
    initView: function() {
      this.getNetworks(this.$route.params.data_source_id);
    }
  },
  created() {
    this.initView();
  },
  watch: {
    $route: function() {
      this.initView();
    }
  }
};
</script>
