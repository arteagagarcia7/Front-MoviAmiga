<template>
    <div class="container my-4">
        <h2 class="mb-4">Medios de Transporte y Rutas</h2>

        <!-- Tabla horizontal con medios de transporte -->
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead class="table-light">
                    <tr>
                        <th>Medio de Transporte</th>
                        <th>Rutas (click para desplegar)</th>
                    </tr>
                </thead>
                <tbody>
                <!-- Iteramos o recorremos los datos de los medios de transporte que se tienen -->
                <tr v-for="medio in mediosTransporte" :key="medio.id">
                <!-- Nombre del medio del transporte -->
                <td>
                    <button 
                        class="btn btn-link p-0" 
                        @click="toggleMedio(medio.id)"
                        style="font-weight: bold; font-size: 1.1em;"
                        :aria-expanded="isMedioOpen(medio.id)"
                        :aria-controls="'rutas-'+medio.id"
                    >
                        {{ medio.nombre }}
                    </button>
                </td>

                <!-- Aquí se despliegan las rutas si el medio de transporte está abierto -->
                <td>
                    <div v-if="isMedioOpen(medio.id)" :id="'rutas-'+medio.id">
                        <table class="table table-sm table-striped mb-0">
                        <thead>
                            <tr>
                                <th>Ruta</th>
                                <th></th>
                                <th v-if="medio.nombre === 'Transmilenio'">Zona Asignada</th>
                                <th v-if="medio.nombre === 'Transmilenio'">Portal Origen</th>
                                <th v-if="medio.nombre === 'Transmilenio'">Portal Destino</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ruta in medio.rutas" :key="ruta.id">
                                <td>{{ ruta.nombre }}</td>
                                <td>{{ ruta.planRuta }}</td>
                                <td v-if="medio.nombre === 'Transmilenio'">{{ ruta.zonaAsignada }}</td>
                                <td v-if="medio.nombre === 'Transmilenio'">{{ ruta.portalOrigen }}</td>
                                <td v-if="medio.nombre === 'Transmilenio'">{{ ruta.portalDestino }}</td>
                            </tr>
                            <tr v-if="medio.rutas.length === 0">
                                <td colspan="4" class="text-center text-muted">No hay rutas disponibles</td>
                            </tr>
                        </tbody>
                        </table>
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
  name: "Rutas",
  data() {
    return {
      // Aquí definimos los medios de transporte con rutas para simular su funcionalidad con los datos de la tabla del modelo E-R
      mediosTransporte: [
        {
          id: 1,
          nombre: "Transmilenio",
          rutas: [
            {
              id: 1,
              nombre: "J23",
              zonaAsignada: "Sur - centro",
              horario: "4:00 - 23:00",
              portalOrigen: "Portal Americas",
              portalDestino: "Las Aguas",
            },
            {
              id: 2,
              nombre: "D22",
              zonaAsignada: "Sur - Noroccidente",
              horario: "8:00 - 21:00",
              portalOrigen: "Portal Sur",
              portalDestino: "Portal 80",
            },
          ],
        },
        {
          id: 2,
          nombre: "Alimentadores",
          rutas: [
            {
              id: 1,
              nombre: "Bosa Libertad",
              zonaAsignada: "La libertad",
              horario: "4:00 - 23:00",
              portalOrigen: "Portal Americas",
              portalDestino: "Portal Americas",
            },
            {
              id: 2,
              nombre: "Roma",
              zonaAsignada: "Villa Anita - Roma",
              horario: "4:00 - 23:00",
              portalOrigen: "Portal Americas",
              portalDestino: "Portal Americas",
            },
          ],
        },
        {
          id: 3,
          nombre: "SITP",
          rutas: [
            {
              id: 1,
              nombre: "142",
              zonaAsignada: "Teusaquillo-Engativa",
              horario: "4:00 - 22:00",
              portalOrigen: "La Esperanza",
              portalDestino: "San Martin",
            },
            {
              id: 2,
              nombre: "927",
              zonaAsignada: "Bosa San José - Aeropuerto",
              horario: "3:30 - 22:30",
              portalOrigen: "Bosa San José",
              portalDestino: "Aeropuerto El Dorado",
            },
          ],
        },
        {
          id: 4,
          nombre: "Complementario",
          rutas: [
            {
              id: 1,
              nombre: "14-1",
              zonaAsignada: "Las Cruces",
              horario: "4:00 - 22:00",
              portalOrigen: "Estación Bicentenario",
              portalDestino: "Estación Bicentenario",
            },
            {
              id: 2,
              nombre: "19-11",
              zonaAsignada: "Canódromo",
              horario: "4:30 - 21:30",
              portalOrigen: "Estación Prado",
              portalDestino: "Estación Prado",
            },
          ],
        },
        {
          id: 5,
          nombre: "Especial",
          rutas: [
            {
              id: 1,
              nombre: "10-12",
              zonaAsignada: "Mochuelo Bajo - Paraíso",
              horario: "5:00 - 22:00",
              portalOrigen: "Laguinitas",
              portalDestino: "IED Paraíso Mirador",
            },
            {
              id: 2,
              nombre: "18-7",
              zonaAsignada: "Soratama",
              horario: "5:00 - 21:00",
              portalOrigen: "Santa Teresa",
              portalDestino: "Santa Teresa",
            },
          ],
        },
      ],

      // Sirve para controlar qué medio está desplegado
      mediosAbiertos: [], // Array con ids de medios abiertos
    };
  },

  methods: {
    /**
     * Cambia el estado del medio de transporte (abre o cierra las rutas)
     * @param {number} id - Id del medio de transporte
     */
    toggleMedio(id) {
      if (this.mediosAbiertos.includes(id)) {
        // Si está abierto, se cierra (se quita del array)
        this.mediosAbiertos = this.mediosAbiertos.filter((mId) => mId !== id);
      } else {
        // Si está cerrado, se abre (se agrega el array)
        this.mediosAbiertos.push(id);
      }
    },

    /**
     * Sirve para verifica si un medio de transporte está abierto para mostrar sus rutas
     * @param {number} id - Id del medio de transporte
     * @returns {boolean} se usa un boolean que arroja true si está abierto y false si está cerrado
     */
    isMedioOpen(id) {
      return this.mediosAbiertos.includes(id);
    },
  },
};
</script>

<style scoped>
/* Estilo para el botón del medio de transporte para que parezca enlace */
.btn-link {
  color: #198754; /* Color verde bootstrap */
  cursor: pointer;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>