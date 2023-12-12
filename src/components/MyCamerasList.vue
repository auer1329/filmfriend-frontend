<template>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div  class="card mb-3">
      <h5 class="card-title">Neue Kamera</h5>
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Neue Kamera <br>
        hinzufügen
      </button>
      <!-- Modal -->
      <FriendlyModal title="Neue Kamera" :modalContent=NewCameraForm submitText="Kamera hinzufügen" />
    </div>
    <div class="col" v-for="camera in cameras" :key="camera.id">

      <div class="card " style="max-width: 540px">
        <img :src=camera.staticImageUrl class="card-image-top rounded-start" :alt="camera.name" >
          <div class="card-body">
              <h5 class="card-title">{{ camera.name }}</h5>
              <p class="card-text">
                {{ camera.brand }} {{ camera.model }}  <br>
                <div v-if="camera.formatThirtyFive">Format: 35mm</div>
                <div v-if="camera.formatOneTwenty">Format: 120mm</div>
              </p>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from "vue"
import {onMounted, ref} from "vue";
import FriendlyModal from "@/components/FriendlyModal.vue";
import NewCameraForm from "@/components/NewCameraForm.vue";

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

