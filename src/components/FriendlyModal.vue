<script setup lang="ts">
  import NewCameraForm from "@/components/NewCameraForm.vue";
  const { title, modalContent, submitText } = defineProps(["title", "modalContent", "submitText"]);
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
          <!--{{ modalContent }}-->
          <NewCameraForm />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-primary">{{ submitText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>