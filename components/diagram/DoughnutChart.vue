<template>
  <doughnut-chart
    :chart-options="doughnutChart.options"
    :chart-data="doughnutChart"
  />
</template>
<script>
import requestVue from '~/mixins/request.vue';

export default {
  mixins: [requestVue],
  data() {
    return {
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
