<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th :style="{ width: '170px' }">
            <div>Sentiment</div>
            <b-form-select
              inline
              v-model="cat"
              :options="[
                { value: '', text: 'All' },
                { value: 'positif', text: 'Positif' },
                { value: 'negatif', text: 'Negatif' },
                { value: 'netral', text: 'Netral' },
              ]"
            />
          </th>
          <th :style="{ width: '170px' }">
            <div>News Portal</div>
            <b-form-select inline v-model="portal" :options="list" />
          </th>
          <th class="specifictd">
            <div>Title</div>
            <b-form-input
              inline
              @change="(val) => (content = val)"
              placeholder="Enter Title"
            >
            </b-form-input>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in listNews" :key="i">
          <td class="p-0 pl-2">
            <form-badge-sentimen
              :item="item"
              :index="i"
              @update="updateDataTweets"
              :type="'news'"
            />
          </td>
          <td>{{ item.portal_account }}</td>
          <td class="specifictd">
            <a
              class="text-decoration-none"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.title }}
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
</template>
<script>
import requestVue from '~/mixins/request.vue';
import FormBadgeSentimen from '~/components/molecules/FormBadgeSentimen.vue';

export default {
  components: { FormBadgeSentimen },
  mixins: [requestVue],
  props: {
    userId: String,
    hideUsername: Boolean,
  },
  computed: {
    checkeds() {
      return this.$store.state.NewsPortal.checkeds;
    },
    list() {
      const list = this.$store.state.NewsPortal.list.map((item) => ({
        text: item,
        value: item,
      }));
      return [...list, { text: 'All', value: '' }];
    },
  },
  watch: {
    currentPage(val) {
      this.getDataProcessed(val);
    },
    cat() {
      this.getDataProcessed();
    },
    portal() {
      this.getDataProcessed();
    },
    content() {
      this.getDataProcessed();
    },
  },
  data() {
    return {
      listNews: [],
      perPage: 10,
      currentPage: 1,
      rows: 0,
      cat: '',
      content: '',
      portal: '',
    };
  },
  created() {
    this.getDataProcessed();
  },
  methods: {
    getDataProcessed(page = 1) {
      const { cat, content, portal } = this;
      const params = { page };
      if (cat) params.cat = cat;
      if (content) params.content = content;
      if (portal) params.portal = portal;

      this.requestGet({
        url: 'berita/get-detail-berita/19',
        params,
      }).then((response) => {
        this.listNews = response.data;
        this.currentPage = response.current_page;
        this.rows = response.total;
      });
    },
    updateDataTweets(item) {
      const listNews = [...this.listNews];
      listNews[item.index] = item;
      this.listNews = listNews;
    },
  },
};
</script>

<style scoped>
.table td {
  padding-top: 0.54rem !important;
  padding-bottom: 0.54rem !important;
  border-bottom: 1px solid var(--secondary);
}
.specifictd {
  min-width: 70%; /* adjust to desired wrapping */
  white-space: normal; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>
