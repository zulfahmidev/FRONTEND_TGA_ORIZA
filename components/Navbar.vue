<template>
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    
        <!-- Sidebar Toggle (Topbar) -->
        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
        </button>
    
        <!-- Topbar Navbar -->
        <ul class="navbar-nav ml-auto">
    
            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 text-capitalize">{{ user.username }}</span>
                    <!-- <img class="img-profile rounded-circle" src=""> -->
                </a>
                <!-- Dropdown - User Information -->
                <form action="" method="post">
                    <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <button class="dropdown-item" @click="logout">
                            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </button>
                    </div>
                </form>
            </li>
    
        </ul>
    
    </nav>
</template>

<script>
export default {
    props: {
        user: {
            type: Object
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('AUTH_TOKEN')
            this.$router.replace('/login')
        }
    },
}
</script>