// Este store permite controlar cuando un usuario inicia seseión o no.
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    // Estado reactivo que indica si el usuario está autenticado
    const isAuthenticated = ref(false)

    // Función para iniciar sesión (podrías agregar validación real aquí)
    function login() {
        isAuthenticated.value = true
    }

    // Función para cerrar sesión
    function logout() {
        isAuthenticated.value = false
    }

    return {
        isAuthenticated,
        login,
        logout
    }
})
