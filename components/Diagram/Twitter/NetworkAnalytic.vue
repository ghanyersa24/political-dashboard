<template>
  <div id="network">
    <network
      ref="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
      @click="getDetailTweetsUser"
    >
    </network>
    <b-modal
      v-model="showModal"
      size="lg"
      centered
      scrollable
      hide-footer
      :title="title"
      no-close-on-backdrop
    >
      <tweet-sentiment
        hide-username
        @username="(val) => (username = val)"
        v-if="showModal"
        :user-id="userId"
      />
    </b-modal>
  </div>
</template>
<script>
import { Network } from 'vue-vis-network';
import requestVue from '~/mixins/request.vue';
import TweetSentiment from './TweetSentiment.vue';

export default {
  mixins: [requestVue],
  components: {
    TweetSentiment,
    Network,
  },
  data() {
    return {
      showModal: false,
      userId: null,
      username: null,
      network: {
        nodes: [],
        edges: [],
        options: {
          autoResize: false,
          edges: {
            width: 2,
            color: 'gray',
          },
          nodes: {
            shape: 'dot',
            borderWidth: 0,
            font: { color: 'white' },
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
    };
  },
  computed: {
    title() {
      return `Tweets from ${this.username || 'User'}`;
    },
  },
  created() {
    this.getNetworkAnalysis();
  },
  methods: {
    getNetworkAnalysis() {
      this.requestGet({
        url: `twitter/analytic-network/${this.$route.params.id}`,
      }).then((response) => {
        const dataEdges = {};
        response.edges.forEach((item) => {
          if (dataEdges[item.to]) dataEdges[item.to] += 1;
          else dataEdges[item.to] = 1;
        });
        // const sortEdges = Object.entries(dataEdges).sort(([, a], [, b]) => b - a);
        const groups = {};
        const edges = response.edges.map((item) => {
          // eslint-disable-next-line no-nested-ternary
          const color = item.mark === 'positif'
            ? 'green'
            : item.mark === 'negatif'
              ? 'red'
              : 'gray';
          return { ...item, color };
        });
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
        this.network.edges = edges;
        this.network.options.groups = groups;
      });
    },
    getDetailTweetsUser(properties) {
      const userId = properties.nodes[0];
      if (!userId) return;
      this.userId = userId;
      this.showModal = true;
    },
  },
};
</script>
<style scoped>
#network div {
  height: 600px;
  border-radius: 15px;
}
</style>
