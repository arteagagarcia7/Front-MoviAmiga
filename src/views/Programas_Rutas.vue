<template>
  <div class="container my-4">
    <!-- Título principal -->
    <h2 class="mb-4">Programas de las Rutas del Sistema de Transporte Público de Bogotá</h2>

    <!-- Div class container es una clase de Bootstrap que permite que todo lo que va a tener se vea centrado-->
    <div class="container">
      <!--Este div class form-container es el que contiene el formulario-->
      <div class="form-container">
        <!--El form es el atributo que indica que es un formulario y el id contacto-form es como se va a identificar este formulario en el código-->
        <form id="contactenos-form">
          <!-- Este div class mb-3 es una clase de bootstrap que permite que el texto y cada uno de los elementos tengan espacio entre ellos y no se peguen -->
          <div class="mb-3 text-center">
            <!-- Aquí se encuentran los otros aspectos del formulario para el POST y el PUT -->
            <div class="mb-3">
              <label for="recorrido_actualizado" class="form-label">Recorrido Actualizado</label>
              <input type="text" class="form-control" id="recorrido_actualizado" v-model="nuevoPrograma_Ruta.recorrido_actualizado" required>
            </div>

            <div class="mb-3">
              <label for="tiempo_actualizado" class="form-label">Tiempo Actualizado</label>
              <input type="text" class="form-control" id="tiempo_actualizado" v-model="nuevoPrograma_Ruta.tiempo_actualizado" required>
            </div>

            <div class="mb-3">
              <label for="vias_acceso" class="form-label">Estados de las vías de acceso:</label>
              <input type="text" class="form-control" id="vias_acceso" v-model="nuevoPrograma_Ruta.vias_acceso" required>
            </div>

            <div class="mb-3">
              <label for="horario_inicio" class="form-label">Horario de Inicio</label>
              <input type="datetime-local" class="form-control" id="horario_inicio" v-model="nuevoPrograma_Ruta.horario_inicio" required>
            </div>

            <div class="mb-3">
              <label for="horario_fin" class="form-label">Horario de Cierre</label>
              <input type="datetime-local" class="form-control" id="horario_fin" v-model="nuevoPrograma_Ruta.horario_fin" required>
            </div>

            <div class="mb-3">
              <label for="afluencia_personas" class="form-label">Afluencia de personas:</label>
              <input type="number" class="form-control" id="afluencia_personas" v-model="nuevoPrograma_Ruta.afluencia_personas" required>
            </div>

            <div class="mb-3">
              <label for="portal_origen" class="form-label">Portal de Origen</label>
              <select class="form-select" id="portal_origen" v-model="nuevoPrograma_Ruta.portal_origen_id" required>
                <option value="" disabled>Seleccione un Portal de Origen</option>
                <option v-for="portal in arrayPortales" :key="portal.id" :value="portal.id">{{ portal.nombre }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="portal_final" class="form-label">Portal de Final</label>
              <select class="form-select" id="portal_final" v-model="nuevoPrograma_Ruta.portal_final_id" required>
                <option value="" disabled>Seleccione un Portal de Llegada</option>
                <option v-for="portal in arrayPortales" :key="portal.id" :value="portal.id">{{ portal.nombre }}</option>
              </select>
            </div>

            <!-- Botones para agregar un portal y cuando se seleccione el editar de abajo trae el id para actualizar los datos y con el ID se activa el boton de actualizar -->
            <div>
              <button type="button" class="btn btn-primary me-2" @click="agregarPrograma_Ruta" v-if="!editandoPrograma_RutaId">Agregar</button>
              <button type="button" class="btn btn-success" @click="actualizarPrograma_Ruta" v-else>Actualizar</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Contenedor responsivo para que la tabla se vea bien en dispositivos pequeños -->
    <div class="table-responsive">
      <!-- Tabla principal que lista todos los programas de ruta -->
      <table class="table table-bordered table-hover align-middle text-center">
        <!--
          - table-bordered: agrega bordes entre celdas
          - table-hover: resalta fila al pasar el mouse
          - align-middle: centra el contenido verticalmente
          - text-center: centra horizontalmente
        -->
        <thead class="table-light">
          <tr>
            <th>Recorrido Actualizado</th> <!-- Código para escribir cuál es el recorrido actualizado -->
            <th>Tiempo Actualizado</th> <!-- Código para escribir cuál es el tiempo actualizado -->
            <th>Vias de Acceso</th> <!-- Código para escribir cuál es el estado de las vias -->
            <th>Horario de Inicio</th> <!-- Horario de inicio del programa -->
            <th>Horario de Cierre</th> <!-- Horario de fin del programa -->
            <th>Afluencia de Personas</th> <!-- Cantidad de personas -->
            <th>Portal de Origen</th> <!-- Portal origen -->
            <th>Portal Final</th> <!-- Portal destino -->
          </tr>
        </thead>

        <tbody>
          <!-- Iteramos sobre cada programa de ruta recibido desde el backend -->
          <tr v-for="programa_ruta in arrayProgramas_Rutas" :key="programa_ruta.id">
            <td>{{ programa_ruta.recorrido_actualizado }}</td>
            <td>{{ programa_ruta.tiempo_actualizado }}</td>
            <td>{{ programa_ruta.vias_acceso }}</td>
            <td>{{ programa_ruta.horario_inicio }}</td>
            <td>{{ programa_ruta.horario_fin }}</td>
            <td>{{ programa_ruta.afluencia_personas }}</td>
            <td>
              {{ programa_ruta.portal_origen ? programa_ruta.portal_origen.nombre : 'Sin portal asignado' }}
            </td>
            <td>
              {{ programa_ruta.portal_final ? programa_ruta.portal_final.nombre : 'Sin portal asignado' }}
            </td>
            <!-- Botones para editar y eliminar -->
            <td>
              <!-- Botón que llena el formulario con los datos del programa de ruta para editar -->
              <button class="btn btn-sm btn-warning me-2" @click="editarPrograma_Ruta(programa_ruta)">Editar</button>
              <!-- Botón para eliminar el programa de ruta -->
              <button class="btn btn-sm btn-danger" @click="eliminarPrograma_Ruta(programa_ruta.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Aquí se almacenará el arreglo del programa de ruta traído desde la API
      arrayProgramas_Rutas: [],
      // Aquí debe estar el arreglo del pprograma de ruta para los selects de portal origen y final
      arrayPortales: [],

      // Objeto que almacena los datos del nuevo programa de ruta
      nuevoPrograma_Ruta: {
        recorrido_actualizado: '',
        tiempo_actualizado: '',
        vias_acceso: '',
        horario_inicio: '',
        horario_fin: '',
        afluencia_personas: '',
        portal_origen_id: '', 
        portal_final_id: ''   
      },
      // Este ID se usará para identificar si se está editando un programa de ruta y que se active el boton de actualizar
      editandoPrograma_RutaId: null
    };
  },
  methods: {
    // Método que se ejecuta para obtener los datos de los programas de rutas desde el backend usando GET
    ListarPrograma_Rutas() {
      this.$axios.get('programas_rutas/')
        .then(response => {
          this.arrayProgramas_Rutas = response.data;
          console.log('Datos de programas de rutas recibidos:', this.arrayProgramas_Rutas);
        })
        .catch(error => {
          console.error('Error al obtener los programas de rutas:', error);
        });
    },
    // Método para cargar los portales para los selects de arriba
    ListarPortales() {
      this.$axios.get('portales/')
        .then(response => {
          this.arrayPortales = response.data;
          console.log('Datos de portales recibidos:', this.arrayPortales);
        })
        .catch(error => {
          console.error('Error al obtener los portales:', error);
        });
    },
    // Método para agregar un nuevo programa de ruta al backend usando POST
    agregarPrograma_Ruta() {
      this.$axios.post('programas_rutas/', this.nuevoPrograma_Ruta)
        .then(response => {
          console.log('Programa de ruta agregado correctamente:', response.data);
          this.ListarPrograma_Rutas();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al agregar el programa de ruta:', error);
        });
    },
    // Método que se activa cuando se da clic en el boton de editar y es para traer los datos de un programa de ruta y colocarlo en el formulario para poderlos editar
    editarPrograma_Ruta(programa_ruta) {
      // Al editar llenamos el formulario con los datos exactos de cada ID de programa de ruta
      this.nuevoPrograma_Ruta = { 
        recorrido_actualizado: programa_ruta.recorrido_actualizado,
        tiempo_actualizado: programa_ruta.tiempo_actualizado,
        vias_acceso: programa_ruta.vias_acceso,
        horario_inicio: programa_ruta.horario_inicio,
        horario_fin: programa_ruta.horario_fin,
        afluencia_personas: programa_ruta.afluencia_personas,
        portal_origen_id: programa_ruta.portal_origen_id || '',  // Usamos los IDs foráneos que debes envian en la API del back
        portal_final_id: programa_ruta.portal_final_id || ''
      };
      this.editandoPrograma_RutaId = programa_ruta.id;   // Guarda el ID actual para usar en PUT
    },
    // Método para enviar la actualización del programa de ruta al backend haciendo uso del PUT
    actualizarPrograma_Ruta() {
      this.$axios.put('programas_rutas/' + this.editandoPrograma_RutaId + '/', this.nuevoPrograma_Ruta)
        .then(response => {
          console.log('Programa de ruta actualizado correctamente:', response.data);
          this.ListarPrograma_Rutas();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al actualizar el Programa de ruta:', error);
        });
    },

    // Método para eliminar un programa de ruta específico haciendo uso de DELETE
    eliminarPrograma_Ruta(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este portal?')) {
        this.$axios.delete('programas_rutas/' + id + '/')
          .then(() => {
            console.log('Programa de ruta eliminado correctamente');
            this.ListarPrograma_Rutas();
          })
          .catch(error => {
            console.error('Error al eliminar el Programa de ruta:', error);
          });
      }
    },

    // Método que reinicia el formulario y sale del modo edición
    resetFormulario() {
      this.nuevoPrograma_Ruta = {
        recorrido_actualizado: '',
        tiempo_actualizado: '',
        vias_acceso: '',
        horario_inicio: '',
        horario_fin: '',
        afluencia_personas: '',
        portal_origen_id: '',
        portal_final_id: ''
      };
      this.editandoPrograma_RutaId = null;
    }
  },
  
  created() {
    this.ListarPrograma_Rutas();
    this.ListarPortales(); 
  }
};
</script>

<style scoped>
/* Estilo opcional si después se usan botones con apariencia de enlace */
.btn-link {
  color: #198754; /* Verde Bootstrap */
  cursor: pointer;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>
