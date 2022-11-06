<template>
  <div id="app">
    <div class="main-wrapper">
      <partials-navbar />
      <partials-sidebar />
      <!-- Main Content -->
      <div class="main-content">
        <section class="section">
          <div class="section-header">
            <h1>:: Political Dashboard ::</h1>
          </div>
          <div class="section-body">
            <nuxt />
          </div>
        </section>
      </div>
      <partials-footer />
    </div>
  </div>
</template>
<script>
export default {
  name: 'default-layout',
};
</script>
