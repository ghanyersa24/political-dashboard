<template>
  <div class="row my-3">
    <div class="col-md-3 d-flex align-items-center">
      <label :for="idName" class="text-capitalize h6">{{ name }}</label>
    </div>
    <div class="col-md-9">
      <client-only>
        <vue-tags-input
          :readonly="disabled"
          class="form-control"
          v-model="tag"
          :tags="data"
          :autocomplete-items="filteredItems"
          @tags-changed="(newTags) => (data = newTags)"
        />
      </client-only>
    </div>
  </div>
</template>
<script>
export default {
  name: 'input-text',
  props: {
    name: String,
    noRequired: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Array,
      default: () => [],
    },
    placeholder: String,
  },
  data() {
    return {
      tag: '',
    };
  },
  computed: {
    pholder() {
      if (!this.placeholder) return `Please input ${this.name}`;
      return this.placeholder;
    },
    idName() {
      return this.name.replace(/ /g, '');
    },
    data: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    filteredItems() {
      // eslint-disable-next-line max-len
      return this.list.filter(
        (i) => i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1,
      );
    },
  },
  watch: {
    tag(val) {
      this.$emit('keyword', val);
    },
  },
};
</script>
<style>
.vue-tags-input {
  background-color: unset !important;
  max-width: 100% !important;
}
.ti-input {
  border: none !important;
  margin-top: -8px !important;
  margin-left: -8px !important;
}
.ti-tag {
  padding: 5px 10px !important;
  background-color: var(--primary) !important;
}
.vue-tags-input .ti-item.ti-selected-item {
  background: var(--primary) !important;
}
.ti-new-tag-input.ti-valid {
  background-color: unset;
}
.ti-new-tag-input-wrapper input,.ti-tag-center {
  color: white !important;
  font-size: 14px !important;
  font-weight: bold !important;
}
.ti-autocomplete {
  background-color: black !important;
  color: white !important;
  border: none !important;
}
.ti-item.ti-valid {
  padding: 10px !important;
}
</style>
