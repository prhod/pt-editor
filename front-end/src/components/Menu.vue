<template>
  <div id="menu">
    <v-app-bar clipped-left app color="deep-green darken-4" dark flat>
      <v-toolbar-title class="pr-4">
        <v-card color="deep-green darken-4">
          <v-card-title class="py-2">PT Editor</v-card-title>
        </v-card>
      </v-toolbar-title>
      <v-menu open-on-hover nudge-bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            dark
            icon
            style="width:100px"
            :to="{
              name: 'Home'
            }"
          >
            DataSources
          </v-btn>
        </template>
      </v-menu>      
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({})
};
</script>
