<template>
  <nav class="navbar p-0 fixed-top d-flex flex-row">
    <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
      <ul class="navbar-nav w-100 ml-3">
        <li class="nav-item w-100">
          <h2>Sentiment Dashboard</h2>
        </li>
      </ul>
      <ul class="navbar-nav navbar-nav-right">
        <li class="nav-item dropdown">
          <a
            class="nav-link"
            id="profileDropdown"
            href="#"
            data-toggle="dropdown"
          >
            <div class="navbar-profile">
              <p class="mb-0 d-none d-sm-block navbar-profile-name">
                {{ $auth.user.name }}
              </p>
              <i class="mdi mdi-menu-down d-none d-sm-block"></i>
            </div>
          </a>
          <div
            class="
              dropdown-menu dropdown-menu-right
              navbar-dropdown
              preview-list
            "
            aria-labelledby="profileDropdown"
          >
            <div class="dropdown-divider"></div>
            <nuxt-link to="/" class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <div class="preview-icon bg-dark rounded-circle">
                  <i class="mdi mdi-settings text-success"></i>
                </div>
              </div>
              <div class="preview-item-content">
                <p class="preview-subject mb-1">Home</p>
              </div>
            </nuxt-link>
            <div class="dropdown-divider"></div>
            <nuxt-link to="/users" class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <div class="preview-icon bg-dark rounded-circle">
                  <i class="mdi mdi-settings text-success"></i>
                </div>
              </div>
              <div class="preview-item-content">
                <p class="preview-subject mb-1">Users</p>
              </div>
            </nuxt-link>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item preview-item" @click="logout">
              <div class="preview-thumbnail">
                <div class="preview-icon bg-dark rounded-circle">
                  <i class="mdi mdi-logout text-danger"></i>
                </div>
              </div>
              <div class="preview-item-content">
                <p class="preview-subject mb-1">Log out</p>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <p class="p-3 mb-0 text-center">Advanced settings</p>
          </div>
        </li>
      </ul>
      <button
        class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
        type="button"
        data-toggle="offcanvas"
      >
        <span class="mdi mdi-format-line-spacing"></span>
      </button>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'navbar-component',
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push('/login');
    },
  },
};
</script>
