<template>
    <div id="page-top">
    
      <!-- Page Wrapper -->
      <div id="wrapper">
  
          <!-- Sidebar -->
          <Sidebar />
          <!-- End of Sidebar -->
  
          <!-- Content Wrapper -->
          <div id="content-wrapper" class="d-flex flex-column">
  
              <!-- Main Content -->
              <div id="content">
  
                  <!-- Topbar -->
                  <Navbar :user="userData" />
                  <!-- End of Topbar -->
  
                  <!-- Begin Page Content -->
                  <div class="container-fluid">
                    <slot />
                  </div>
                  <!-- /.container-fluid -->
  
              </div>
              <!-- End of Main Content -->
  
              <!-- Footer -->
              <footer class="sticky-footer bg-white">
                  <div class="container my-auto">
                      <div class="copyright text-center my-auto">
                          <span>Copyright &copy; Your Website 2021</span>
                      </div>
                  </div>
              </footer>
              <!-- End of Footer -->
  
          </div>
          <!-- End of Content Wrapper -->
  
      </div>
      <!-- End of Page Wrapper -->
  
      <!-- Scroll to Top Button-->
      <a class="scroll-to-top rounded" href="#page-top">
          <i class="fas fa-angle-up"></i>
      </a>
        
    </div>
</template>
<script lang="ts">
import fetchAPI from '~/libs/API';

export default {
    data() {
        return {
            userData: {}
        }
    },
    async mounted() {
        try {
            const res:any = await fetchAPI('/auth/me')
            this.userData = res.data
            console.log(this.userData)
        } catch (error:any) {
            let status = [401, 422]
            if (status.includes(error.status)) {
                localStorage.removeItem('AUTH_TOKEN')
            }
        }
        const token = localStorage.getItem('AUTH_TOKEN')
        if (!token) {
            this.$router.replace('/login')
        }
    }
}
</script>