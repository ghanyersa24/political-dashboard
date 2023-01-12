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
        :data="defaultWords"
        nameKey="name"
        valueKey="value"
      >
      </wordcloud>
    </client-only>
  </div>
</template>
<script>
import wordcloud from 'vue-wordcloud';
import requestVue from '~/mixins/request.vue';

export default {
  mixins: [requestVue],
  components: { wordcloud },
  data() {
    return {
      defaultWords: [],
      isReload: false,
    };
  },
  created() {
    this.getWordcloud();
  },
  methods: {
    getWordcloud() {
      this.requestGet({
        url: `twitter/wordcloud/${this.$route.params.id}`,
      }).then((response) => {
        const sortable = Object.entries(response).sort(([, a], [, b]) => b - a);

        this.defaultWords = sortable
          .slice(0, 200)
          .map((item) => ({ name: item[0], value: item[1] }));
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
