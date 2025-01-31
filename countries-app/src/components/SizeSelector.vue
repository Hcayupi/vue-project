
<script lang="ts">const possibleSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];</script> 

<script lang="ts" setup>

import type { PropType} from 'vue';

// Props
const props = defineProps({
  selectedSize: {
    type: String as PropType<typeof possibleSizes[number]>,
    required: true,
    validator: (value: string) => possibleSizes.includes(value),
  },
});
// Emitir eventos
const emit = defineEmits(['update:selectedSize']);
</script>

<template>
  <button
    v-for="size in possibleSizes"
    :key="size"
    :class="{'active': props.selectedSize === size}"
    @click="emit('update:selectedSize', size)"
  >
    {{ size }}
  </button>
</template>

<style scoped>
button { 
  padding: 5px;
  margin-right: 5px;
  color: #201d1d;
  background-color: #dbdbdb;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 75px;
  cursor: pointer;
}

button.active {
  background-color: black;
  color: white;
  transition: background-color 0.5s ease, color 0.5s ease;
}
</style>