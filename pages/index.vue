<script setup lang="ts">
import fetchAPI from '~/libs/API';

definePageMeta({
    layout: false,
})
</script>

<template>
    <NuxtLayout name="admin">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>
        <div class="row">

            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Total Data Latih</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ total_data_latih }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-warning shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    Total Data Uji</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ total_data_uji }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Layak Dapat Biasiswa</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ layak }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-danger shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                    Tidak Layak Dapat Biasiswa</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ tidak_layak }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 mb-4">
                <ChartConf />
            </div>

            <!-- Content Column -->
            <div class="col-lg-6 mb-4">

                <!-- Project Card Example -->
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Confussion Matrix #2</h6>
                    </div>
                    <div class="card-body">
                        <h4 class="small font-weight-bold">Accuracy <span class="float-right">{{ accuracy.toFixed(0)
                                }}%</span></h4>
                        <div class="progress mb-4">
                            <div class="progress-bar" role="progressbar" :style="`width: ${accuracy}%`"
                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <h4 class="small font-weight-bold">Recall <span class="float-right">{{ recall.toFixed(0)
                                }}%</span></h4>
                        <div class="progress mb-4">
                            <div class="progress-bar" role="progressbar" :style="`width: ${recall}%`" aria-valuenow="60"
                                aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <h4 class="small font-weight-bold">Precission <span class="float-right">{{ precission.toFixed(0)
                                }}%</span></h4>
                        <div class="progress mb-4">
                            <div class="progress-bar" role="progressbar" :style="`width: ${precission}%`"
                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <h4 class="small font-weight-bold">F1Score <span class="float-right">{{ F1Score.toFixed(0)
                                }}%</span></h4>
                        <div class="progress mb-4">
                            <div class="progress-bar" role="progressbar" :style="`width: ${F1Score}%`"
                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
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
            loading: false,
            accuracy: 0,
            total_data_uji: 0,
            total_data_latih: 0,
            layak: 0,
            tidak_layak: 0,
            recall: 0,
            precission: 0,
            F1Score: 0
        }
    },
    methods: {
        async getData() {
            this.loading = true
            try {
                const res: any = await fetchAPI('/data/result/details');
                const data = res.data
                this.total_data_latih = data['total_data_latih']
                this.total_data_uji = data['total_data_uji']
                this.layak = data['layak']
                this.tidak_layak = data['tidak_layak']
                this.accuracy = data['accuracy'] * 100
                this.recall = data['recall'] * 100
                this.precission = data['precission'] * 100
                this.F1Score = data['F1Score'] * 100

            } catch (error) {
                console.dir(error);
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
