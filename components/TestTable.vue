<template>
    <div class="d-flex mb-3" style="gap: 0.5rem">
        <button 
            :class="`btn ${type == 1 ? 'btn-primary' : 'btn-outline-primary'}`" 
            @click="type = 1">Origin</button>
        <button 
            :class="`btn ${type == 2 ? 'btn-primary' : 'btn-outline-primary'}`" 
            @click="type = 2">Bobot</button>
        <button 
            :class="`btn ${type == 3 ? 'btn-primary' : 'btn-outline-primary'}`" 
            @click="type = 3">Normalisasi</button>
    </div>
    <div class="table-responsive" v-if="!loading">
        <table class="table table-bordered text-center" id="dataTable" width="100%" cellspacing="0">
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Alat Transportasi</th>
                    <th>Status Ayah</th>
                    <th>Pekerjaan Ayah</th>
                    <th>Penghasilan Ayah</th>
                    <th>Status Ibu</th>
                    <th>Pekerjaan Ibu</th>
                    <th>Penghasilan Ibu</th>
                    <th>Jarak Rumah</th>
                    <th>Jumlah Tanggungan</th>
                    <th>Class</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dt, index) in data" :key="index">
                    <td>{{ dt['nama'] }}</td>
                    <td>{{ convData(0, dt['transportasi']) }}</td>
                    <td>{{ convData(1, dt['status_ayah']) }}</td>
                    <td>{{ convData(2, dt['pekerjaan_ayah']) }}</td>
                    <td>{{ convData(3, dt['penghasilan_ayah']) }}</td>
                    <td>{{ convData(4, dt['status_ibu']) }}</td>
                    <td>{{ convData(5, dt['pekerjaan_ibu']) }}</td>
                    <td>{{ convData(6, dt['penghasilan_ibu']) }}</td>
                    <td>{{ convData(7, dt['jarak_rumah']) }}</td>
                    <td>{{ convData(8, dt['jumlah_tanggungan']) }}</td>
                    <td>{{ convData(9, dt['kelas']) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else class="text-center">Loading...</div>
    <client-only>
        <TestImportModal @imported="onImported" />
    </client-only>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import fetchAPI from '../libs/API';
import Attributes from '~/libs/Attributes';

const props = defineProps<{ type: number, data: any}>();
const types = ['origin', 'bobot', 'normalisasi'];
const data = ref([])
const loading = ref(true)
const type:any = ref(1)

const onImported = () => {
    window.location.reload()
}

const getData = async () => {
  try {
    const res:any = await fetchAPI('/data/test')
    data.value = res.data;
    
    useHead({
      script: [
        { src: '/js/demo/datatables-demo.js'},
      ],
    })
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

const convToBobot = (col:any, val:any) => {
  const r:any = Attributes[col]
  return r[val.toLowerCase()]
}
const convData = (col:any, dt:any) => {
  let maxD = [6, 2, 11, 6, 2, 10, 5, 6, 8, 1]
  switch (type._value) {
    case 1:
      return dt
    case 2:
      return convToBobot(col, dt)
    case 3:
      let x = convToBobot(col, dt)
      return ((x == 1 || x == 0) ? x : (x - 1) / (maxD[col] - 1)).toFixed(2)
    default:
      return ""
  }
}

onMounted(() => {
  getData()
})
</script>
