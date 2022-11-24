<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div>
    <AtomsCardLayout>
      <div class="row">
        <div class="col-md-9 border-right">
          <h5>
            <i
              class="fas fa-arrow-left mr-3 pointer"
              @click="$router.push('/')"
            ></i>
            Request Data Sentiment
            <span v-if="false" :class="`ml-5 badge ${progressClass}`">
              Progress : {{ progress }} %
            </span>
          </h5>
          <br />
          <div class="container">
            <input-text
              v-model="payload.name"
              name="Name Request"
              disabled
              placeholder="Presiden RI #1"
            />
            <input-text
              :value="daterange"
              name="Date Range"
              disabled
              placeholder="Presiden RI #1"
            />
            <input-tags name="Keyword" v-model="keywords" disabled />
          </div>
        </div>
        <div class="col-md-3">
          <doughnut-chart />
        </div>
      </div>
    </AtomsCardLayout>
    <div class="row">
      <div class="col-md-12 my-3">
        <AtomsCardLayout class="h-100">
          <network-analytic />
        </AtomsCardLayout>
      </div>

      <div class="col-md-12 my-3">
        <AtomsCardLayout class="h-100">
          <word-cloud />
        </AtomsCardLayout>
      </div>
    </div>
    <div class="row my-3">
      <div class="col-md-12">
        <AtomsCardLayout>
          <h6 for="Tweet">Tweet</h6>
          <hr />
          <tweet-sentiment />
        </AtomsCardLayout>
      </div>
    </div>
  </div>
</template>
<script>
import requestVue from '~/mixins/request.vue';
import DoughnutChart from '~/components/diagram/DoughnutChart.vue';
import NetworkAnalytic from '~/components/diagram/NetworkAnalytic.vue';
import WordCloud from '~/components/diagram/WordCloud.vue';
import TweetSentiment from '~/components/diagram/TweetSentiment.vue';

export default {
  name: 'add-data-request-page',
  components: {
    DoughnutChart,
    NetworkAnalytic,
    WordCloud,
    TweetSentiment,
  },
  mixins: [requestVue],
  computed: {
    daterange() {
      return `${this.$moment(this.payload.since).format(
        'DD/MM/YYYY',
      )} - ${this.$moment(this.payload.until).format('DD/MM/YYYY')}`;
    },
    keywords() {
      return this.payload.keyword
        .split("'")
        .filter((item) => item && item !== ' ')
        .map((item) => ({ text: item }));
    },
    progressClass() {
      if (this.progress === 100) return 'badge-success';
      if (this.progress > 80) return 'badge-primary';
      if (this.progress > 50) return 'badge-warning';
      return 'badge-danger';
    },
  },
  data() {
    return {
      payload: {
        name: '',
        keyword: '',
        since: new Date(),
        until: new Date(),
      },
      progress: 0,
    };
  },
  created() {
    this.getQueue();
  },
  methods: {
    getQueue() {
      this.requestGet({
        url: 'twitter/get-queue',
        name: 'queue twitter',
      }).then((response) => {
        const queue = response.find(
          (item) => item.id === Number(this.$route.params.id),
        );
        this.payload = queue;
        this.progress = (queue.processed / queue.counted_data) * 100;
      });
    },
  },
};
</script>
<style>
.page-item.disabled .page-link {
  background-color: unset !important;
}
</style>
