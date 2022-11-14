<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <div
      class="
        sidebar-brand-wrapper
        d-none d-lg-flex
        align-items-center
        justify-content-center
        fixed-top
      "
    >
      <nuxt-link to="/" class="text-white">Data Analytics</nuxt-link>
      <nuxt-link to="/" class="sidebar-brand brand-logo-mini" href="index.html">
        DA
      </nuxt-link>
    </div>
    <ul class="nav">
      <li class="nav-item menu-items">
        <nuxt-link to="/" class="nav-link">
          <span class="menu-icon">
            <i class="mdi mdi-speedometer"></i>
          </span>
          <span class="menu-title">Dashboard</span>
        </nuxt-link>
      </li>
      <li class="nav-item menu-items">
        <nuxt-link
          to="/users"
          class="nav-link"
          data-toggle="collapse"
          aria-expanded="false"
          aria-controls="auth"
        >
          <span class="menu-icon">
            <i class="mdi mdi-security"></i>
          </span>
          <span class="menu-title">User Pages</span>
          <i class="menu-arrow"></i>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'sidebar-component',
  data() {
    return {
      menus: [
        { icon: 'fab fa-dashcube', name: 'Dashboard', link: '/' },
        { icon: 'fab fa-dashcube', name: 'Dashboard', link: '/' },
      ],
    };
  },
};
</script>
