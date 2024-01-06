<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newCameraModal">Neue Kamera hinzufügen</button>
  <div class="row row-cols-1 row-cols-md-3 g-4">

    <div class="col" v-for="camera in cameras" :key="camera.id">
      <div class="card ">
        <button type="button" class="btn-close overlap-close" @click="deleteCamera(camera.id)" aria-label="Close"></button>
        <img :src=camera.staticImageUrl class="card-image-top rounded-start" :alt="camera.name" >
        <div class="card-body">
          <h5 class="card-title">{{ camera.name }}</h5>
          <div class="card-text">
            {{ camera.brand }} {{ camera.model }}<br>
            <div v-if="camera.formatThirtyFive">Format: 35mm</div>
            <div v-if="camera.formatOneTwenty">Format: 120mm</div>
          </div>
          <div>

          </div>
          <div class="card-text">
            <div v-if="camera.roll != null">
              <br>
              <img :src=camera.roll.stock.staticImageUrl :alt=camera.roll.stock.name width="50" height="50"><br>
              <b>eingelegter Film:</b><br>
              {{ camera.roll.stock.name }} {{ camera.roll.stock.brand }} (ISO: {{ camera.roll.stock.iso }}) <br>
              <button type="button" class="btn btn-primary" style="margin:5px" data-bs-toggle="modal" data-bs-target="#developModal" @click="selectedCameraId = camera.id">Film entwickeln</button>
              <button type="button" class="btn btn-primary" @click=removeRoll(camera.id)>Film entfernen</button>
            </div>
            <div v-else>
              <br>
              <b>kein Film eingelegt</b><br>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#stockSelectionModal" @click="selectedCameraId = camera.id; loadStocks()">Film einlegen</button>
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
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" style="margin-bottom: 20px" type="search" v-model="searchField" placeholder="Search" aria-label="Search">
          </form>
          <div class="row row-cols-1 g-4">
            <div class="col" v-for="stock in filterStocks()" :key="stock.id">
              <div class="card mb-3" style="max-width: 540px">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img :src=stock.staticImageUrl class="img-fluid rounded-start" :alt="stock.name">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{{ stock.brand }} {{ stock.name }}</h5>
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="selectedStockId = stock.id; insertRoll()">Diesen Film einlegen</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
<!-- Develop Modal -->
  <div class="modal fade" id="developModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Film entwickeln</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input placeholder="Lab Name" v-model="labNameField"> <br>
          <input placeholder="Used ISO" v-model="usedIsoField"><br>
          <input type="date" placeholder="Expected Pickup Date" v-model="expectedPickupDateField"><br>
          <input placeholder="Notes" v-model="notesField">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" @click="developRoll()">Save changes</button>
        </div>
      </div>
    </div>
  </div>
<!-- New Camera Modal -->
  <div class="modal fade" id="newCameraModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Neue Kamera hinzufügen</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
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
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="save()">Kamera hinzufügen</button>
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

const labNameField = ref('')
const usedIsoField = ref(undefined)
const expectedPickupDateField = ref('')
const notesField = ref('')


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

async function insertRoll() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/roll?cameraId=' + selectedCameraId.value + '&stockId=' + selectedStockId.value
  console.log(endpoint)
  const responseData: Cameramodel = await axios.post(endpoint);
  console.log('Success: ', responseData);
  location.reload();
}

async function deleteCamera(cameraId: number) {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/cameramodel/' + cameraId
  console.log(endpoint)
  const responseData: Cameramodel = await axios.delete(endpoint);
  console.log('Success: ', responseData);
  location.reload();
}

async function removeRoll(cameraId: number) {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/roll?cameraId=' + cameraId
  console.log(endpoint)
  const responseData: Cameramodel = await axios.delete(endpoint);
  console.log('Success: ', responseData);
  location.reload();
}

async function developRoll() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/roll?cameraId=' + selectedCameraId.value
      + '&stockId=' + selectedStockId.value
      + '&labName=' + labNameField.value
      + '&usedIso=' + usedIsoField.value
      + '&expectedPickupDate=' + expectedPickupDateField.value
      + '&notes=' + notesField.value
  console.log(endpoint)
  const responseData: Cameramodel = await axios.put(endpoint);
  console.log('Success: ', responseData);
  location.reload();
}

function filterStocks() {
  const searchTerm = searchField.value.toLowerCase()
  if (searchTerm === '') {
    return stocks.value
  }
  const filteredStocks: Stock[] = []
  stocks.value.forEach((stock: Stock) => {
    if (stock.name.toLowerCase().includes(searchTerm) || stock.brand.toLowerCase().includes(searchTerm) || stock.description.toLowerCase().includes(searchTerm)) {
      filteredStocks.push(stock)
    }
  })
  return filteredStocks
}

type Camera = {
  id: number,
  name: string,
  brand: string,
  model: string,
  staticImageUrl: string,
  formatThirtyFive: boolean,
  formatOneTwenty: boolean
  roll: Roll
}

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



const cameras: Ref<Camera[]> = ref([])
const stocks: Ref<Stock[]> = ref([])
const searchField: Ref<string> = ref('')

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
  loadCameras()
})

</script>

<style scoped>

</style>


