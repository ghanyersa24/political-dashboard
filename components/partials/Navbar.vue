<template>
  <div>
    <div class="navbar-bg"></div>
    <nav class="navbar navbar-expand-lg main-navbar">
      <div class="w-100 d-flex justify-content-between">
        <a href="#" data-toggle="sidebar" class="nav-link nav-link-lg">
          <!-- <i class="fas fa-bars"></i> -->
          <h4 class="d-inline ml-4">Data Analytic Apps</h4>
        </a>
        <ul v-if="false" class="navbar-nav">
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="`/${$route.params.classId}/kelas`"
              >Kelas</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="`/${$route.params.classId}/jadwal`"
              >Jadwal</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              :to="`/${$route.params.classId}/anggota`"
              >Anggota</nuxt-link
            >
          </li>
        </ul>
        <ul class="navbar-nav navbar-right">
          <li class="dropdown">
            <a
              href="#"
              data-toggle="dropdown"
              class="nav-link dropdown-toggle nav-link-lg nav-link-user"
            >
              <div class="d-sm-none d-lg-inline-block text-capitalize">
                Hi, {{ $auth.user.name }}
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <div class="dropdown-title">Menu user</div>
              <!-- <nuxt-link to="/" class="dropdown-item has-icon">
                <i class="far fa-user"></i> Profile
              </nuxt-link> -->
              <nuxt-link to="/" class="dropdown-item has-icon">
                <i class="fas fa-home"></i> Home
              </nuxt-link>
              <nuxt-link to="/users" class="dropdown-item has-icon">
                <i class="fas fa-users"></i> Users
              </nuxt-link>
              <div class="dropdown-divider"></div>
              <a
                href="#"
                @click="logout"
                class="dropdown-item has-icon text-danger"
              >
                <i class="fas fa-sign-out-alt"></i> Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
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
