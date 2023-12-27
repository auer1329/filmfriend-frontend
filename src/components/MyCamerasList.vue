<template>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div  class="card mb-3">
      <br>
      <h5 class="card-title">Neue Kamera</h5>

      <form>
        <div>
          <br>
          <input type="text" class="form-control" v-model="nameField" placeholder="Kameraname" required>
          <br>
          <input type="text" class="form-control" v-model="brandField" placeholder="Marke" required>
          <br>
          <input type="text" class="form-control" v-model="modelField" placeholder="Modell" required>
          <br>
          <input type="text" class="form-control" v-model="staticImageUrlField" placeholder="Bild">
          <br>
          <select class="form-select" id="formatSelection" required>
            <option value="1" selected disabled>Format auswählen</option>
            <option value="35">35mm</option>
            <option value="120">120mm</option>
          </select>
          <br>
        </div>
      </form>
      <button type="button" class="btn btn-primary" @click="save()">Kamera hinzufügen</button>
      <br>
    </div>

    <div class="col" v-for="camera in cameras" :key="camera.id">
      <div class="card " style="max-width: 540px">
        <img :src=camera.staticImageUrl class="card-image-top rounded-start" :alt="camera.name" >
        <div class="card-body">
          <h5 class="card-title">{{ camera.name }} ({{ camera.id }})</h5>
          <div class="card-text">
            {{ camera.brand }} {{ camera.model }}<br>
            <div v-if="camera.formatThirtyFive">Format: 35mm</div>
            <div v-if="camera.formatOneTwenty">Format: 120mm</div>
          </div>
          <div class="card-text">
            <div v-if="camera.roll != null">
              <br>
              <img :src=camera.roll.stock.staticImageUrl :alt=camera.roll.stock.name width="50" height="50"><br>
              <b>eingelegter Film:</b><br>
              {{ camera.roll.stock.name }} {{ camera.roll.stock.brand }} (ISO: {{ camera.roll.stock.iso }}) <br>
              <button type="button" class="btn btn-primary" @click=removeRoll(camera.id)>Film entfernen</button>
            </div>
            <div v-else>
              <br>
              <b>kein Film eingelegt</b><br>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#stockSelectionModal" @click="prepareInsert(camera.id)">Film einlegen</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- Stock Selection Modal -->
  <div class="modal fade" id="stockSelectionModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Film einlegen</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input placeholder="StockID" v-model="selectedStockId">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" @click="insertRoll()">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from "vue"
import {onMounted, ref} from "vue";
import type {Cameramodel} from "@/types";
import axios, {type AxiosResponse} from "axios";

const nameField = ref('')
const brandField = ref('')
const modelField = ref('')
const staticImageUrlField = ref('')

const selectedCameraId = ref(0)
const selectedStockId = ref(0)

async function save () {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/cameramodel'
  const data: Cameramodel = {
    name: nameField.value,
    brand: brandField.value,
    model: modelField.value,
    staticImageUrl: staticImageUrlField.value,
    formatThirtyFive:  document.getElementById("formatSelection")?.nodeValue === "35",
    formatOneTwenty: document.getElementById("formatSelection")?.nodeValue === "120",
  }
  const response: AxiosResponse = await axios.post(endpoint, data);
  const responseData: Cameramodel = response.data;
  console.log(responseData);
  // now reload the page
  location.reload();
}

function prepareInsert(cameraId: number) {
  selectedCameraId.value = cameraId
}

async function insertRoll() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/roll?cameraId=' + selectedCameraId.value + '&stockId=' + selectedStockId.value
  console.log(endpoint)
  const responseData: Cameramodel = await axios.post(endpoint);
  console.log('Success: ', responseData);
  location.reload();
}

async function removeRoll(cameraId: number) {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/roll/' + cameraId
  console.log(endpoint)
  const responseData: Cameramodel = await axios.delete(endpoint);
  console.log('Success: ', responseData);
  location.reload();
}

type Camera = {
  id: number,
  name: string,
  brand: string,
  model: string,
  staticImageUrl: string,
  formatThirtyFive: boolean,
  formatOneTwenty: boolean
  roll: {
    id: number,
    stock: {
      id: number,
      brand: string,
      name: string,
      iso: number,
      formatThirtyFive: boolean,
      formatOneTwenty: boolean
      color: boolean,
      process: string,
      staticImageUrl: string
      description: string
    },
    expectedPickupDate: string,
    usedIso: number
  }
}

const cameras: Ref<Camera[]> = ref([])

function loadCameras (){
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/cameramodel'
  const requestOptions: RequestInit = {
    method:'GET',
    redirect: 'follow'
  }
  fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(
          result => {
            result.forEach(
                (cameramodel: Camera) => {
                  console.log(cameramodel)
                  cameras.value.push(cameramodel)
                }
            )
          }
      )
      .catch(error => console.log('error', error))
}

onMounted(() => {
  loadCameras()
})

</script>

<style scoped>

</style>


