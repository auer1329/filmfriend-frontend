<script setup lang="ts">
import {ref, onMounted} from 'vue'
import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {Cameramodel} from '@/types'
import type {Ref} from 'vue'
import NewCameraForm from "@/components/NewCameraModal.vue";

// Example starter JavaScript for disabling form submissions if there are invalid fields

const { title, modalContent, submitText } = defineProps(["title", "modalContent", "submitText"]);

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
    formatThirtyFive: false,
    formatOneTwenty: false
  }
}


</script>

<template>
  <div class="modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ title }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="needs-validation" novalidate>
            <div>
              <label for="nameField" class="form-label">Kameraname</label>
              <input type="text" class="form-control" v-model="nameField" placeholder="Kameraname" required>
              <div class="invalid-feedback">
                Bitte gib einen Namen für deine Kamera ein.
              </div>
              <br>
              <label for="brandField" class="form-label">Marke</label>
              <input type="text" class="form-control" v-model="brandField" placeholder="Marke" required>
              <div class="invalid-feedback">
                Bitte gib eine Marke für deine Kamera ein.
              </div>
              <br>
              <label for="modelField" class="form-label">Modell</label>
              <input type="text" class="form-control" v-model="modelField" placeholder="Modell" required>
              <div class="invalid-feedback">
                Bitte gib das Kameramodell ein.
              </div>
              <br>
              <label for="staticImageUrlField" class="form-label">Bild</label>
              <input type="text" class="form-control" v-model="staticImageUrlField" placeholder="Bild">
              <br>
              <label for="format" class="form-label">Format</label>
              <select class="form-select" id="formatSelection" required>
                <option selected>Format auswählen</option>
                <option value="1">35mm</option>
                <option value="2">120mm</option>
              </select>
              <div class="invalid-feedback">
                Bitte wähle ein Format aus.
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="save()" >{{ submitText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>