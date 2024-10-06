<template>
    <div class="bg-gradient-primary" style="height: 100vh;">
        <div class="container">
            <div class="row justify-content-center">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    mounted() {
        const token = localStorage.getItem('AUTH_TOKEN')
        if (token) {
            this.$router.replace('/')
        }
    }
}
</script>