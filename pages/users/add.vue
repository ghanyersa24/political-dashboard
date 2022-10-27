<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <AtomsCardLayout>
    <h5>
      <i class="fas fa-arrow-left mr-3 pointer" @click="$router.go(-1)"></i>
      Form Users
    </h5>
    <hr />
    <div class="container">
      <form @submit.prevent="submit">
        <input-text v-model="payload.name" name="fullname" placeholder="" />
        <input-text
          v-model="payload.email"
          name="email"
          type="email"
          placeholder=""
        />
        <div class="text-right mt-5">
          <atoms-button secondary class="mr-3" to="/users">
            Cancel
          </atoms-button>
          <atoms-button class="primary" type="submit">Save</atoms-button>
        </div>
      </form>
    </div>
  </AtomsCardLayout>
</template>
<script>
import requestVue from '~/mixins/request.vue';

export default {
  name: 'add-users-page',
  mixins: [requestVue],
  data() {
    return {
      payload: { name: '', emaasil: '' },
    };
  },
  methods: {
    submit() {
      this.requestPost({ url: '/register', data: this.payload })
        .then((response) => {
          this.$toast.show(response.message);
          this.$router.go(-1);
        })
        .catch((err) => {
          this.$toast.show(err.response.data.message);
        });
    },
  },
};
</script>
