<template>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="stock in stocks" :key="stock.id">

      <div class="card mb-3" style="max-width: 540px">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src=stock.staticImageUrl class="img-fluid rounded-start" :alt="stock.name">
          </div>
          <div class="col-md-8">
            <div class="card-body">

              <h5 class="card-title">{{ stock.brand }} {{ stock.name }}</h5>
              <p class="card-text">{{ stock.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Ref} from "vue";

type Stock = {
  id: number,
  name: string,
  brand: string,
  description: string,
  staticImageUrl: string
}

 const stocks: Ref<Stock[]> = ref([])

 function loadStocks () {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
      const endpoint = baseUrl + '/stocks'
      const requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(result => { result.forEach((stock: Stock) => {
                  stocks.value.push(stock)
                })
          })
          .catch(error => console.log('error', error))
    }

  onMounted(() => {
    loadStocks()
  })

</script>

<style scoped>
</style>