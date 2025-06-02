<template>
    <!-- El main es la sesión principal del contenido de la página. -->
    <main>

        <!-- Div class container es una clase de Bootstrap que permite que todo lo que va a tener se vea centrado-->
        <div class="container">

            <!--Este div class form-container es el que contiene el formulario-->
            <div class="form-container">

                <!--Tiene un titulo tipo 1 con su respectivo nombre-->
                <h1>Inicio de Sesion</h1>

                <!--El form es el atributo que indica que es un formulario y el id registro-form es como se va a identificar este formulario en el código-->
                <form id="InicioSesion-form">

                    <!-- Este div class mb-3 es una clase de bootstrap que permite que el texto y cada uno de los elementos tengan espacio entre ellos y no se peguen -->
                    <div class="mb-3 text-center">

                        <!--Este div class mb-3 es una clase de bootstrap que permite que el texto y cada uno de los elementos tengan espacio entre ellos y no se peguen -->
                        <!--Aquí se encuentran los otros aspectos del formulario-->
                        <div class="mb-3">
                            <label for="email" class="form-label">Nombres</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                        </div>

                        <div class="checkbox">

                            <!-- Label es una etiqueta de entrada. -->
                            <!-- input es otra etiqueta de entrada, type indica el formato del tipo de información para que pueda validar que sea la información correcta, clase es de tipo checkbox que permite a los usuarios activar o desactivar la función asígnada al mismo. -->
                            <label><input type="checkbox">Recuérdame</label>

                        </div>

                        <!-- Botón que llama a la función para iniciar sesión -->
                        <button type="button" class="btn btn-primary me-2" @click="iniciarSesion">
                            Iniciar Sesión
                        </button>

                        <!-- Enlace a la página de registro -->
                        <router-link to="/registrarse" class="btn btn-primary">
                            Registrarme
                        </router-link>
                    </div>

                </form>
            </div>
        </div>
    </main>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function iniciarSesion() {
  // Aquí podrías validar email/contraseña antes si tuvieras backend
  authStore.login() // Marca como autenticado
  router.push('/pagina-principal') // Redirige a la página principal
}
</script>


<style scoped></style>