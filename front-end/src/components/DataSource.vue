<template>
  <div>
    <v-container>
      <h1>Data Source Edition</h1>
      <v-card>
        <v-card-title class="ma-0 pa-0">
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
        </v-card-title>
        <label class="pa-4">
          <router-link
            :to="{
              name: 'networks',
              params: { data_source_id: $route.params.data_source_id }
            }"
          >Networks</router-link>          
           count :
          <span>{{ networks.length }}</span>
        </label>
        <label class="pa-4">
          Lines count :
          <span>{{ lines.length }}</span>
        </label>
      </v-card>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
var _ = require("lodash");
/* eslint-enable no-unused-vars */

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "DataSources",
  components: {},
  data: () => ({}),
  computed: {
    ...mapState(["networks", "lines"]),
  },
  methods: {
    ...mapMutations(["setDataSourceId"]),
    ...mapActions(["getNetworks", "getLines"]),
    initView: function() {
      this.setDataSourceId(this.$route.params.data_source_id);
      this.getNetworks();
      this.getLines(this.$route.params.data_source_id);
    },
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
