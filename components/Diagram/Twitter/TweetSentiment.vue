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
          <th v-if="!hideUsername">
            <div>Username</div>
            <b-form-input
              inline
              @change="setUsername"
              placeholder="Enter Username"
            >
            </b-form-input>
          </th>
          <th class="specifictd">
            <div>Content</div>
            <b-form-input
              inline
              @change="setContent"
              placeholder="Enter Content"
            >
            </b-form-input>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in tweets" :key="i">
          <td class="p-0 pl-2">
            <form-badge-sentimen
              :item="item"
              :index="i"
              @update="updateDataTweets"
            />
          </td>
          <td v-if="!hideUsername">{{ item.username }}</td>
          <td class="specifictd">
            <a
              class="text-decoration-none"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.content }}
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
  watch: {
    currentPage(val) {
      this.getDataProcessed(val);
    },
    cat() {
      this.getDataProcessed();
    },
    username() {
      this.getDataProcessed();
    },
    content() {
      this.getDataProcessed();
    },
  },
  data() {
    return {
      tweets: [],
      perPage: 10,
      currentPage: 1,
      rows: 0,
      cat: '',
      content: '',
      username: '',
    };
  },
  created() {
    this.getDataProcessed();
  },
  methods: {
    getDataProcessed(page = 1) {
      const {
        cat, content, username, userId,
      } = this;
      const params = { page };
      if (cat) params.cat = cat;
      if (content) params.content = content;
      if (username) params.username = username;
      if (userId) params.user_id = userId;
      this.requestGet({
        url: `twitter/get-queue/${this.$route.params.id}/processed`,
        params,
      }).then((response) => {
        this.tweets = response.data;
        this.currentPage = response.current_page;
        this.rows = response.total;
        this.$emit('username', response.data?.[0]?.username);
      });
    },
    updateDataTweets(item) {
      const tweets = [...this.tweets];
      tweets[item.index] = item;
      this.tweets = tweets;

      // this.tweets = [];
      // setTimeout(() => {
      //   this.tweets = tweets;
      // }, 1);
    },
    setUsername(val) {
      this.username = val;
    },
    setContent(val) {
      this.content = val;
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
