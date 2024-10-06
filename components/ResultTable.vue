<template>
  <div class="table-responsive">
    <table class="table text-center table-bordered" id="dataTable" width="100%" cellspacing="0">
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
          <td>{{ dt[0] }}</td>
          <td>{{ getData(0, dt[1]) }}</td>
          <td>{{ getData(1, dt[2]) }}</td>
          <td>{{ getData(2, dt[3]) }}</td>
          <td>{{ getData(3, dt[4]) }}</td>
          <td>{{ getData(4, dt[5]) }}</td>
          <td>{{ getData(5, dt[6]) }}</td>
          <td>{{ getData(6, dt[7]) }}</td>
          <td>{{ getData(7, dt[8]) }}</td>
          <td>{{ getData(8, dt[9]) }}</td>
          <td>{{ getData(9, dt[10]) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Attributes from '~/libs/Attributes';

export default {
  props: {
    type:  Number as PropType<number>,
    data: [String, Number, Object] as PropType<any>,
  },
  data() {
    return {
      // types: ['origin', 'bobot', 'normalisasi']
    }
  },
  methods: {
    convToBobot(col:any, val:any) {
      const r:any = Attributes[col]
      return r[val.toLowerCase()]
    },
    getData(col:any, dt:any) {
      let maxD = [6, 2, 11, 6, 2, 10, 5, 6, 8, 1]
      switch (this.type) {
        case 1:
          return dt
        case 2:
          return this.convToBobot(col, dt)
        case 3:
          let x = this.convToBobot(col, dt)
          return ((x == 1 || x == 0) ? x : (x - 1) / (maxD[col] - 1)).toFixed(2)
        default:
          return ""
      }
    }
  },
}

</script>
