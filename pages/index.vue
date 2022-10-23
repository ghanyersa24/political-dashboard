<template>
  <div>
    <atoms-card>
      <template v-slot:header>
        <h4>Data Request</h4>
        <div class="card-header-action">
          <atoms-button to="/data-request/add">
            Add <i class="fas fa-plus"></i>
          </atoms-button>
          <atoms-button secondary>
            View More <i class="fas fa-chevron-right"></i>
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
              <td><div class="badge badge-warning text-capitalize">{{item.status}}</div></td>
              <td>
                <a href="#" class="btn btn-primary">Detail</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </atoms-card>
  </div>
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
      return keywords.split('|').join(', ');
    },
    dateRange(start, end) {
      return `${this.$moment(start).format('DD MMMM YYYY')} - ${this.$moment(
        end,
      ).format('DD MMMM YYYY')}`;
    },
  },
};
</script>
