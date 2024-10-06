<script setup lang="ts">
import fetchAPI from '~/libs/API';

definePageMeta({
  layout: false,
})
</script>

<template>
    <NuxtLayout name="admin">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="d-sm-flex align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Halaman Data Hasil</h6>
                    <a href="http://localhost:5000/api/data/result/export" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-file-export fa-sm text-white-50"></i> Export Excel</a>
                </div>
            </div>
            <div class="card-body">
                <div v-if="!loading">
                    <h6 class="m-0 font-weight-bold text-dark mb-2">Variabel Setelah Dilatih:</h6>
                    <div class="table-responsive">
                        <table class="table table-bordered text-center" width="100%" cellspacing="0">
                            <thead class="bg-primary text-white">
                                <tr>
                                    <th>W1</th>
                                    <th>W2</th>
                                    <th>W3</th>
                                    <th>W4</th>
                                    <th>W5</th>
                                    <th>W6</th>
                                    <th>W7</th>
                                    <th>W8</th>
                                    <th>W9</th>
                                    <th>Bias</th>
                                    <th>Eta</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ data['variables']['w1'] }}</td>
                                    <td>{{ data['variables']['w2'] }}</td>
                                    <td>{{ data['variables']['w3'] }}</td>
                                    <td>{{ data['variables']['w4'] }}</td>
                                    <td>{{ data['variables']['w5'] }}</td>
                                    <td>{{ data['variables']['w6'] }}</td>
                                    <td>{{ data['variables']['w7'] }}</td>
                                    <td>{{ data['variables']['w8'] }}</td>
                                    <td>{{ data['variables']['w9'] }}</td>
                                    <td>{{ data['variables']['bias'] }}</td>
                                    <td>{{ data['variables']['eta'] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <h6 class="m-0 font-weight-bold text-dark mb-2 mt-3">Confussion Matrix:</h6>
                    <div class="d-flex align-items-center justify-content-between" style="gap: 0.5rem;">
                        <div class="alert w-100 text-center p-2 alert-primary">
                            <b>TP</b><hr class="my-1"><div>{{ data['confussion_matrix']['TP'] }}</div>
                        </div>
                        <div class="alert w-100 text-center p-2 alert-primary">
                            <b>TN</b><hr class="my-1"><div>{{ data['confussion_matrix']['TN'] }}</div>
                        </div>
                        <div class="alert w-100 text-center p-2 alert-primary">
                            <b>FP</b><hr class="my-1"><div>{{ data['confussion_matrix']['FP'] }}</div>
                        </div>
                        <div class="alert w-100 text-center p-2 alert-primary">
                            <b>FN</b><hr class="my-1"><div>{{ data['confussion_matrix']['FN'] }}</div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between" style="gap: 0.5rem;">
                        <div class="alert w-100 text-center p-2 alert-primary">
                            <b>Accuracy</b><hr class="my-1"><div>{{ data['confussion_matrix']['accuracy'] }}</div>
                        </div>
                        <div class="alert w-100 text-center p-2 alert-primary">
                            <b>Recall</b><hr class="my-1"><div>{{ data['confussion_matrix']['recall'] }}</div>
                        </div>
                        <div class="alert w-100 text-center p-2 alert-primary">
                            <b>Precission</b><hr class="my-1"><div>{{ data['confussion_matrix']['precission'] }}</div>
                        </div>
                        <div class="alert w-100 text-center p-2 alert-primary">
                            <b>F1Score</b><hr class="my-1"><div>{{ data['confussion_matrix']['F1Score'] }}</div>
                        </div>
                    </div>
    
                    <h6 class="m-0 font-weight-bold text-dark mb-2 mt-3">Data Hasil Pengujian:</h6>
                    <div class="d-flex mb-3" style="gap: 0.5rem">
                        <button 
                            :class="`btn ${displayType == 1 ? 'btn-primary' : 'btn-outline-primary'}`" 
                            @click="displayType = 1">Origin</button>
                        <button 
                            :class="`btn ${displayType == 2 ? 'btn-primary' : 'btn-outline-primary'}`" 
                            @click="displayType = 2">Bobot</button>
                        <button 
                            :class="`btn ${displayType == 3 ? 'btn-primary' : 'btn-outline-primary'}`" 
                            @click="displayType = 3">Normalisasi</button>
                    </div>
                    <client-only>
                        <ResultTable :type="displayType" :data="data['result']" />
                    </client-only>
                </div>
                <div v-else class="text-center">Loading...</div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts">
export default {
    data() {
        return {
            displayType: 1,
            data: {
                variables: {
                    bias: 0, error: 0, eta: 0, output: 0, w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0
                },
                confussion_matrix: {
                    TP: 0, TN: 0, FP: 0, FN: 0, accuracy: 0, recall: 0, precission: 0, F1Score: 0,
                },
                result: []
            },
            loading: false
        }
    },
    methods: {
        async getData() {
            this.loading = true
            try {
                const res: any = await fetchAPI('/data/result');
                this.data = res.data;

                useHead({
                    script: [
                        { src: '/js/demo/datatables-demo.js' },
                    ],
                });
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.getData()
    },
}
</script>