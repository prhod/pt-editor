<template>
  <div>
    <Menu />
    <v-layout row flat>
        <v-flex xs12>
        <router-view></router-view>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'

export default {
  name: "DefaultView",
  components: {
    Menu
  },
  data: () => ({})
};
</script>

<style scoped lang="scss">
ul {
  padding: 0;
}
</style>
