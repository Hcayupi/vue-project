<script setup lang="ts">
import axiosClient from '@/utils/axios';
import { onMounted, ref, watch } from 'vue';
import type { Country } from "@/models/country.model";
import CountryList from '@/components/CountryList.vue';
import PageHeader from '@/components/PageHeader.vue';

const countries = ref<Country[]>([])
const search = ref("")
const filteredCountries = ref<Country[]>([])
const page = ref(1)
const itemsPerPage = ref(12)
const paginatedCountries = ref<Country[]>([])
const totalItems = ref(0)


const fetchCountries = async () => {
  try {
    const { data } = await axiosClient.get("/all");
    countries.value = data
    totalItems.value = countries.value.length
  } catch (error) {
    console.error("Error al obtener los paises:", error)
  }
}

const filterCountries = async () => {
  filteredCountries.value = countries.value.filter((country) =>
    country.name.common.toLowerCase().includes(search.value.toLowerCase()))
}

const sliceCountries = (currentCountries: Country[])=>{
  const start = (page.value-1) * itemsPerPage.value
  const end = page.value * itemsPerPage.value
  paginatedCountries.value = currentCountries.slice(start, end)
}

const changePage = (newPage:number)=>{
  page.value= newPage
}


onMounted(() => {
  fetchCountries();
})

watch([countries, page, filteredCountries], ()=>{
  sliceCountries(
    filteredCountries.value.length<=0 && search.value === ""
    ? countries.value:filteredCountries.value
)
})

const selectedSize = ref('M');
</script>

<template>
  <main>
  <!--<div id="talla">
    <br />
    <h2>Seleccione la talla: {{ selectedSize }}</h2>
    <br/>
    <SizeSelector v-model:selectedSize="selectedSize" />
  </div>
 -->
  <PageHeader />

  <div class="mt-4 container max-w-screen-lg mx-auto px-6">

    <div class="mb-8">
      <input type="text" class="border border-gray-300 rounded w-full p-1 px-4" placeholder="Search by country name"
        v-model="search" @input="filterCountries" />
    </div>
    <div class="mb-8 flex justify-center space-x-6">
        <button 
        :disabled="page<=1" 
        :class="{'opacity-50':page<=1
        }"
        @click="$event =>changePage(page-1)" 
        class="border border-gray-
        00 rounded px-2 py-0.5 hover:bg-gray-200">Previous</button>
        <button  
        :disabled="page>=totalItems/itemsPerPage" 
        :class="{'opacity-50':page>=totalItems/itemsPerPage}"
        @click="$event =>changePage(page+1)" 
        class="border border-gray-
        00 rounded px-2 py-0.5 hover:bg-gray-200">Next</button>
    </div>
    <!--<CountryList :countries="filteredCountries.length > 0 ? filteredCountries : countries" />-->
    <CountryList :countries=" paginatedCountries"/>
  </div>
</main>
</template>

<style scoped>
#talla {
  text-align: center;
}
</style>