<template>
  <client-only>
    <wordcloud :data="defaultWords" nameKey="name" valueKey="value">
    </wordcloud>
  </client-only>
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
          .slice(0, 1000)
          .map((item) => ({ name: item[0], value: item[1] }));
      });
    },
  },
};
</script>
