<template>
  <atoms-doughnut-chart :datasets="datasets" />
</template>
<script>
import AtomsDoughnutChart from '~/components/atoms/AtomsDoughnutChart.vue';
import requestVue from '~/mixins/request.vue';

export default {
  mixins: [requestVue],
  components: { AtomsDoughnutChart },
  data() {
    return {
      datasets: [],
    };
  },
  created() {
    this.getDoughnutChart();
  },
  methods: {
    getDoughnutChart() {
      this.requestGet({
        url: `twitter/bar-chart/${this.$route.params.id}`,
      }).then((response) => {
        this.datasets = response;
      });
    },
  },
};
</script>
