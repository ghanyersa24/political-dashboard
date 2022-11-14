<template>
  <div class="container-scroller">
    <partials-navbar />
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <nuxt />
        </div>
        <partials-footer />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'default-layout',
};
</script>
