<template>
  <div class="home">
    <Menu/>
      <v-layout row flat>
        <v-flex xs12>
          <DataSources></DataSources>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/Menu.vue'
import DataSources from '@/components/DataSources.vue'

export default {
  name: 'Home',
  components: {
    DataSources,
    Menu
  }
}
</script>
