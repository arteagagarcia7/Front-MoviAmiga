<template>
    <main>
        <div class="container">
            <!-- Este es el contenedor del formulario -->
            <div class="form-container">
                <h1>Regístrate</h1>

                <!-- Formulario de registro -->
                <form @submit.prevent="registrarse">

                    <!-- Este permite seleccionar una imagen de perfil con vista previa -->
                    <div class="mb-3 text-center">
                        <label class="form-label">Foto de Perfil</label><br>
                        <input type="file" @change="previewImage" accept="image/*" class="form-control mb-2">
                        <div v-if="fotoPerfilUrl">
                            <img :src="fotoPerfilUrl" alt="Vista previa" width="100" class="rounded-circle mt-2">
                        </div>
                    </div>

                    <!-- Campo: Nombre -->
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" v-model="form.nombre" required>
                    </div>

                    <!-- Campo: Apellido -->
                    <div class="mb-3">
                        <label for="apellido" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="apellido" v-model="form.apellido" required>
                    </div>

                    <!-- Campo: Correo electrónico -->
                    <div class="mb-3">
                        <label for="correo" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" id="correo" v-model="form.correo" required>
                    </div>

                    <!-- Campo: Contraseña -->
                    <div class="mb-3">
                        <label for="contrasena" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="contrasena" v-model="form.contrasena" required>
                    </div>

                    <!-- Campo: Confirmar contraseña -->
                    <div class="mb-3">
                        <label for="confirmar" class="form-label">Confirmar contraseña</label>
                        <input type="password" class="form-control" id="confirmar" v-model="form.confirmar" required>
                    </div>

                    <!-- Aceptar términos y condiciones -->
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="terminos" v-model="form.aceptaTerminos" required>
                        <label class="form-check-label" for="terminos">Acepto los términos y condiciones</label>
                    </div>

                    <!-- Botón de registrarse -->
                    <button type="submit" class="btn btn-primary">Registrarse</button>

                </form>
            </div>
        </div>
    </main>
</template>

<script>
// para pruebas
export default {
     data() {
        return {
            form: {
                nombre: '',
                apellido: '',
                correo: '',
                contrasena: '',
                confirmar: '',
                aceptaTerminos: false,
            },
        fotoPerfil: null,
        fotoPerfilUrl: null,
        };
    },
    methods: {
        // Muestra la imagen seleccionada como vista previa
        previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                this.fotoPerfil = file;
                this.fotoPerfilUrl = URL.createObjectURL(file);
            }
        },

        // Esta es la lógica de registro para las prueba
        registrarse() {
            // Validación básica de contraseñas
            if (this.form.contrasena !== this.form.confirmar) {
                alert('Las contraseñas no coinciden');
                return;
            }

            // Aquí iría la lógica para enviar los datos al back cuando se enlace
            // Mensaje de éxito
            alert('Te has registrado correctamente');

            // Redirigir a la página de inicio de sesión para que inicie sesióin el usuario
            this.$router.push('/inicio-sesion');
        }
    }
}
</script>

<style scoped>
    img.rounded-circle {
        border-radius: 50%;
        border: 2px solid #ddd;
        padding: 2px;
    }
</style>
