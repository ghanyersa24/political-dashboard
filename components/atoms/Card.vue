<template>
  <div class="card">
    <div class="card-header">
      <slot name="header" />
    </div>
    <div class="card-body p-0">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'card-atoms',
};
</script>
