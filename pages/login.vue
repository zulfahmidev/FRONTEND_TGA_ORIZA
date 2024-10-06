<script setup lang="ts">
import fetchAPI from '~/libs/API';

definePageMeta({
  layout: false,
})
</script>

<template>
    <NuxtLayout name="auth">
        <div class="col-xl-6 col-lg-6 col-md-9">
    
            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    <!-- Nested Row within Card Body -->
                    <div class="p-5">
                        <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        
                        <div class="alert alert-danger" v-if="errorMessage != ''">{{ errorMessage }}</div>
    
                        <div class="form-group">
                            <input type="text" class="form-control form-control-user"
                                id="exampleInputUsername" aria-describedby="usernameHelp"
                                placeholder="Enter Username..." v-model="payloads.username">
                            <div class="text-danger small" v-if="errors.username">{{ errors.username }}</div>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control form-control-user"
                                id="exampleInputPassword" placeholder="Password" v-model="payloads.password">
                                <div class="text-danger small" v-if="errors.password">{{ errors.password }}</div>
                        </div>
                        <hr>
                        <button class="btn btn-primary btn-user btn-block" @click="login">
                            {{ loadingLogin ? 'Loading...' : 'Login' }}
                        </button>
                    </div>
                </div>
            </div>
    
        </div>
    </NuxtLayout>
</template>

<script lang="ts">
export default {
    data() {
        return {
            payloads: {
                username: '',
                password: '',
            },
            errorMessage: '',
            errors: {
                username: '',
                password: '',
            },
            loadingLogin: false
        }
    },
    methods: {
        async login() {
            this.loadingLogin = true
            try {
                const res:any = await fetchAPI('/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(this.payloads)
                })
                localStorage.setItem("AUTH_TOKEN", res.data.token)
                this.$router.replace('/')
            } catch (error: any) {
                const res = error.response._data
                this.errorMessage = res.message
                if (error.statusCode == 400) {
                    this.errors = res.errors
                }
            } finally {
                this.loadingLogin = false
            }
        }
    },
}
</script>