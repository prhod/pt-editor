<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar color="grey darken-3" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>DataSource Edition</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card-title>
        <v-card-text class="pt-2">
          <v-text-field
            v-if="newDataSource.id"
            data-cy="edit-datasource-id"
            :disabled="true"
            label="Id"
            v-model="newDataSource.id"
          ></v-text-field>
          <v-text-field
            label="Name"
            v-model="newDataSource.name"
            data-cy="edit-client-name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.native="onClose"
            >Close</v-btn
          >
          <v-btn
            data-cy="edit-datasource-save-btn"
            color="blue darken-1"
            text
            @click.native="onSave"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
// import { mapGetters, mapState } from "vuex";

export default {
  name: "DataSourceEdit",
  props: ["dialog", "dataSource"],
  data: () => ({
    newDataSource: {}
  }),
  computed: {
  },
  methods: {
    onSave: function() {
      var ds = _.cloneDeepWith(this.newDataSource);
      this.$emit("save", ds);
    },
    onClose: function() {
      this.$emit("close");
    }
  },
  watch: {
    dataSource: function(newValue) {
      if (newValue) {
        this.newDataSource = _.cloneDeepWith(newValue);
      }
    }
  }
};
</script>
