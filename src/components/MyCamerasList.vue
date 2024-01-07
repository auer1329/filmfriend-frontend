<template>
  <button type="button" class="btn btn-primary" id="newCameraBttn" data-bs-toggle="modal"
          style="margin-bottom: 0px; float: right"
          data-bs-target="#newCameraModal">Neue Kamera hinzufügen
  </button>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="camera in cameras" :key="camera.id">
      <div class="card ">
        <button type="button" class="btn-close overlap-close" data-bs-toggle="modal"
                data-bs-target="#confirmDeleteModal" @click="selectedCameraId = camera.id"
                aria-label="löschen"></button>
        <img :src=camera.staticImageUrl class="card-image-top rounded-start" :alt="camera.name">
        <div class="card-body">
          <h5 class="card-title">{{ camera.name }}</h5>
          <div class="card-text">
            {{ camera.brand }} {{ camera.model }}<br>
            <div v-if="camera.formatThirtyFive">Format: 35mm</div>
            <div v-if="camera.formatOneTwenty">Format: 120mm</div>
          </div>
          <div v-if="camera.roll != null">
            <h5 style="margin-top: 1em">
              Eingelegter Film
            </h5>
            <div class="row g-0" style="margin-bottom: 1em">
              <div class="col-md-3">
                <img :src=camera.roll.stock.staticImageUrl :alt=camera.roll.stock.name width="80" height="80">
              </div>
              <div class="col">
                {{ camera.roll.stock.brand }} {{ camera.roll.stock.name }}<br>
                ISO {{ camera.roll.stock.iso }}
              </div>
            </div>
            <div class="d-grid ">
              <div class="btn-group gap-1" role="group" aria-label="process film">
                <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                        data-bs-target="#developModal" @click="selectedCameraId = camera.id">Film entwickeln
                </button>
                <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                        data-bs-target="#confirmRemoveModal" @click="selectedCameraId = camera.id">Film entfernen
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="d-grid" style="margin-top: 1em">
              <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                      data-bs-target="#stockSelectionModal"
                      @click="selectedCameraId = camera.id">Film einlegen
              </button>
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
            <input class="form-control mr-sm-2" style="margin-bottom: 20px" type="search" v-model="searchField"
                   placeholder="Search" aria-label="Search">
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
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                              @click="selectedStockId = stock.id; insertRoll()">Diesen Film einlegen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
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
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="developRoll()">Save changes
          </button>
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
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-primary" @click="save()">Kamera hinzufügen</button>
        </div>
      </div>
    </div>
  </div>
  <!--confirm delete modal-->
  <div class="modal fade" id="confirmDeleteModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Löschen bestätigen</h5>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-danger" @click="deleteCamera(selectedCameraId)">Löschen bestätigen
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- confirm remove modal -->
  <div class="modal fade" id="confirmRemoveModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Film entfernen bestätigen</h5>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-danger" @click="removeRoll(selectedCameraId)">Entfernen</button>
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


async function save() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/cameramodel'
  const data: Cameramodel = {
    name: nameField.value,
    brand: brandField.value,
    model: modelField.value,
    staticImageUrl: staticImageUrlField.value,
    formatThirtyFive: document.getElementById("formatSelection")?.nodeValue === "35",
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
  removeRoll(cameraId)
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

async function loadCameras() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/cameramodel'
  const response: AxiosResponse = await axios.get(endpoint);
  const responseData: Camera[] = response.data;
  responseData.forEach(
      (cameramodel: Camera) => {
        cameras.value.push(cameramodel)
      }
  )
}

async function loadStocks() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/stocks'
  const response: AxiosResponse = await axios.get(endpoint);
  const responseData: Stock[] = response.data;
  responseData.forEach(
      (stock: Stock) => {
        stocks.value.push(stock)
      }
  )
}

onMounted(() => {
  loadCameras()
  loadStocks()
})

</script>

<style scoped>

</style>


