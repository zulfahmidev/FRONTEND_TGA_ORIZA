<!-- app.vue -->
<template>
  <NuxtPage />
</template>

<script setup>
// Import the useHead composable to define meta info
useHead({
  title: 'SB Admin 2 - Dashboard',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: '' },
    { name: 'author', content: '' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i' },
    { rel: 'stylesheet', href: '/vendor/fontawesome-free/css/all.min.css' },
    { rel: 'stylesheet', href: '/vendor/datatables/dataTables.bootstrap4.min.css' },
    { rel: 'stylesheet', href: '/css/sb-admin-2.min.css' }
  ],
  script: [
    { src: '/vendor/jquery/jquery.min.js', body: true },
    { src: '/vendor/bootstrap/js/bootstrap.bundle.min.js', body: true },
    { src: '/vendor/jquery-easing/jquery.easing.min.js', body: true },
    { src: '/js/sb-admin-2.min.js', body: true },
    { src: '/vendor/chart.js/Chart.min.js', body: false },
    { src: '/vendor/datatables/jquery.dataTables.min.js', body: true },
    { src: '/vendor/datatables/dataTables.bootstrap4.min.js', body: true }
  ]
})
</script>