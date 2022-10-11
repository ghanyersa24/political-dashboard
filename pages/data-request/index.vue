<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div>
    <h5>
      <i class="fas fa-arrow-left mr-3 pointer" @click="$router.push('/')"></i>
      Request Data Sentiment
    </h5>
    <hr />
    <div class="container">
      <form @submit.prevent="submit">
        <input-text
          v-model="payload.title"
          name="Name Request"
          placeholder="Presiden RI #1"
        />
        <input-date-range name="Date Range" v-model="dateRange" />
        <div class="text-right mt-5">
          <atoms-button secondary class="mr-3" to="/"> Cancel </atoms-button>
          <atoms-button class="primary" type="submit">Save</atoms-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'add-data-request-page',
  data() {
    return {
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
      },
      payload: { title: '', start: '', end: '' },
    };
  },
  methods: {
    submit() {
      // alert(JSON.stringify(this.payload));
    },
  },
};
</script>
