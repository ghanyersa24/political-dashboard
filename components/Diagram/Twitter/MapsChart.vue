<template>
  <div>
    <div class="text-right">
      <button class="btn btn-dark" @click="reload">
        <i class="mdi mdi-reload"></i>
      </button>
    </div>
    <l-map v-if="!isReload" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        v-for="(item, i) in markers"
        :key="i"
        :lat-lng="[item.lat, item.long]"
        :icon="getIcon(item.sentimen)"
      >
        <l-tooltip>{{ item.name }}</l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { icon } from 'leaflet';
import requestVue from '~/mixins/request.vue';

export default {
  mixins: [requestVue],
  data() {
    return {
      url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      attribution: '',
      zoom: 5,
      isReload: false,
      markers: [],
      center: [-0.3162885, 121.8052727],
    };
  },
  created() {
    this.getMarks();
  },
  methods: {
    getIcon(sentiment) {
      if (sentiment === 'positif') {
        return icon({
          iconUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Wikisource_proofread_green_circle.svg/2048px-Wikisource_proofread_green_circle.svg.png',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });
      }
      if (sentiment === 'negatif') {
        return icon({
          iconUrl:
            'https://upload.wikimedia.org/wikipedia/commons/6/6d/Red_dot.svg',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });
      }
      return icon({
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Circle_Davys-Grey_Solid.svg/768px-Circle_Davys-Grey_Solid.svg.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    },
    getMarks() {
      // center: [-0.126686, -234.819374]
      this.requestGet({
        url: 'https://api.npoint.io/63dc5e0817e62dd9e386',
      }).then((res) => {
        this.markers = res;
        this.reload();
      });
    },
    reload() {
      this.isReload = true;
      setTimeout(() => {
        this.isReload = false;
      }, 100);
    },
  },
};
</script>
