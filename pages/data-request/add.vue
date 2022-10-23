<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div>
    <h5>
      <i class="fas fa-arrow-left mr-3 pointer" @click="$router.push('/')"></i>
      Request Data Sentiment
    </h5>
    <hr />
    <div class="container">
      <form @submit.prevent="submit">
        <input-text
          v-model="payload.title"
          name="Name Request"
          placeholder="Presiden RI #1"
        />
        <input-date-range name="Date Range" v-model="dateRange" />

        <input-tags name="Keyword" :list="keywords" />
        <input-form name="Web Crawl">
          <input-check name="Twitter" label="Twitter" check-only />
          <input-check name="Portal berita" label="Portal berita" check-only />
        </input-form>
        <div class="text-right mt-5">
          <atoms-button secondary class="mr-3" to="/"> Cancel </atoms-button>
          <atoms-button class="primary" type="submit">Save</atoms-button>
        </div>
      </form>
      <client-only>
        <wordcloud
          :data="defaultWords"
          nameKey="name"
          valueKey="value"
          :color="myColors"
          :showTooltip="true"
          :wordClick="wordClickHandler"
        >
        </wordcloud>
      </client-only>
    </div>
  </div>
</template>
<script>
import wordcloud from 'vue-wordcloud';

export default {
  name: 'add-data-request-page',
  components: { wordcloud },
  data() {
    return {
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
      },
      keywords: [
        { text: 'Jokowi' },
        { text: 'Megawati' },
        { text: 'Prabowo' },
        { text: 'Anies Baswedan' },
        { text: 'Ganjar Pranowo' },
        { text: 'Ridwan Kamil' },
      ],
      payload: { title: '', start: '', end: '' },
      myColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
      defaultWords: [
        {
          name: 'Cat',
          value: 26,
        },
        {
          name: 'fish',
          value: 19,
        },
        {
          name: 'things',
          value: 18,
        },
        {
          name: 'look',
          value: 16,
        },
        {
          name: 'two',
          value: 15,
        },
        {
          name: 'fun',
          value: 100,
        },
        {
          name: 'know',
          value: 9,
        },
        {
          name: 'good',
          value: 9,
        },
        {
          name: 'play',
          value: 6,
        },
      ],
    };
  },
  methods: {
    submit() {
      // alert(JSON.stringify(this.payload));
    },
    wordClickHandler(name, value, vm) {
      // eslint-disable-next-line no-console
      console.log('wordClickHandler', name, value, vm);
    },
  },
};
</script>
