<template>
  <div class="container my-4">
    <!-- Título principal -->
    <h2 class="mb-4">Rutas Sistema de Transporte Público en Bogotá</h2>

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
              <label for="nombre" class="form-label">Nombre de la Ruta</label>
              <input type="text" class="form-control" id="nombre" v-model="nuevaRuta.nombre" required>
            </div>

            <div class="mb-3">
              <label for="zona_asignada" class="form-label">Zona Asignada</label>
              <input type="text" class="form-control" id="zona_asignada" v-model="nuevaRuta.zona_asignada" required>
            </div>
            
            <div class="mb-3">
              <label for="horario_inicio" class="form-label">Horario de Inicio</label>
              <input type="datetime-local" class="form-control" id="horario_inicio" v-model="nuevaRuta.horario_inicio" required>
            </div>

            <div class="mb-3">
              <label for="horario_fin" class="form-label">Horario de Cierre</label>
              <input type="datetime-local" class="form-control" id="horario_fin" v-model="nuevaRuta.horario_fin" required>
            </div>

            <div class="mb-3">
              <label for="bus" class="form-label">Bus asignado</label>
                <select class="form-select" id="bus" v-model="nuevaRuta.buses" required>
                  <option value="" disabled>Seleccione un bus</option>
                  <option v-for="bus in arrayBuses" :key="bus.id" :value="bus.codigo_bus">
                    {{ bus.codigo_bus }}
                  </option>
                </select>
            </div>
            
            <div class="mb-3">
              <label for="portal_origen" class="form-label">Selecciona tu Programa de Ruta</label>
              <select class="form-select" id="programas_Rutas" v-model="nuevaRuta.programas_Rutas" required>
                <option value="" disabled>Selecciona un programa de ruta</option>
                <option v-for="programa in arrayProgramasRutas" :key="programa.id" :value="programa.id">
                  De {{ programa.portal_origen_nombre }} a {{ programa.portal_final_nombre }}
                </option>
              </select>
            </div>

            <!-- Botones para agregar una ruta y cuando se seleccione el editar de abajo trae el id para actualizar los datos y con el ID se activa el boton de actualizar -->
            <div>
              <button type="button" class="btn btn-primary me-2" @click="agregarRuta" v-if="!editandoRutaId">Agregar</button>
              <button type="button" class="btn btn-success" @click="actualizarRuta" v-else>Actualizar</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Contenedor responsivo para que la tabla se vea bien en dispositivos pequeños -->
    <div class="table-responsive">
      <!-- Tabla principal que lista todos los paraderos -->
      <table class="table table-bordered table-hover align-middle text-center">
        <!--
          - table-bordered: agrega bordes entre celdas
          - table-hover: resalta fila al pasar el mouse
          - align-middle: centra el contenido verticalmente
          - text-center: centra horizontalmente
        -->
        <thead class="table-light">
          <tr>
            <th>Id</th> <!-- ID de la ruta -->
            <th>Nombre</th> <!-- Nombre de la ruta -->
            <th>Zona Asignada</th> <!-- zona -->
            <th>Horario de Inicio</th> <!-- horario de inicio -->
            <th>Horario de Cierre</th> <!-- horario de fin -->
            <th>Bus Asignado</th> <!-- Mostrar el nombre del bus asignado -->
            <th>Acciones</th> 
          </tr>
        </thead>

        <tbody>
          <!-- Iteramos sobre cada ruta recibido desde el backend -->
          <tr v-for="ruta in arrayRutas" :key="ruta.id">
            <td>{{ ruta.id }}</td>
            <td>{{ ruta.nombre }}</td>
            <td>{{ ruta.zona_asignada }}</td>
            <td>{{ ruta.horario_inicio }}</td>
            <td>{{ ruta.horario_fin }}</td>
            <td>{{ ruta.codigo_bus || 'Sin bus asignado' }}</td>
            <!-- Botones para editar y eliminar -->
            <td>
              <!-- Botón que llena el formulario con los datos de la ruta para editar -->
              <button class="btn btn-sm btn-warning me-2" @click="editarRuta(ruta)">Editar</button>
              <!-- Botón para eliminar la ruta -->
              <button class="btn btn-sm btn-danger" @click="eliminarRuta(ruta.id)">Eliminar</button>
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
      arrayRutas: [], // Aquí se almacenará el arreglo de rutas traído desde la API
      arrayBuses: [], // Aquí se almacenará el arreglo de buses traído desde la API 
      arrayProgramasRutas: [], // Aquí se almacenará el arreglo de programas_rutas traído desde la API
      nuevaRuta: {
        nombre: '',
        zona_asignada: '',
        horario_inicio: '',
        horario_fin: '',
        buses: '',
        programas_Rutas: ''
      },
      editandoRutaId: null // Este ID se usará para identificar si se está editando una ruta
    };
  },
  methods: {
    ListarRutas() {
      this.$axios.get('rutas/')
        .then(response => {
          this.arrayRutas = response.data;
          console.log('Datos de Rutas recibidos:', this.arrayRutas);
        })
        .catch(error => {
          console.error('Error al obtener las rutas:', error);
        });
    },
    ListarBuses() {
      this.$axios.get('buses/')
        .then(response => {
          this.arrayBuses = response.data;
          console.log('Datos de Buses recibidos:', this.arrayBuses);
        })
        .catch(error => {
          console.error('Error al obtener los buses:', error);
        });
    },
    ListarProgramasRutas() {
      this.$axios.get('programas_rutas/')
        .then(response => {
          this.arrayProgramasRutas = response.data;
          console.log('Programas de Rutas recibidos:', this.arrayProgramasRutas);
        })
        .catch(error => {
          console.error('Error al obtener programas de rutas:', error);
        });
    },
    agregarRuta() {
      this.$axios.post('rutas/', this.nuevaRuta)
        .then(response => {
          console.log('Ruta agregada correctamente:', response.data);
          this.ListarRutas();
          this.resetFormulario();
        })
        .catch(error => {
          if (error.response) {
            console.error('Detalles del error:', error.response.data);
          } else {
            console.error('Error desconocido al agregar la ruta:', error);
          }
        });
    },
    editarRuta(ruta) {
      this.nuevaRuta = {
        nombre: ruta.nombre,
        zona_asignada: ruta.zona_asignada,
        horario_inicio: ruta.horario_inicio,
        horario_fin: ruta.horario_fin,
        buses: ruta.buses || '',
        programas_Rutas: '' 
      };
      this.editandoRutaId = ruta.id;
    },
    actualizarRuta() {
      this.$axios.put('rutas/' + this.editandoRutaId + '/', this.nuevaRuta)
        .then(response => {
          console.log('Ruta actualizada correctamente:', response.data);
          this.ListarRutas();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al actualizar la ruta:', error);
        });
    },
    eliminarRuta(id) {
      if (confirm('¿Estás seguro de que deseas eliminar esta ruta?')) {
        this.$axios.delete('rutas/' + id + '/')
          .then(() => {
            console.log('Ruta eliminada');
            this.ListarRutas();
          })
          .catch(error => {
            console.error('Error al eliminar la ruta:', error);
          });
      }
    },
    resetFormulario() {
      this.nuevaRuta = {
        nombre: '',
        zona_asignada: '',
        horario_inicio: '',
        horario_fin: '',
        buses: '',
        programas_Rutas: ''
      };
      this.editandoRutaId = null;
    }
  },
  created() {
    this.ListarRutas();
    this.ListarBuses();
    this.ListarProgramasRutas();
  }
};
</script>

<style scoped>
/* Estilo opcional si después se usa botones con apariencia de enlace */
.btn-link {
  color: #198754; /* Verde Bootstrap */
  cursor: pointer;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>