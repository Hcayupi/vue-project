<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PageHeader from './components/PageHeader.vue';
import axiosClient from "./utils/axios";
import DinosaurList from './components/DinosaurList.vue';
import type { Dinosaur } from './models/dinosaur.model';
import dinosaursData from "@/assets/dinosaurs.json";

const dinosaurs = ref<Dinosaur[]>([]);
const search = ref("");
const filterDinosaurs = ref<Dinosaur[]>([]);

/*const fetchDinosaurs = async () =>{
  try{
  const {data} = await axiosClient.get("/dinosaurs")
  dinosaurs.value=data
  }catch(error){
      console.log(error)
  }
}*/

const fetchDinosaurs = async () => {
  try {
    dinosaurs.value = dinosaursData;
  } catch (error) {
    console.log(error);
  }
}

const filterDinosaur = () => {
  filterDinosaurs.value = dinosaurs.value.filter((dinosaur) =>
    dinosaur.name.toLowerCase().includes(search.value.toLowerCase()));
}

onMounted(() => {
  fetchDinosaurs()
})

</script>


<template>
  <PageHeader />


  <div class=" container max-w-screen-lg mx-auto px-6">
    <div class="mb-3">
      <input type="text" class="border border-gray-300 rounded-xl w-full p-2"
        placeholder="Search of dinosaur" v-model="search" @input="filterDinosaur" />
    </div>
    <DinosaurList :dinosaurs="filterDinosaurs.length > 0 ? filterDinosaurs : dinosaurs" />
  </div>
</template>

