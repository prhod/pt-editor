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
      <v-data-table :headers="headers" :items="dataSources" class="elevation-1">
        <template v-slot:item.name="{ item }">
          <v-edit-dialog :return-value.sync="item.name">
            {{ item.name }}
            <template v-slot:input>
              <v-text-field
                v-model="item.name"
                @keydown.native.enter="updateObjectProperty({
                  collection: 'data_sources',
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
        <template v-slot:item.actions="{ item }">
          <router-link
            :to="{
              name: 'data_source',
              params: { data_source_id: item.id }
            }"
          >
            <PencilIcon class="icon-2x" />
          </router-link>
          <router-link
            :to="{
              name: 'networks',
              params: { data_source_id: item.id }
            }"
          >
            <TrainCarIcon class="icon-2x" />
          </router-link>
          <v-btn
            class="pa-0 ma-0"
            data-cy="clientds-btn-delete"
            @click="onEditBBox(item);currentDataSourceID = item.id; showBboxMap = true;"
            color="grey darken-2"
            text
            icon
            dark
          >
            <EarthIcon class="icon-2x" />
          </v-btn>
        </template>
      </v-data-table>
      <DataSourceEdit
        :dialog="showEditModal"
        :dataSource="dataSourceInEdition"
        v-on:close="showEditModal = false"
        v-on:save="doSaveDataSource"
      />
    </v-container>
    <BBoxGlMap :active="showBboxMap" :bbox="bboxInEdition" @close="onMapClose" @update="onMapChange"/>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
var _ = require("lodash");
/* eslint-enable no-unused-vars */

import { mapState, mapActions } from "vuex";
import DataSourceEdit from "@/components/DataSourceEdit.vue";
import BBoxGlMap from "@/components/BBoxGlMap.vue";

import TrainCarIcon from "vue-material-design-icons/TrainCar.vue";
import PencilIcon from "vue-material-design-icons/Pencil.vue";
import EarthIcon from "vue-material-design-icons/Earth.vue";

export default {
  name: "DataSources",
  components: {
    DataSourceEdit,
    TrainCarIcon,
    PencilIcon,
    EarthIcon,
    BBoxGlMap
  },
  data: () => ({
    showEditModal: false,
    showBboxMap: false,
    dataSourceInEdition: false,
    bboxInEdition: false,
    currentDataSourceID: false,
    headers: [
      { text: "id", value: "id", align: "center" },
      { text: "Name", value: "name", align: "center" },
      { text: "bbox", value: "bbox", align: "center" },
      { text: "Networks", value: "networks_count", align: "center" },
      { text: "Lines", value: "lines_count", align: "center" },
      { text: "Actions", value: "actions", align: "center" }
    ]
  }),
  computed: {
    ...mapState(["dataSources"])
  },
  methods: {
    ...mapActions(["getDataSources", "saveDataSource", "updateObjectProperty"]),
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
    },
    onEditBBox: function(data_source) {
      this.currentDataSourceID = data_source.id;
      this.bboxInEdition = data_source.bbox;
    },
    onMapChange: function(payload) {
      this.showBboxMap = false;
      this.updateObjectProperty({
        collection: 'data_sources',
        id: this.currentDataSourceID,
        property: 'bbox',
        value: `{{${payload[0][0]}, ${payload[0][1]}}, {${payload[1][0]}, ${payload[1][1]}}}`
      });
    },
    onMapClose: function() {
      this.showBboxMap = false;
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

<style scoped>
.material-design-icon.icon-2x {
  height: 2em;
  width: 2em;
}

.material-design-icon.icon-2x > .material-design-icon__svg {
  height: 2em;
  width: 2em;
  fill: rgba(0, 0, 0, 0.54);
}
</style>