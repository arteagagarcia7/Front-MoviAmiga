<template>
  <div>
    <header>
      <img src="/Imagenes/Logo.png" alt="Logo MoviAmiga Bogotá" />
      <h1>MoviAmiga Bogotá, siempre a tu alcance</h1>

      <!-- Menú de navegación -->
      <nav class="navbar justify-content-center bg-body-tertiary" style="background-color: #8CCB3E;">
        <div class="container-fluid">
          <!-- Enlace de la página principal -->
          <router-link class="navbar-brand" to="/">Inicio</router-link>

          <!-- Botón para mostrar y ocultar el menú en pantallas pequeñas -->
          <button
            class="navbar-toggler"
            type="button"
            @click="toggleMenu"
            :aria-expanded="isMenuOpen"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <!-- Este es el contenedor del menú desplegable -->
          <div class="collapse navbar-collapse" :class="{ show: isMenuOpen }" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              
              <!-- Esta parte solo será visible si no ha iniciado sesión -->
              <template v-if="!authStore.isAuthenticated">
                <router-link class="nav-link" :class="{ active: $route.path === '/' }" to="/" @click="closeMenu">Inicio</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/quienes-somos' }" to="/quienes-somos" @click="closeMenu">¿Quiénes Somos?</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/tarifas' }" to="/tarifas" @click="closeMenu">Tarifas</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/contactenos' }" to="/contactenos" @click="closeMenu">Contáctenos</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/inicio-sesion' }" to="/inicio-sesion" @click="closeMenu">Inicio de Sesión</router-link>
              </template>
              

              <!-- Esta parte solo visible si has iniciado sesión -->
              <template v-if="authStore.isAuthenticated">
                <router-link class="nav-link" :class="{ active: $route.path === '/pagina-principal' }" to="/pagina-principal" @click="closeMenu">Inicio</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/quienes-somos' }" to="/quienes-somos" @click="closeMenu">¿Quiénes Somos?</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/tarifas' }" to="/tarifas" @click="closeMenu">Tarifas</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/contactenos' }" to="/contactenos" @click="closeMenu">Contáctenos</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/Tarjeta_Usuario' }" to="/Tarjeta_Usuario" @click="closeMenu">Tarjetas</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/Recarga' }" to="/Recarga" @click="closeMenu">Recarga</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/Ruta_Favorita' }" to="/Ruta_Favorita" @click="closeMenu">Ruta Favorita</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/rutas' }" to="/rutas" @click="closeMenu">Rutas</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/programas_rutas' }" to="/programas_rutas" @click="closeMenu">Programa de Rutas</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/Portales' }" to="/Portales" @click="closeMenu">Portales</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/Buses' }" to="/Buses" @click="closeMenu">Buses</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/paraderos' }" to="/paraderos" @click="closeMenu">Paraderos</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/carlcular-ruta' }" to="/calcular-ruta" @click="closeMenu">Calcula Tu Ruta</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/perfil' }" to="/perfil" @click="closeMenu">Tu Perfil</router-link>
                <router-link class="nav-link" :class="{ active: $route.path === '/' }" to="/" @click="cerrarSesion">Cerrar Sesión</router-link>
                
              </template>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- No hay contenido principal más que el router a las vistas -->
    <main>
      <router-view />
    </main>

    <!-- Pie de página prestablecido-->
    <footer>
      <p>&copy; 2024 MoviAmiga Bogotá</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Store de autenticación, ayuda a simular la autenticación de los datos
const authStore = useAuthStore()
const router = useRouter()


// Sirve para controlar el menú desplegable (pantallas pequeñas)
const isMenuOpen = ref(false)

// Esta función para alternar visibilidad del menú
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

// Esta función para cerrar el menú cuando se selecciona una opción
function closeMenu() {
  isMenuOpen.value = false
}

// Esta función para cerrar sesión, se usa con el menú de arriba
function cerrarSesion() {
  authStore.logout()
  closeMenu()
  router.push('/')
}


</script>

<style scoped>
/* Estilo del texto del menú, un estilo diferente al predeterminado en otras páginas */
.navbar-nav .nav-link {
  color: black;
  cursor: pointer;
}
.navbar-nav .nav-link.active {
  font-weight: bold;
  text-decoration: underline;
}
button.nav-link.btn-link {
  background: none;
  border: none;
  color: black;
}
button.nav-link.btn-link:hover {
  text-decoration: underline;
}
</style>


