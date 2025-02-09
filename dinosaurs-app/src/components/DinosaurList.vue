<script setup lang="ts">
import type { Dinosaur } from '@/models/dinosaur.model';
import { defineProps } from 'vue';
import DinosaurItem from './DinosaurItem.vue';

interface Props{
    dinosaurs:Dinosaur[]
}

defineProps<Props>()

</script>

<template>
    <div class="rounded-xl bg-emerald-200 grid grid-cols-1 sm:grid-cols-2 md:grid.cols-3 gap3">
        <div v-for="dinosaur in dinosaurs" class="bg-emerald-300 m-2 border border-gray-300 rounded-xl p-3">
                <DinosaurItem :dinosaur="dinosaur"/>
        </div>
    </div>
</template>