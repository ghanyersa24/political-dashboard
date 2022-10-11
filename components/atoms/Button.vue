<template>
  <component v-bind:is="component" :class="className" v-bind="attributes">
    <slot />
  </component>
</template>
<script>
export default {
  name: 'atoms-button',
  props: {
    to: {
      type: String,
      default: '#',
    },
    type: {
      type: String,
      default: 'button',
    },
    openTabs: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    className() {
      const btn = 'btn btn';
      if (this.primary) return `${btn}-primary`;
      if (this.secondary) return `${btn}-secondary`;
      if (this.danger) return `${btn}-danger`;
      return `${btn}-primary`;
    },
    attributes() {
      let attr = {};
      if (this.openTabs) {
        attr = {
          href: this.to,
          target: '_blank',
        };
      }
      if (this.to !== '#') {
        attr = {
          to: this.to,
        };
      }
      attr.type = this.type || 'button';
      return attr;
    },
    component() {
      if (this.openTabs) return 'a';
      if (this.to === '#') return 'button';
      return 'nuxt-link';
    },
  },
};
</script>
