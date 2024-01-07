<template>
  <div v-if="isLoading">
    <LoadingScreen/>
  </div>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="roll in rolls" :key="roll.id">

      <div class="card mb-3" style="max-width: 540px">
        <button type="button" class="btn-close overlap-close" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" @click="selectedRollId = roll.id" aria-label="Close"></button>
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
  <!-- confirm delete modal -->
  <div class="modal fade" id="confirmDeleteModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Rolle löschen bestätigen</h5>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-danger" @click="deleteRoll(selectedRollId)">Entfernen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Ref} from "vue";
import type {Cameramodel} from "@/types";
import axios, {type AxiosResponse} from "axios";
import LoadingScreen from "@/components/LoadingScreen.vue";

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
const isLoading = ref(false)
const selectedRollId = ref(0)

async function loadRollsInDevelopment () {
  isLoading.value = true
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/roll/in-development'
  try {
    const response = await axios.get(endpoint)
    rolls.value = response.data
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

function countToPickup(roll: Roll) {
  const today = new Date()
  const pickupDate = new Date(roll.expectedPickupDate)
  const diff = pickupDate.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 3600 * 24))
}

async function deleteRoll(rollId: number) {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/roll?rollId=' + rollId
  console.log(endpoint)
  const responseData: Cameramodel = await axios.delete(endpoint);
  console.log('Success: ', responseData);
  location.reload();
}

onMounted(() => {
  loadRollsInDevelopment()
})

</script>

<style scoped>


</style>