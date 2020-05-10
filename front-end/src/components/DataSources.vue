<template>
  <v-container>
    <h1>Data Sources</h1>
    <v-card>
      <v-card-title class="ma-0 pa-0">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn
          small
          fab
          dark
          color="indigo"
          @click="NewDataSource"
          data-cy="client-new-btn"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>
    <v-data-table :headers="headers" :items="dataSources" class="elevation-1"></v-data-table>
    <DataSourceEdit
      :dialog="showEditModal"
      :client="clientInEdition"
      v-on:close="showEditModal = false"
      v-on:save="SaveClient"
    />    
  </v-container>  
</template>

<script>
import { mapState, mapActions } from "vuex";
import DataSourceEdit from '@/components/DataSourceEdit.vue'

export default {
  name: "DataSources",
  components: {
    DataSourceEdit
  },
  data: () => ({
    headers: [
      { text: "id", value: "id", align: "center" },
      { text: "Name", value: "name", align: "center" },
      { text: "osm_area_id", value: "osm_area_id", align: "center" }
    ]
  }),
  computed: mapState(["dataSources"]),
  methods: {
    ...mapActions(["getDataSources"]),
    initView: function() {
      this.getDataSources();
    },
    NewDataSource: function() {
      // this.clientInEdition = {};
      // this.showEditModal = true;
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
