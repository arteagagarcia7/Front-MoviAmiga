<template>
  <!-- Página de perfil del usuario -->
  <main>
    <div class="container">
      <div class="form-container">
        <h1>Mi Perfil</h1>

        <!-- Formulario de edición de perfil -->
        <form @submit.prevent="guardarCambios">

          <!-- Vista previa y cambio de foto de perfil -->
          <div class="mb-3 text-center">
            <label class="form-label">Foto de Perfil</label><br>

            <!-- Campo para cargar nueva imagen -->
            <input type="file" @change="previewImage" accept="image/*" class="form-control mb-2">

            <!-- Vista previa de la imagen seleccionada -->
            <div v-if="fotoPerfilUrl">
              <img :src="fotoPerfilUrl" alt="Vista previa" width="100" class="rounded-circle mt-2">
              <br>
              <button type="button" class="btn btn-sm btn-outline-danger mt-2" @click="eliminarFoto">Eliminar Foto</button>
            </div>
          </div>

          <!-- Nombre, no se deja editable por ahora -->
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" :value="usuario.nombre" disabled>
          </div>

          <!-- Apellido, no se deja editable por ahora -->
          <div class="mb-3">
            <label class="form-label">Apellido</label>
            <input type="text" class="form-control" :value="usuario.apellido" disabled>
          </div>

          <!-- Correo electrónico, este si es editable -->
          <div class="mb-3">
            <label class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" v-model="form.correo" required>
          </div>

          <!-- Contraseña actual, en caso de quererla modificar -->
          <div class="mb-3">
            <label class="form-label">Contraseña actual</label>
            <input type="password" class="form-control" v-model="form.contrasenaActual">
          </div>

          <!-- Nueva contraseña, en caso de quererla modificar -->
          <div class="mb-3">
            <label class="form-label">Nueva contraseña</label>
            <input type="password" class="form-control" v-model="form.nuevaContrasena">
          </div>

          <!-- Confirmar nueva contraseña, en caso de quererla modificar -->
          <div class="mb-3">
            <label class="form-label">Confirmar nueva contraseña</label>
            <input type="password" class="form-control" v-model="form.confirmarNueva">
          </div>

          <!-- Botón para guardar los cambios -->
          <button type="submit" class="btn btn-success">Guardar Cambios</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "PerfilUsuario",
  data() {
    return {
      // Información del usuario, esta se debe tomar de la tabla usuarios cuando se una con el back
      usuario: {
        nombre: "Juan",
        apellido: "Pérez",
        correo: "juan@example.com",
        // Otros campos no editables
      },

      // Campos editables del formulario de perfil, temporalmente
      form: {
        correo: "juan@example.com",
        contrasenaActual: "",
        nuevaContrasena: "",
        confirmarNueva: "",
      },

      fotoPerfil: null,          // Imagen seleccionada
      fotoPerfilUrl: null        // URL para mostrar vista previa, como plus
    };
  },
  methods: {
    /**
     * Sirve para carga la imagen seleccionada y la muestra como vista previa
     * @param {Event} event - Evento del input tipo file
     */
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.fotoPerfil = file;
        this.fotoPerfilUrl = URL.createObjectURL(file);
      }
    },

    /**
     * Sirve para eliminar la imagen cargada del perfil (localmente)
     */
    eliminarFoto() {
      this.fotoPerfil = null;
      this.fotoPerfilUrl = null;
    },

    /**
     * Sirve para guarda los cambios de perfil, es solo para la simulación porque este debe conectarse con el back para guardar la información.
     */
    guardarCambios() {
      if (this.form.nuevaContrasena && this.form.nuevaContrasena !== this.form.confirmarNueva) {
        alert("Las nuevas contraseñas no coinciden");
        return;
      }
      alert("Perfil actualizado correctamente");
    }
  }
};
</script>

<style scoped>
img.rounded-circle {
  border-radius: 50%;
  border: 2px solid #ddd;
  padding: 2px;
}

.form-container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}
</style>