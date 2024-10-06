<template>
    <NuxtLayout name="admin">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="d-sm-flex align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Halaman Data Latih</h6>
                    <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"  data-toggle="modal" data-target="#trainImportModal"><i class="fas fa-file-import fa-sm text-white-50"></i> Import Excel</a>
                </div>
            </div>
            <div class="card-body">
                <client-only>
                    <TrainTable />
                </client-only>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>