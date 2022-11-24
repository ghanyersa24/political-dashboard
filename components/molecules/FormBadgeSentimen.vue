<template>
  <b-form inline>
    <b-badge class="mr-3 text-dark" pill :variant="variantSentimen">
      {{ itemSentimen }}
    </b-badge>
    <b-form-select
      inline
      @change="(val) => changeSentimen(val)"
      :value="item.mark"
      :options="[
        { value: 'positif', text: 'Positif' },
        { value: 'negatif', text: 'Negatif' },
        { value: 'netral', text: 'Netral' },
      ]"
    />
  </b-form>
</template>
<script>
import requestVue from '~/mixins/request.vue';

export default {
  mixins: [requestVue],
  props: {
    item: Object,
    index: Number,
  },
  computed: {
    sentimen() {
      return this.item.mark;
    },
    variantSentimen() {
      if (this.sentimen === 'positif') return 'success';
      if (this.sentimen === 'negatif') return 'danger';
      return 'light';
    },
    itemSentimen() {
      if (this.sentimen === 'positif') return '+';
      if (this.sentimen === 'negatif') return '-';
      return '#';
    },
  },
  methods: {
    async changeSentimen(val) {
      const { item } = this;
      const { isConfirmed } = await this.konfirm(
        `Mengubah sentimen ${item.username} menjadi ${val}`,
      ).then();
      if (isConfirmed) {
        const response = await this.requestPut({
          url: `twitter/update-sentimen/${item.id}`,
          data: { mark: val },
        });
        if (response) {
          this.$toast.show(response.message);
          // this.getDoughnutChart();
          item.mark = val;
        }
      }
      this.$emit('update', { ...item, index: this.index });
    },
  },
};
</script>
