<template>
  <div>
    <div class="text-right">
      <button class="btn btn-dark" @click="reload">
        <i class="mdi mdi-reload"></i>
      </button>
    </div>
    <client-only>
      <wordcloud
        v-if="!isReload"
        :data="wordcloudData"
        nameKey="name"
        valueKey="value"
      >
      </wordcloud>
    </client-only>
  </div>
</template>

<script>
/* eslint-disable */
import wordcloud from 'vue-wordcloud';
import requestVue from '~/mixins/request.vue';

export default {
  mixins: [requestVue],
  components: { wordcloud },
  computed: {
    checkeds() {
      return this.$store.state.NewsPortal.checkeds;
    },
    wordcloudData() {
      const allObjectData = {};
      for (const key in this.allData) {
        if (this.checkeds.includes(key))
          if (Object.hasOwnProperty.call(this.allData, key)) {
            const perPortal = this.allData[key];

            for (const key in perPortal) {
              if (Object.hasOwnProperty.call(perPortal, key)) {
                if (allObjectData[key]) allObjectData[key] += perPortal[key];
                else allObjectData[key] = perPortal[key];
              }
            }
          }
      }
      const sortable = Object.entries(allObjectData).sort(
        ([, a], [, b]) => b - a
      );
      return sortable
        .slice(0, 200)
        .map((item) => ({ name: item[0], value: item[1] }));
    },
  },
  data() {
    return {
      allData: {},
      isReload: false,
    };
  },
  created() {
    this.getWordcloud();
  },
  methods: {
    getWordcloud() {
      this.requestGet({
        url: 'berita/wordcloud/19',
      }).then((response) => {
        this.allData = response;
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
