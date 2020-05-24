<template>
  <div ref="mapdiv" id="mapdiv" class="map" border="4px"></div>
</template>

<script>
import * as L from 'leaflet'

// const MIN_ZOOM = 10;
// const MAX_ZOOM = 27;

export default {
  name: "BBoxMap",
  data: () => ({
    map: {},
    zoom: 6
  }),
  props: ["bbox"],
  computed: {
    map_poly: function() {
      if (JSON.stringify(this.bbox) != {}) {
        return L.geoJson([this.bbox], {
          color: "#0000FF",
          opacity: 1.0,
          weight: 3,
          fillColor: "#0000FF",
          fillOpacity: 0.35
        });
      } else {
        return false;
      }
    }
  },
  methods: {
    initMap() {
      if (JSON.stringify(this.map) == "{}") {
        this.map = L.map("mapdiv").setView([48.85263, 2.36958], this.zoom);
        this.tileLayer = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 18,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }
        ).addTo(this.map);
      }
    },
    updateMap() {
      if (this.map_poly) {
        this.map_poly.addTo(this.map);
        this.map.fitBounds(this.map_poly.getBounds());
      }
    }
  },
  watch: {
  },
  mounted() {
    this.initMap();
    this.updateMap();
  }
};
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
