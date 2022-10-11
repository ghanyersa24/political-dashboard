<template>
  <div class="row my-3">
    <div class="col-md-3 d-flex align-items-center">
      <label :for="idName" class="text-capitalize h6">{{ name }}</label>
    </div>
    <div class="col-md-9">
      <date-range-picker
        ref="picker"
        v-model="data"
        class="w-100"
        :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm:ss' }"
        :auto-apply="true"
        :show-dropdowns="true"
      >
        <template v-slot:input="picker">
          {{ $moment(picker.startDate).format('DD/MM/YYYY') }} -
          {{ $moment(picker.endDate).format('DD/MM/YYYY') }}
        </template>
      </date-range-picker>
    </div>
  </div>
</template>
<script>
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
  name: 'input-date-range',
  components: { DateRangePicker },
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
      type: Object,
      default: () => ({
        startDate: null,
        endDate: null,
      }),
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
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
  },
};
</script>
