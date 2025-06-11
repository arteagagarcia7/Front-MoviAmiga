<template>
  <div class="container my-5">
    <h2 class="mb-4">Recargar Tarjeta de Transporte</h2>

    <!-- Formulario para simular la recarga -->
    <form @submit.prevent="enviarRecarga">
      <!-- Campo para ingresar el nombre completo del usuario -->
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre completo</label>
        <!-- El v-model enlaza el input con la propiedad nombre -->
        <input
          type="text"
          id="nombre"
          class="form-control"
          v-model="form.nombre"
          placeholder="Ejemplo: Juan Pérez"
          required
        />
      </div>

      <!-- Campo para ingresar el número de la tarjeta registrada -->
      <div class="mb-3">
        <label for="tarjeta" class="form-label">Número de tarjeta</label>
        <!-- Este número se debe valdiar con los datos ingresados en el back en la tabla tarjeta usuario falta unir con el back y hacer el API-->
        <input
          type="text"
          id="tarjeta"
          class="form-control"
          v-model="form.tarjeta"
          placeholder="Ejemplo: 1234567890"
          required
        />
      </div>

      <!-- Campo para ingresar el monto que desea recargar -->
      <div class="mb-3">
        <label for="monto" class="form-label">Monto a recargar</label>
        <!-- Campo para ingresar dato de tipo integer -->
        <input
          type="number"
          id="monto"
          class="form-control"
          v-model.number="form.monto"
          min="1000"
          step="500"
          placeholder="Mínimo $1.000"
          required
        />
      </div>

      <!-- Botón para simular la redirección a PSE para hacer el pago -->
      <button type="submit" class="btn btn-success">
        Recargar con PSE
      </button>
    </form>

    <!-- Mensaje de simulación de éxito -->
    <div v-if="mensaje" class="alert alert-info mt-4">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Recargas",
  data() {
    return {
      // Aquí se guardan los datos ingresados en el formulario para hacer pruebas
      form: {
        nombre: "", // Nombre del usuario
        tarjeta: "", // Número de tarjeta ingresado
        monto: null, // Monto a recargar
      },
      // Mensaje después de hacer la recarga simulada
      mensaje: "Recarga exitosa",
    };
  },
  methods: {
    /**
     * Simula el envío del formulario de recarga.
     * Este debe buscar conectarse con el back y con PSE.
     */
    enviarRecarga() {
      // mensaje simulado de éxito con los datos ingresados
      this.mensaje = `Recarga exitosa por $${this.form.monto} para ${this.form.nombre}. Será redirigido a PSE.`;

      // Redirección a PSE
      // window.location.href = "https://pse.com.co";

      // Limpiar el formulario después de la simulación
      this.form.nombre = "";
      this.form.tarjeta = "";
      this.form.monto = null;
    },
  },
};
</script>

<style scoped>
/* Estilo para centrar y espaciado general */
.container {
  max-width: 600px;
}

/* Ajustes de estilo para el formulario */
form {
  background-color: #f8f9fa; /* Color gris claro */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>