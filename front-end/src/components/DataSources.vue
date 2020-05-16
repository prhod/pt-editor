<template>
  <div>
    <v-container>
      <h1>Data Sources</h1>
      <v-card>
        <v-card-title class="ma-0 pa-0">
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn small fab dark color="indigo" @click="NewDataSource" data-cy="client-new-btn">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
      <v-data-table :headers="headers" :items="dataSources" class="elevation-1"></v-data-table>
      <DataSourceEdit
        :dialog="showEditModal"
        :dataSource="dataSourceInEdition"
        v-on:close="showEditModal = false"
        v-on:save="doSaveDataSource"
      />
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
var _ = require("lodash");
/* eslint-enable no-unused-vars */

import { mapState, mapActions } from "vuex";
import DataSourceEdit from "@/components/DataSourceEdit.vue";

export default {
  name: "DataSources",
  components: {
    DataSourceEdit
  },
  data: () => ({
    showEditModal: false,
    dataSourceInEdition: {},
    headers: [
      { text: "id", value: "id", align: "center" },
      { text: "Name", value: "name", align: "center" },
      { text: "osm_area_id", value: "osm_area_id", align: "center" }
    ]
  }),
  computed: mapState(["dataSources"]),
  methods: {
    ...mapActions(["getDataSources", "saveDataSource"]),
    initView: function() {
      this.getDataSources();
    },
    NewDataSource: function() {
      this.dataSourceInEdition = {};
      this.showEditModal = true;
    },
    doSaveDataSource: function(payload) {
      this.saveDataSource(payload);
      this.showEditModal = false;
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
