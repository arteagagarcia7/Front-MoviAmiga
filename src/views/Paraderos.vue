<template>
  <div class="container my-4">
    <h2 class="mb-4">Paraderos por Medio de Transporte</h2>

    <!-- Tabla horizontal con medios de transporte -->
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th>Medio de Transporte</th>
            <th>Paraderos (click para desplegar)</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteramos o recorremos los datos de medios de transporte -->
          <tr v-for="medio in mediosTransporte" :key="medio.id">
            <!-- Nombre del tipo de transporte-->
            <td>
              <button 
                class="btn btn-link p-0" 
                @click="toggleMedio(medio.id)"
                style="font-weight: bold; font-size: 1.1em;"
                :aria-expanded="isMedioOpen(medio.id)"
                :aria-controls="'paraderos-' + medio.id"
              >
                {{ medio.nombre }}
              </button>
            </td>

            <!-- Aquí se despliegan los paraderos si el tipo de transporte está abierto -->
            <td>
              <div v-if="isMedioOpen(medio.id)" :id="'paraderos-' + medio.id">
                <ul class="list-group list-group-flush">
                  <!-- Lista de paraderos por tipo de transporte -->
                  <li v-for="paradero in medio.paraderos" :key="paradero.id" class="list-group-item">
                    <!-- Se muestra nombre y ubicación si está disponible, falta los datos de inclusión como booleanos de la tabla del back paraderos -->
                    <strong>{{ paradero.nombre }}</strong>
                    <br>
                    <small v-if="paradero.ubicacion">Ubicación: {{ paradero.ubicacion }}</small>
                  </li>
                  <li v-if="medio.paraderos.length === 0" class="list-group-item text-muted text-center">
                    No hay paraderos disponibles
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paraderos",
  data() {
    return {
      // Aqui se hace un prototipo de datos simulados de tipos de transporte y sus paraderos (para reemplazar con las tablas y datos del back)
      mediosTransporte: [
        {
          id: 1,
          nombre: "Transmilenio",
          paraderos: [
            {
                id: 1, 
                nombre: "Portal Norte", 
                ubicacion: "Autopista Norte con Calle 170",
                inclusión_discapacitados: "Si",
                inclusión_extranjeros: "Si",
            },
            { 
                id: 2, 
                nombre: "Estación Calle 100", 
                ubicacion: "Autopista Norte con Calle 100",
                inclusión_discapacitados: "No",
                inclusión_extranjeros: "No",
            },
          ],
        },
        {
          id: 2,
          nombre: "Alimentadores",
          paraderos: [
            { 
                id: 3, 
                nombre: "Plataforma 1", 
                ubicacion: "Calle 80 con Carrera 110",
                inclusión_discapacitados: "Si",
                inclusión_extranjeros: "No", 
            },
          ],
        },
        {
          id: 3,
          nombre: "Transmicable",
          paraderos: [
            { 
                id: 4, 
                nombre: "Estación Mirador", 
                ubicacion: "Ciudad Bolívar",
                inclusión_discapacitados: "Si",
                inclusión_extranjeros: "Si",
            },
          ],
        },
        {
          id: 4,
          nombre: "SITP",
          paraderos: [
            { 
                id: 5, 
                nombre: "Betania", 
                ubicacion: "Cl 53 sur - Kra 86C",
                inclusión_discapacitados: "Si",
                inclusión_extranjeros: "No",
            },
          ],
        },
        {
          id: 5,
          nombre: "Complementario",
          paraderos: [
            { 
                id: 6, 
                nombre: "El Jardin", 
                ubicacion: "Kr 80I - Cl 87B Sur",
                inclusión_discapacitados: "No",
                inclusión_extranjeros: "No",
            },
          ],
        },
        {
          id: 6,
          nombre: "Especial",
          paraderos: [
            { 
                id: 6, 
                nombre: "Bella Flor",
                ubicacion: "kr 27B - Cl 71T Sur",
                inclusión_discapacitados: "No",
                inclusión_extranjeros: "No",
            },
          ],
        },
      ],
      mediosAbiertos: [], // Controla qué tipo de transporte tienen su lista desplegada y así mismo se muestra la información
    };
  },
  methods: {
    /**
     * Abre o cierra la visualización de paraderos para un medio
     * @param {number} id - ID del medio
     */
    toggleMedio(id) {
      if (this.mediosAbiertos.includes(id)) {
        this.mediosAbiertos = this.mediosAbiertos.filter((m) => m !== id);
      } else {
        this.mediosAbiertos.push(id);
      }
    },

    /**
     * Verifica si el tipo de transporte está abierto
     * @param {number} id
     * @returns {boolean}
     */
    isMedioOpen(id) {
      return this.mediosAbiertos.includes(id);
    },
  },
};
</script>

<style scoped>
.btn-link {
  color: #198754; /* Verde Bootstrap */
  text-decoration: none;
  cursor: pointer;
}
.btn-link:hover {
  text-decoration: underline;
}
</style>