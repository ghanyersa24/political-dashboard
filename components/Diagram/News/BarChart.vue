<template>
  <bar-chart :chart-options="options" :chart-data="doughnutChart" />
</template>
<script>
/* eslint-disable */
import requestVue from '~/mixins/request.vue';

export default {
  mixins: [requestVue],
  props: {
    newsPortal: {
      type: String,
      default: null,
    },
  },
  computed: {
    checkeds() {
      return this.$store.state.NewsPortal.checkeds;
    },
    barchart() {
      return this.$store.state.NewsPortal.barchart;
    },
    datasets() {
      const data = [
        { mark: 'positif', total: 0 },
        { mark: 'negatif', total: 0 },
        { mark: 'netral', total: 0 },
      ];
      if (this.newsPortal) {
        const dataPerPortal = this.allData[this.newsPortal];
        dataPerPortal.forEach((item) => {
          if (item.mark === 'positif') data[0].total += item.total;
          if (item.mark === 'negatif') data[1].total += item.total;
          if (item.mark === 'netral') data[2].total += item.total;
        });
      } else
        for (const key in this.allData) {
          if (this.checkeds.includes(key))
            if (Object.hasOwnProperty.call(this.allData, key)) {
              const dataPerPortal = this.allData[key];
              dataPerPortal.forEach((item) => {
                if (item.mark === 'positif') data[0].total += item.total;
                if (item.mark === 'negatif') data[1].total += item.total;
                if (item.mark === 'netral') data[2].total += item.total;
              });
            }
        }
      return data;
    },
  },
  data() {
    return {
      allData: {},
    };
  },
  created() {
    this.getDoughnutChart();
  },
  methods: {
    getDoughnutChart() {
      this.requestGet({
        url: 'berita/bar-chart/19',
      }).then((response) => {
        this.allData = response;
        this.$store;
      });
    },
  },
};
</script>
