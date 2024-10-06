<template>
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li :class="['nav-item', isActiveRoute('/') ? 'active' : '']">
            <a class="nav-link" href="/">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Pengujian
        </div>

        <!-- Nav Item - Charts -->
        <li :class="['nav-item', isActiveRoute('/data-train') ? 'active' : '']">
            <a class="nav-link" href="/data-train">
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Data Latih</span>
            </a>
        </li>
        <li :class="['nav-item', isActiveRoute('/data-test') ? 'active' : '']">
            <a class="nav-link" href="/data-test">
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Data Uji</span>
            </a>
        </li>
        <li :class="['nav-item', isActiveRoute('/data-result') ? 'active' : '']">
            <a class="nav-link" href="/data-result">
                <i class="fas fa-fw fa-chart-area"></i>
                <span>Hasil</span>
            </a>
        </li>
        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

    </ul>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// Function to check if the current route matches the specified path
const isActiveRoute = (path) => {
  return route.path === path
}
</script>