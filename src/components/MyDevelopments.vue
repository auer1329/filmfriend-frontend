<template>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="roll in rolls" :key="roll.id">

      <div class="card mb-3" style="max-width: 540px">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src=roll.stock.staticImageUrl class="img-fluid rounded-start" :alt="roll.stock.name">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ roll.stock.brand }} {{ roll.stock.name }}</h5>
              <table class="table card-text">
                <tbody>
                  <tr>
                    <td>Countdown</td>
                    <td>{{ countToPickup(roll) }}</td>
                  </tr>
                  <tr>
                    <td>Verwendete ISO</td>
                    <td>{{ roll.stock.iso }}</td>
                  </tr>
                  <tr>
                    <td>Labor</td>
                    <td>{{ roll.labName }}</td>
                  </tr>
                  <tr>
                    <td>Notizen</td>
                    <td>{{ roll.notes }}</td>
                  </tr>
                </tbody>
              </table>
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

type Roll = {
  id: number,
  stock: Stock,
  expectedPickupDate: string,
  usedIso: number,
  labName: string,
  notes: String
}

type Stock = {
  id: number,
  name: string,
  brand: string,
  description: string,
  staticImageUrl: string,
  iso: number,
  formatThirtyFive: boolean,
  formatOneTwenty: boolean,
  color: boolean,
  process: string
}

const rolls: Ref<Roll[]> = ref([])

function loadRollsInDevelopment () {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/roll/in-development'
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }
  fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => { result.forEach((roll: Roll) => {
        rolls.value.push(roll)
      })
      })
      .catch(error => console.log('error', error))
}

function countToPickup(roll: Roll) {
  const today = new Date()
  const pickupDate = new Date(roll.expectedPickupDate)
  const diff = pickupDate.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 3600 * 24))
}

onMounted(() => {
  loadRollsInDevelopment()
})

</script>

<style scoped>
</style>