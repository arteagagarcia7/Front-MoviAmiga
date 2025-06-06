import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('@/views/index.vue') // Página de inicio
        },
        {
          path: 'quienes-somos',
          name: 'quienes-somos',
          component: () => import('@/views/Quienes Somos.vue') // Página ¿Quiénes Somos?
        },
        {
          path: 'tarifas',
          name: 'tarifas',
          component: () => import('@/views/Tarifas.vue') // Página Tarifas
        },
        {
          path: 'contactenos',
          name: 'contactenos',
          component: () => import('@/views/Contactenos.vue') // Página Contáctenos
        },
        {
          path: 'inicio-sesion',
          name: 'inicio-sesion',
          component: () => import('@/views/Inicio Sesion.vue') // Página Inicio de sesión
        },
        {
          path: 'pagina-principal',
          name: 'pagina-principal',
          component: () => import('@/views/Pagina_Principal.vue') // Págian principal después de iniciar sesión
        },
        {
          path: 'registrarse',
          name: 'registrarse',
          component: () => import('@/views/Registrarse.vue') // Página para registrarse
        },
        {
          path: 'rutas',
          name: 'rutas',
          component: () => import('@/views/Rutas.vue') // Página para ver rutas
        },
        {
          path: 'paraderos',
          name: 'paraderos',
          component: () => import('@/views/Paraderos.vue') // Página para ver los parderos
        },
        {
          path: 'calcular-ruta',
          name: 'calcular-ruta',
          component: () => import('@/views/CalcularRuta.vue') // Página para entrar a calcular la ruta
        },
        {
          path: 'recargas',
          name: 'recargas',
          component: () => import('@/views/Recargas.vue') // Página para realizar recargas
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: () => import('@/views/Perfil.vue') // Página para ver tu perfil
        },
        {
          path: '/',
          name: 'cerrar-sesion',
          component: () => import('@/views/index.vue') // Cerrar Sesión
        },
        {
          path: 'Portales',
          name: 'Portales',
          component: () => import('@/views/Portales.vue') // Vista de portales
        },
        {
          path: 'Buses',
          name: 'Buses',
          component: () => import('@/views/Buses.vue') // Vista de portales
        }
      ]
    },

  ],
})

export default router
