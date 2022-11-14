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
            <span :class="`ml-5 badge ${progressClass}`"
              >Progress : {{ progress }} %</span
            >
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
          <doughnut-chart
            :chart-options="doughnutChart.options"
            :chart-data="doughnutChart"
          />
        </div>
      </div>
    </AtomsCardLayout>
    <div class="row">
      <div class="col-md-12">
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
    </div>
    <div class="row mt-5">
      <div class="col-md-12">
        <AtomsCardLayout>
          <h6 for="Tweet">Tweet</h6>
          <hr />
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sentimen</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in tweets" :key="i">
                  <td>{{ item.id }}</td>
                  <td width="15%" class="p-0 pl-2">
                    <b-form inline>
                      <b-badge
                        class="mr-3"
                        pill
                        :variant="variantSentimen(item.mark)"
                      >
                        {{ itemSentimen(item.mark) }}
                      </b-badge>
                      <b-form-select
                        inline
                        @change="(val) => changeSentimen(item, val, i)"
                        :value="item.mark"
                        :options="[
                          { value: 'positif', text: 'Positif' },
                          { value: 'negatif', text: 'Negatif' },
                          { value: 'netral', text: 'Netral' },
                        ]"
                      />
                    </b-form>
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
            <div class="mt-3 d-flex justify-content-end">
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
                first-number
                last-number
              />
            </div>
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
  watch: {
    currentPage(val) {
      this.getDataProcessed(val);
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
              border: 'gray',
              background: 'gray',
              highlight: {
                border: '#34395e',
                background: '#34395e',
              },
            },
            size: 10,
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
                return `${((value / sum) * 100).toFixed(2)} %`;
              },
            },
          },
        },
      },
      tweets: [],
      progress: 0,
      perPage: 10,
      currentPage: 1,
      rows: 0,
    };
  },
  created() {
    this.getNetworkAnalysis();
    this.getQueue();
    this.getDoughnutChart();
    this.getDataProcessed();
  },
  methods: {
    variantSentimen(sentimen) {
      if (sentimen === 'positif') return 'success';
      if (sentimen === 'negatif') return 'danger';
      return 'light';
    },
    itemSentimen(sentimen) {
      if (sentimen === 'positif') return '+';
      if (sentimen === 'negatif') return '-';
      return '#';
    },
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
      this.requestGet({ url: 'twitter/analytic-network/1' }).then(
        (response) => {
          const dataEdges = {};
          response.edges.forEach((item) => {
            if (dataEdges[item.to]) dataEdges[item.to] += 1;
            else dataEdges[item.to] = 1;
          });
          // const sortEdges = Object.entries(dataEdges).sort(([, a], [, b]) => b - a);
          const groups = {};
          const nodes = response.nodes.map((item) => {
            const totalConnection = dataEdges[item.id];
            if (totalConnection && !groups[totalConnection]) {
              groups[totalConnection] = {
                size: 25 + totalConnection,
                color: {
                  background: `#${Math.floor(Math.random() * 16777215).toString(
                    16,
                  )}`,
                },
              };
            }
            return { ...item, group: totalConnection };
          });
          this.network.nodes = nodes;
          this.network.edges = response.edges;
          this.network.options.groups = groups;
        },
      );
    },
    getDataProcessed(page = 1) {
      this.requestGet({
        url: `twitter/get-queue/${this.$route.params.id}/processed`,
        params: { page },
      }).then((response) => {
        this.tweets = response.data;
        this.currentPage = response.current_page;
        this.rows = response.total;
      });
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
    async changeSentimen(item, val, index) {
      const { isConfirmed } = await this.konfirm(
        `Mengubah sentimen ID : ${item.id} menjadi ${val}`,
      ).then();
      if (isConfirmed) {
        const response = await this.requestPut({
          url: `twitter/update-sentimen/${item.id}`,
          data: { mark: val },
        });
        if (response) {
          this.$toast.show(response.message);
          this.tweets[index].mark = val;
          this.getDoughnutChart();
        }
      } else {
        const { mark } = { ...this.tweets[index] };
        this.tweets[index].mark = '';
        setTimeout(() => {
          this.tweets[index].mark = mark;
        }, 10);
      }
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
