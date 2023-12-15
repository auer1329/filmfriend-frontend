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
            <option selected>Format auswählen</option>
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
            <h5 class="card-title">{{ camera.name }}</h5>
            <div class="card-text">
              {{ camera.brand }} {{ camera.model }}  <br>
              <div v-if="camera.formatThirtyFive">Format: 35mm</div>
              <div v-if="camera.formatOneTwenty">Format: 120mm</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from "vue"
import {onMounted, ref} from "vue";
import NewCameraModal from "@/components/NewCameraModal.vue";
import type {Cameramodel} from "@/types";
import axios, {type AxiosResponse} from "axios";

const nameField = ref('')
const brandField = ref('')
const modelField = ref('')
const staticImageUrlField = ref('')

async function save () {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/cameramodel'
  const data: Cameramodel = {
    name: nameField.value,
    brand: brandField.value,
    model: modelField.value,
    staticImageUrl: staticImageUrlField.value,
    formatThirtyFive:  document.getElementById("formatSelection").value === "35",
    formatOneTwenty: document.getElementById("formatSelection").value === "120"
  }
  const response: AxiosResponse = await axios.post(endpoint, data);
  const responseData: Cameramodel = response.data;
  console.log(responseData);
  // now reload the page
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

