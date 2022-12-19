<template>
  <doughnut-chart :chart-options="options" :chart-data="doughnutChart" />
</template>
<script>
export default {
  props: {
    datasets: {
      type: Array,
      default: () => [0, 0, 0],
    },
  },
  computed: {
    doughnutChart() {
      const data = [0, 0, 0];
      this.datasets.forEach((item) => {
        if (item.mark.toUpperCase() === 'NETRAL') data[0] = item.total;
        if (item.mark.toUpperCase() === 'POSITIF') data[1] = item.total;
        if (item.mark.toUpperCase() === 'NEGATIF') data[2] = item.total;
      });
      return {
        labels: ['NETRAL', 'POSITIF', 'NEGATIF'],
        datasets: [
          {
            data,
            backgroundColor: ['#e3eaef', '#47c363', '#fc544b'],
          },
        ],
      };
    },
  },
  data() {
    return {
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
              if (!value) return '';
              return `${((value / sum) * 100).toFixed(2)} %`;
            },
          },
        },
      },
    };
  },
};
</script>
