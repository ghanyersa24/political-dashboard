<template>
  <section class="section">
    <div class="container mt-5">
      <div class="row">
        <div
          class="
            col-12 col-sm-8
            offset-sm-2
            col-md-6
            offset-md-3
            col-lg-6
            offset-lg-3
            col-xl-4
            offset-xl-4
          "
        >
          <div class="login-brand">
            <!-- <img src="/comikamedia.png" alt="logo" class="rounded" /> -->
          </div>

          <div class="card card-primary">
            <div class="card-header">
              <h4>Login Admin</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="userLogin">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    id="email"
                    v-model="login.email"
                    type="email"
                    class="form-control"
                    name="email"
                    tabindex="1"
                    required
                    autofocus
                  />
                </div>

                <div class="form-group">
                  <div class="d-block">
                    <label for="password" class="control-label">Password</label>
                  </div>
                  <input
                    id="password"
                    v-model="login.password"
                    type="password"
                    class="form-control"
                    name="password"
                    tabindex="2"
                    required
                  />
                </div>

                <div class="form-group">
                  <button
                    type="submit"
                    :disabled="isLoading"
                    class="btn btn-primary btn-lg btn-block"
                    tabindex="4"
                  >
                    <div
                      v-if="isLoading"
                      class="spinner-border text-light"
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                    <div v-else>Login</div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  layout: 'clean',
  name: 'login-page',
  data() {
    return {
      isLoading: false,
      login: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async userLogin() {
      this.$auth
        .loginWith('local', {
          data: this.login,
        })
        .then(() => {
          this.isLoading = false;
          this.$router.push('/');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.show(err.response.data.message);
        });
    },
  },
};
</script>
