<template>
  <div class="bg-white">
    <div class="d-flex justify-content-center vh-100" v-if="loading">
      <div class="d-flex align-items-center">
        <div class="sk-grid">
          <div class="sk-grid-cube bg-primary"></div>
          <div class="sk-grid-cube bg-primary"></div>
          <div class="sk-grid-cube bg-primary"></div>
          <div class="sk-grid-cube bg-primary"></div>
          <div class="sk-grid-cube bg-primary"></div>
          <div class="sk-grid-cube bg-primary"></div>
          <div class="sk-grid-cube bg-primary"></div>
          <div class="sk-grid-cube bg-primary"></div>
          <div class="sk-grid-cube bg-primary"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading-component',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      setTimeout(() => {
        this.loading = false;
      }, 700);
    },
  },
};
</script>
