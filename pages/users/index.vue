<template>
  <AtomsCardLayout>
    <atoms-card>
      <template v-slot:header>
        <h4>List of User</h4>
        <div class="card-header-action">
          <atoms-button to="/users/add">
            Add <i class="fas fa-plus"></i>
          </atoms-button>
        </div>
      </template>
      <div class="table-responsive">
        <table class="table table-striped">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
            <tr v-for="(item, i) in users" :key="i">
              <td class="text-capitalize">{{ item.name }}</td>
              <td>{{ item.email }}</td>
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
      users: [],
    };
  },
  async created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.users = await this.requestGet({
        url: 'users/user-list',
        name: 'List of User',
      });
    },
  },
};
</script>
