<template>
  <div v-if="isLoading">
    <LoadingScreen/>
  </div>
  <div v-else>
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
          <img v-if="camera.staticImageUrl" :src=camera.staticImageUrl class="card-image-top rounded-start" :alt="camera.name">
          <img v-else
               src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNjIwMDMsMCwwLDEuNjA4MzYsLTM4OC4yODUsLTI3NS4yOTEpIj4KICAgICAgICA8cGF0aCBkPSJNMjc4LjczNSw0MTQuMTExTDI3OC43MzUsMzM2LjMzNUMyNzguNzM1LDMxMy4yNDggMjk3LjU5MiwyOTQuNTA0IDMyMC44MTgsMjk0LjUwNEwzMzYuMTI4LDI5NC41MDRDMzM5LjcwNiwyOTIuMjUyIDM0MC4zODgsMjg0Ljg1NyAzNDAuMzg1LDI3Ni4yNDRDMzQwLjM4NSwyNjcuNzM3IDM0Ny4zMzMsMjYwLjgzIDM1NS44OTIsMjYwLjgzTDM3OS4zNTUsMjYwLjgzQzM4Ny45MTQsMjYwLjgzIDM5NC44NjIsMjY3LjczNyAzOTQuODYyLDI3Ni4yNDRDMzk0Ljk0MywyODMuNzUxIDM5NC40NTMsMjkyLjAyNCAzOTguMjc3LDI5NC41MDRMNDcwLjE1NywyOTQuNTA0QzQ4MS44NzMsMjgwLjQ1MSA0OTEuNzYzLDI2NS4xMzYgNDk3LjUxOCwyNDcuNjRDNTA0LjExMiwyMzguNjc4IDUwOC43ODgsMjM2LjE1MyA1MTEuOTQsMjM3LjQzOEw2MDkuNDM1LDIzNy40MzhDNjE1LjIzOSwyMzcuNDM4IDYyNy44MDYsMjQzLjQzOCA2MjcuODA2LDI0OS4yMDhDNjM2LjY0NywyNjUuNzE5IDY0NC42NjcsMjgyLjgyMiA2NTQuODU0LDI5NC41MDRMODAzLjAzLDI5NC41MDRDODI2LjI1NywyOTQuNTA0IDg0NS4xMTQsMzEzLjI0OCA4NDUuMTE0LDMzNi4zMzVMODQ1LjExNCw0MTQuMTExTDcwMC45NTgsNDE0LjExMUM2ODkuNzM1LDM0OC4xNDEgNjMxLjkyMSwyOTcuODMxIDU2Mi4zNzksMjk3LjgzMUM0OTIuODM3LDI5Ny44MzEgNDM1LjAyMywzNDguMTQxIDQyMy44LDQxNC4xMTFMMjc4LjczNSw0MTQuMTExWk04NDUuMTE0LDQzMy41ODNMODQ1LjExNCw1MzguNjUyQzg0NS4xMTQsNTYxLjczOSA4MjYuMjU3LDU4MC40ODMgODAzLjAzLDU4MC40ODNMMzIwLjgxOCw1ODAuNDgzQzI5Ny41OTIsNTgwLjQ4MyAyNzguNzM1LDU2MS43MzkgMjc4LjczNSw1MzguNjUyTDI3OC43MzUsNDMzLjU4M0w0MjEuODg1LDQzMy41ODNDNDIxLjg0OCw0MzQuODk2IDQyMS44MjksNDM2LjIxMyA0MjEuODI5LDQzNy41MzVDNDIxLjgyOSw1MTQuNjM5IDQ4NC44MDgsNTc3LjIzOCA1NjIuMzc5LDU3Ny4yMzhDNjM5Ljk1LDU3Ny4yMzggNzAyLjkyOSw1MTQuNjM5IDcwMi45MjksNDM3LjUzNUM3MDIuOTI5LDQzNi4yMTMgNzAyLjkxLDQzNC44OTYgNzAyLjg3Myw0MzMuNTgzTDg0NS4xMTQsNDMzLjU4M1pNMzkzLjA1NywzMzguNTgzTDMzOC40MzQsMzM4LjU4M0wzMzguNDM0LDM1OC4wNTRMMzkzLjA1NywzNTguMDU0TDM5My4wNTcsMzM4LjU4M1pNNTY0LjIyNyw1NTMuMzY0TDU0Ny4zMSw1MTMuMDQyTDYyMi45MjEsNDg2Ljc0Mkw2MzguOTE3LDUyNC44NjlDNjE4Ljg2Nyw1NDIuMjQ3IDU5Mi43ODcsNTUyLjkyMiA1NjQuMjI3LDU1My4zNjRaTTU1My44MDYsMzIyTDU3NC43MjMsMzcxLjg1N0w0OTkuMTEyLDM5OC4xNThMNDgwLjg5NywzNTQuNzRDNTAwLjAwNSwzMzYuMTU4IDUyNS41MTEsMzI0LjA0OSA1NTMuODA2LDMyMlpNNjUzLjY5MSw1MDkuNDkzTDU3NS4xOTIsMzIyLjM4NEM2MjUuNjUxLDMyNy44NzkgNjY2LjQ2NiwzNjUuNDQ2IDY3Ni41MzYsNDE0LjExMUM2NzcuODQ0LDQyMC40MyA2NzguNjMzLDQyNi45MzYgNjc4Ljg1OCw0MzMuNTgzQzY3OC45MDIsNDM0Ljg5NSA2NzguOTI0LDQzNi4yMTIgNjc4LjkyNCw0MzcuNTM1QzY3OC45MjQsNDY0LjcxNiA2NjkuNDg2LDQ4OS43MjQgNjUzLjY5MSw1MDkuNDkzWk00NjYuNjc4LDM3MS40MzlMNTQyLjI4Nyw1NTEuNjZDNDg3LjUyNCw1NDIuMTg1IDQ0NS44MzQsNDk0LjY2MSA0NDUuODM0LDQzNy41MzVDNDQ1LjgzNCw0MzYuMjEyIDQ0NS44NTYsNDM0Ljg5NSA0NDUuOSw0MzMuNTgzQzQ0Ni4xMjUsNDI2LjkzNiA0NDYuOTE0LDQyMC40MyA0NDguMjIyLDQxNC4xMTFDNDUxLjQ0OCwzOTguNTE4IDQ1Ny44MzIsMzg0LjA2MyA0NjYuNjc4LDM3MS40MzlaTTUwNi42NjUsNDE2LjE2TDU4Mi4yNzYsMzg5Ljg2TDYxNS4zNjgsNDY4LjczOUw1MzkuNzU3LDQ5NS4wNEw1MDYuNjY1LDQxNi4xNloiLz4KICAgIDwvZz4KPC9zdmc+Cg=="
               class="card-image-top rounded-start" :alt="camera.name">
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
        <form id="developForm" @submit.prevent="developRoll">
          <div class="modal-body">
            <input placeholder="Lab Name" v-model="labNameField" required> <br>
            <input placeholder="Used ISO" v-model="usedIsoField" type="number" required><br>
            <input type="date" placeholder="Expected Pickup Date" v-model="expectedPickupDateField" required><br>
            <input placeholder="Notes" v-model="notesField" required>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
        </form>
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
        <form id="newCameraForm" @submit.prevent="save">
          <div class="modal-body">
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
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
            <button type="submit" class="btn btn-primary">Kamera hinzufügen</button>
          </div>
        </form>

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
import LoadingScreen from "@/components/LoadingScreen.vue";

const isLoading = ref(false)

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
  isLoading.value = true
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/cameramodel'
  try {
    const response = await axios.get(endpoint)
    cameras.value = response.data
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
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


