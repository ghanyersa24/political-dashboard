<template>
  <AtomsCardLayout>
    <h5>
      <i class="fas fa-arrow-left mr-3 pointer" @click="$router.push('/')"></i>
      Request Data Sentiment
    </h5>
    <hr />
    <div class="container">
      <form @submit.prevent="submit">
        <input-text
          v-model="payload.name"
          name="Name Request"
          placeholder="Presiden RI #1"
        />
        <input-date-range name="Date Range" v-model="dateRange" />
        <input-tags
          name="Keyword"
          :list="keywords"
          v-model="payload.keyword"
          @keyword="(val) => (this.keyword = val)"
        />
        <div class="text-right mt-5">
          <atoms-button secondary class="mr-3" to="/"> Cancel </atoms-button>
          <atoms-button class="primary" type="submit">Save</atoms-button>
        </div>
      </form>
    </div>
  </AtomsCardLayout>
</template>
<script>
import requestVue from '~/mixins/request.vue';

export default {
  name: 'add-data-request-page',
  mixins: [requestVue],
  data() {
    return {
      keyword: '',
      timeout: null,
      payload: {
        name: '',
        since: new Date(),
        until: new Date(),
        keyword: [],
      },
      keywords: [],
      myColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
    };
  },
  computed: {
    dateRange: {
      get() {
        return {
          startDate: this.payload.since,
          endDate: this.payload.until,
        };
      },
      set(val) {
        this.payload.since = val.startDate;
        this.payload.until = val.endDate;
      },
    },
  },
  watch: {
    keyword() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.getKeyword();
      }, 500);
    },
  },
  methods: {
    async submit() {
      try {
        const keyword = this.payload.keyword
          .map((item) => `'${item.text}'`)
          .join(' ');
        const since = this.$moment(this.payload.since);
        const until = this.$moment(this.payload.until);
        const { success, data } = await this.requestPost({
          url: 'crawl/parents',
          data: {
            name: this.payload.name,
            since: since.format('Y-MM-DD'),
            until: until.format('Y-MM-DD'),
            keyword,
          },
        });
        if (success) {
          const parentId = data.id;
          const runDate = since;
          const limit = until.add(1, 'days');
          while (runDate.diff(limit) < 0) {
            this.requestPost({
              url: 'crawl/childs',
              data: {
                parent_id: parentId,
                since: runDate.format('Y-MM-DD'),
                until: runDate.add(1, 'days').format('Y-MM-DD'),
              },
            });
          }
          this.$toast.show('Your request has been received');
          this.$router.go(-1);
        }
      } catch (error) {
        this.$toast.show(error.response.data.message);
      }
    },
    async getKeyword() {
      const response = await this.requestPost({
        url: 'twitter/get-keyword',
        data: {
          keyword: this.keyword,
        },
      });
      this.keywords = response.data.map((item) => ({ text: item.keyword }));
    },
    wordClickHandler(name, value, vm) {
      // eslint-disable-next-line no-console
      console.log('wordClickHandler', name, value, vm);
    },
  },
};
</script>
