<template>
  <AtomsCardLayout>
    <atoms-card>
      <template v-slot:header>
        <h4>Data Request</h4>
        <div class="card-header-action">
          <atoms-button to="/data-request/add">
            Add <i class="fas fa-plus"></i>
          </atoms-button>
        </div>
      </template>
      <div class="table-responsive">
        <table class="table table-striped">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Keyword</th>
              <th>Date Range</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            <tr v-for="(item, i) in queue" :key="i">
              <td class="text-capitalize">
                {{ item.name }}
              </td>
              <td class="font-weight-600">{{ keyword(item.keyword) }}</td>
              <td>{{ dateRange(item.since, item.until) }}</td>
              <td>
                <div :class="`badge ${progressClass(item)} text-capitalize`">
                  {{ item.status === 'done' ? 'Done' : 'In Progress' }}
                </div>
              </td>
              <td>
                <AtomsButton :to="`/data-request/${item.id}`"
                  >Detail</AtomsButton
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </atoms-card>
  </AtomsCardLayout>
</template>
<script>
import requestVue from '~/mixins/request.vue';

export default {
  name: 'home-page',
  mixins: [requestVue],
  data() {
    return {
      queue: [],
    };
  },
  async created() {
    this.getQueue();
  },
  methods: {
    async getQueue() {
      this.queue = await this.requestGet({
        url: 'twitter/get-queue',
        name: 'queue twitter',
      });
    },
    keyword(keywords) {
      return keywords
        .split("'")
        .filter((item) => item && item !== ' ')
        .join(', ');
    },
    dateRange(start, end) {
      return `${this.$moment(start).format('DD MMMM YYYY')} - ${this.$moment(
        end,
      ).format('DD MMMM YYYY')}`;
    },
    progres(item) {
      const val = (item.processed / item.counted_data) * 100;
      return val;
    },
    progressClass(item) {
      const val = item.status === 'done' ? 100 : 80;
      if (val === 100) return 'badge-success';
      if (val > 80) return 'badge-primary';
      if (val > 50) return 'badge-warning';
      return 'badge-danger';
    },
  },
};
</script>
