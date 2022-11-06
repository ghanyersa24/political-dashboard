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
        <span :class="`ml-5 badge ${progressClass}`">Progress : {{ progress }} %</span>
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
              :nodes="network.nodes"
              :edges="network.edges"
              :options="network.options"
            >
            </network>
          </div>
        </AtomsCardLayout>
      </div>
      <div class="col-md-4">
        <AtomsCardLayout class="h-100">
          <doughnut-chart
            :chart-options="doughnutChart.options"
            :chart-data="doughnutChart"
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
      return this.payload.keyword
        .split('"')
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
      defaultWords: [],
      network: {
        nodes: [],
        edges: [],
        options: {
          autoResize: false,
          edges: {
            width: 2,
            color: 'lightgray',
          },
          nodes: {
            shape: 'dot',
            borderWidth: 0,
            font: { color: '#34395e' },
            color: {
              border: '#6777ef',
              background: '#6777ef',
              highlight: {
                border: '#34395e',
                background: '#34395e',
              },
            },
            shapeProperties: {
              useBorderWithImage: true,
            },
          },
          groups: {},
        },
      },
      doughnutChart: {
        labels: ['Netral', 'Positif', 'Negatif'],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ['#e3eaef', '#47c363', '#fc544b'],
          },
        ],
        options: {
          responsive: true,
          plugins: {
            datalabels: {
              display: true,
              align: 'bottom',
              backgroundColor: '#fff',
              borderRadius: 3,
              font: {
                size: 16,
              },
              formatter(value, context) {
                const { data } = context.chart.data.datasets[0];
                const sum = data.reduce((total, num) => total + num, 0);
                return `${(value / sum) * 100} %`;
              },
            },
          },
        },
      },
      sentimens: [],
      progress: 0,
    };
  },
  created() {
    this.getNetworkAnalysis();
    this.getQueue();
    this.getDoughnutChart();
    // this.getDataProcessed();
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
    getNetworkAnalysis() {
      this.requestGet({ url: 'twitter/analytic-network/9' }).then(
        (response) => {
          this.network.nodes = response.nodes;
          this.network.edges = response.edges;
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
    getDoughnutChart() {
      this.requestGet({
        url: `twitter/bar-chart/${this.$route.params.id}`,
      }).then((response) => {
        const labels = [];
        const data = [];
        response.forEach((item) => {
          labels.push(item.mark.toUpperCase());
          data.push(item.total);
        });
        this.doughnutChart.labels = labels;
        this.doughnutChart.datasets[0].data = data;
      });
    },
  },
};
</script>
<style scoped>
#network div {
  height: 600px;
  border-radius: 15px;
}
.table td {
  padding-top: 0.54rem !important;
  padding-bottom: 0.54rem !important;
  border-bottom: 1px solid var(--secondary);
}
</style>
