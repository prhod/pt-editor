<template>
  <div class="home">
    <Menu/>
    <DataSources/>
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
