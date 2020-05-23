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
      <v-data-table :headers="headers" :items="networks" class="elevation-1">
        <template v-slot:item.name="{ item }">
          <v-edit-dialog :return-value.sync="item.name" @save="save" @cancel="cancel">
            {{ item.name }}
            <template v-slot:input>
              <v-text-field
                v-model="item.name"
                :rules="[max25chars]"
                @keydown.native.enter="updateObjectProperty({
                  collection: 'networks',
                  id: item.id,
                  property: 'name',
                  value: item.name
                })"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.osm_name="{ item }">
          <v-edit-dialog :return-value.sync="item.osm_name" @save="save" @cancel="cancel">
            {{ item.osm_name }}
            <template v-slot:input>
              <v-text-field
                v-model="item.osm_name"
                :rules="[max25chars]"
                @keydown.native.enter="updateObjectProperty({
                  collection: 'networks',
                  id: item.id,
                  property: 'osm_name',
                  value: item.osm_name
                })"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.line_count="{ item }">
          <span>{{ networkLinesCount(item.id) }}</span>
        </template>
      </v-data-table>
    </v-container>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
var _ = require("lodash");
/* eslint-enable no-unused-vars */

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Networks",
  components: {},
  data: () => ({
    snack: false,
    snackColor: "",
    snackText: "",
    max25chars: v => (v == null || v.length <= 25) || "Input too long!",
    headers: [
      { text: "id", value: "id", align: "center" },
      { text: "Name", value: "name", align: "center" },
      { text: "OSM Name", value: "osm_name", align: "center" },
      { text: "Line count", value: "line_count", align: "center" }
    ]
  }),
  computed: mapState(["networks", "lines"]),
  methods: {
    ...mapMutations(["setDataSourceId"]),
    ...mapActions(["getNetworks", "getLines", "updateObjectProperty"]),
    initView: function() {
      this.setDataSourceId(this.$route.params.data_source_id);
      this.getNetworks();
      this.getLines(this.$route.params.data_source_id);
    },
    networkLinesCount: function(network_id) {
      return this.lines.filter(l => l.network_id == network_id).length;
    },
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel () {
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
