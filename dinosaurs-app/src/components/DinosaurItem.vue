<script setup lang="ts">
import { defineProps } from 'vue';
import type { Dinosaur } from '@/models/dinosaur.model';

interface Props {
    dinosaur: Dinosaur;
}

defineProps<Props>()
</script>

<template>
    <div class="h-60 sm:h-50 ">
        <img class="h-60 sm:h-50 w-full rounded-t-xl" :src="dinosaur.image" :alt="dinosaur.name">
    </div>
    <h4 class="text-xl font-bold text-emerald-700">{{ dinosaur.name }}</h4>
    <div class="text-emerald-700">
        <p>{{ dinosaur.description }}</p>

        <div class="mt-5 p-1 bg-green-200 rounded-xl">

            <ul v-if="dinosaur.quickFacts.length > 0">
                <li v-for="fact in dinosaur.quickFacts" :key="fact">
                    {{ fact }}
                </li>
            </ul>

            <p v-else> No information</p>
        </div>
    </div>
</template>
<style lang="css" scoped>
li {
    display: list-item;
}

ul {
    list-style-type: disc;
    padding-left: 20px;
}
</style>
