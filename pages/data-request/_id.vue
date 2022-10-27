<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div>
    <AtomsCardLayout>
      <h5>
        <i
          class="fas fa-arrow-left mr-3 pointer"
          @click="$router.push('/')"
        ></i>
        Request Data Sentiment
        <span class="ml-5 badge badge-primary">progress : {{ progress }}</span>
      </h5>
      <hr />
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
    </AtomsCardLayout>
    <div class="row">
      <div class="col-md-8">
        <AtomsCardLayout class="h-100">
          <div id="network">
            <network
              ref="network"
              :nodes="nodes"
              :edges="edges"
              :options="options"
            >
            </network>
          </div>
        </AtomsCardLayout>
      </div>
      <div class="col-md-4">
        <AtomsCardLayout class="h-100">
          <pie-chart
            :chart-options="{
              responsive: true,
            }"
            :chart-data="chartData"
          />
        </AtomsCardLayout>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12">
        <AtomsCardLayout>
          <h6 for="Tweet">Tweet</h6>
          <hr />
          <div class="table-responsive">
            <table class="table table-striped">
              <tbody>
                <tr v-for="(item, i) in sentimens" :key="i">
                  <td width="10%" class="p-0 pl-2">
                    {{ item.mark }}
                  </td>
                  <td>
                    <a
                      class="text-decoration-none"
                      :href="item.url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ item.content }}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </AtomsCardLayout>
      </div>
      <client-only>
        <wordcloud
          v-if="false"
          :data="defaultWords"
          nameKey="name"
          valueKey="value"
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
import { Network } from 'vue-vis-network';
import requestVue from '~/mixins/request.vue';

export default {
  name: 'add-data-request-page',
  components: { wordcloud, Network },
  mixins: [requestVue],
  computed: {
    daterange() {
      return `${this.$moment(this.payload.since).format(
        'DD/MM/YYYY',
      )} - ${this.$moment(this.payload.until).format('DD/MM/YYYY')}`;
    },
    keywords() {
      return this.payload.keyword.split('|').map((item) => ({ text: item }));
    },
    chartData() {
      const labels = ['Positif', 'Negatif', 'Netral'];
      let positif = 0;
      let netral = 0;
      let negatif = 0;

      this.sentimens.forEach((item) => {
        if (item.mark === 'positif') positif += 1;
        if (item.mark === 'netral') netral += 1;
        if (item.mark === 'negatif') negatif += 1;
      });
      return {
        labels,
        datasets: [
          {
            data: [positif, netral, negatif],
            backgroundColor: ['#47c363', '#e3eaef', '#fc544b'],
          },
        ],
      };
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
      defaultWords: [],
      nodes: [],
      edges: [],
      options: {
        edges: {
          color: 'lightgray',
        },
      },
      sentimens: [],
      progress: 0,
    };
  },
  created() {
    this.getNetworkAnalysis();
    this.getQueue();
    this.getDataProcessed();
  },
  methods: {
    async getQueue() {
      const response = await this.requestGet({
        url: 'twitter/get-queue',
        name: 'queue twitter',
      });
      this.payload = response[response.length - 1];
    },
    getNetworkAnalysis() {
      this.requestGet({ url: 'twitter/analytic-network/9' }).then(
        (response) => {
          this.nodes = response.nodes;
          this.edges = response.edges;
        },
      );
    },
    getDataProcessed() {
      this.requestGet({ url: 'twitter/get-queue/9/processed' }).then(
        (response) => {
          this.sentimens = response.processed;
          this.progress = response.progress;
        },
      );
    },
  },
};
</script>
<style scoped>
#network div {
  height: 600px;
  background-color: var(--light);
}
.table td {
  padding-top: 0.54rem !important;
  padding-bottom: 0.54rem !important;
  border-bottom: 1px solid var(--secondary);
}
</style>
