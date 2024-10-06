<template>
    <div class="modal fade" id="testImportModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Import Data Uji</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>Unduh format excel untuk import <a href="/template.xlsx">disini</a>. Gunakan input file berikut untuk mengunggah file serta centang pada "kosongkan data" bila anda ingin menimpa dengan data yang baru.</div>

                    <div class="input-group my-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                        </div>
                        <div class="custom-file">
                            <input type="file" ref="file" class="custom-file-input" accept=".xlsx" @change="$refs['import_label'].innerHTML = $refs['file'].files[0].name" >
                            <label class="custom-file-label" ref="import_label" for="inputGroupFile01">Choose file</label>
                        </div>
                    </div>
                    
                    <div class="px-3 d-flex" style="gap: 0.5rem;align-items: center;">
                        <input type="checkbox" id="empty" v-model="empty"> <label for="empty" class="m-0">Kosongkan data.</label>
                    </div>

                    <hr>
                    
                    <div class="" style="height: 200px;overflow: auto;">
                        <div>Pastikan data excel setiap bidangnya di isi sesuai dengan data sebagai berikut:</div>
    
                        <div class="font-weight-bold">Tranportasi:</div>
                        <ul>
                            <li>Sepeda Motor</li>
                            <li>Lainnya</li>
                            <li>Mobil/bus antar jemput</li>
                            <li>Andong/bendi/sado/dokar/delman/becak</li>
                            <li>Sepeda </li>
                            <li>Jalan kaki</li>
                        </ul>
                        
                        <div class="font-weight-bold">Status Ayah:</div>
                        <ul>
                            <li>Hidup</li>
                            <li>Mati</li>
                        </ul>
                        
                        <div class="font-weight-bold">Pekerjaan Ayah:</div>
                        <ul>
                            <li>PNS/TNI/Polri</li>
                            <li>wiraswasta</li>
                            <li>Karyawan Swasta</li>
                            <li>Pedagang Besar</li>
                            <li>Pedagang Kecil</li>
                            <li>Nelayan</li>
                            <li>Buruh</li>
                            <li>Petani</li>
                            <li>Lainnya</li>
                            <li>Tidak Bekerja</li>
                            <li>Sudah Meninggal</li>
                        </ul>
                        
                        <div class="font-weight-bold">Penghasilan Ayah:</div>
                        <ul>
                            <li>5.000.000 - 20.000.000</li>
                            <li>2.000.000 - 4.999.999</li>
                            <li>1.000.000 - 1.999.999</li>
                            <li>500.000 - 999.999</li>
                            <li>Kurang dari 500.000</li>
                            <li>Tidak Bekerja</li>
                        </ul>
                        
                        <div class="font-weight-bold">Status Ibu:</div>
                        <ul>
                            <li>Hidup</li>
                            <li>Mati</li>
                        </ul>
                        
                        <div class="font-weight-bold">Pekerjaan Ibu:</div>
                        <ul>
                            <li>PNS/TNI/Polri</li>
                            <li>wiraswasta</li>
                            <li>Karyawan Swasta</li>
                            <li>Wirausaha</li>
                            <li>Pedagang Kecil</li>
                            <li>Buruh</li>
                            <li>Petani</li>
                            <li>Lainnya</li>
                            <li>Tidak Bekerja</li>
                            <li>Sudah Meninggal</li>
                        </ul>
                        
                        <div class="font-weight-bold">Penghasilan Ibu:</div>
                        <ul>
                            <li>2.000.000 - 4.000.000</li>
                            <li>1.000.000 - 1.999.999</li>
                            <li>500.000 - 999.999</li>
                            <li>Kurang dari 500.000</li>
                            <li>Tidak Berpenghasilan</li>
                        </ul>
                        
                        <div class="font-weight-bold">Jarak Rumah(Km):</div>
                        <ul>
                            <li>0</li>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                        </ul>
                        
                        <div class="font-weight-bold">Jumlah Tanggungan:</div>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                            <li>7</li>
                            <li>8</li>
                            <li>9</li>
                        </ul>
                        
                        <div class="font-weight-bold">Class:</div>
                        <ul>
                            <li>Layak</li>
                            <li>Tidak Layak</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" type="button" @click="importExcel">
                        {{ loading ? 'Loading...' : 'Import' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetchAPI from '../libs/API';

export default {
    data() {
        return {
            empty: false,
            loading: false
        }
    },
    methods: {
        toBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
            });
        },
        async importExcel() {
            try {
                this.loading = true
                const file = this.$refs['file'].files[0]
                if (file) {
                    const file_base64 = (await this.toBase64(file)).split(',')[1]
                    const res = await fetchAPI('/data/test/import', {
                        method: 'POST',
                        body: {
                            empty: this.empty,
                            file: file_base64
                        }
                    })
                    this.$emit('imported')
                }
            } catch (err) {
                console.dir(err)
            } finally {
                this.loading = false
            }
        }
    },
}
</script>