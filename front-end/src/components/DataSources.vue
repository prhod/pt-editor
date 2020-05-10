<template>
  <v-container>
    <h1>Data Sources</h1>
    <v-data-table :headers="headers" :items="dataSources" class="elevation-1"></v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "DataSources",

  data: () => ({
    headers: [
      { text: "Url", value: "url", align: "center" },
      { text: "Method", value: "method", align: "center" },
      { text: "Response", value: "response", align: "center" },
      { text: "Error message", value: "error_message", align: "center" },
      { text: "Date", value: "date", align: "center" }
    ]
  }),
  computed: mapState(["dataSources"]),
  methods: {
    ...mapActions(["getDataSources"]),
    initView: function() {
      this.getDataSources();
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
