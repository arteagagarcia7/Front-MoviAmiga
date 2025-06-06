<template>
  <div class="container my-4">
    <!-- Título principal -->
    <h2 class="mb-4">Buses del Sistema de Transporte Público en Bogotá</h2>

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
              <label for="codigo_bus" class="form-label">Codigo del Bus</label>
              <input type="number" class="form-control" id="codigo_bus" v-model="nuevoBus.codigo_bus" required>
            </div>

            <div class="mb-3">
              <label for="modelo" class="form-label">Modelo</label>
              <input type="text" class="form-control" id="modelo" v-model="nuevoBus.modelo" required>
            </div>

            <div class="mb-3">
              <label for="capacidad" class="form-label">Capacidad de Personas</label>
              <input type="number" class="form-control" id="capacidad" v-model="nuevoBus.capacidad" required>
            </div>

            <div class="mb-3">
              <label for="gps" class="form-label">Tiene GPS integrado</label>
              <select class="form-control" id="gps" v-model="nuevoBus.gps" required>
                <option :value="true">Sí</option>
                <option :value="false">No</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="tipo_transporte" class="form-label">Tipo de Transporte Urbano:</label>
              <input type="text" class="form-control" id="tipo_transporte" v-model="nuevoBus.tipo_transporte" required>
            </div>

            <!-- Botones para agregar un bus y cuando se seleccione el editar de abajo trae el id para actualizar los datos y con el ID se activa el boton de actualizar -->
            <div>
              <button type="button" class="btn btn-primary me-2" @click="agregarBus" v-if="!editandoBusId">Agregar</button>
              <button type="button" class="btn btn-success" @click="actualizarBus" v-else>Actualizar</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Contenedor responsivo para que la tabla se vea bien en dispositivos pequeños -->
    <div class="table-responsive">
      <!-- Tabla principal que lista todos los buses -->
      <table class="table table-bordered table-hover align-middle text-center">
        <!--
          - table-bordered: agrega bordes entre celdas
          - table-hover: resalta fila al pasar el mouse
          - align-middle: centra el contenido verticalmente
          - text-center: centra horizontalmente
        -->
        <thead class="table-light">
          <tr>
            <th>ID</th> <!-- ID del bus -->
            <th>Código</th> <!-- Código interno del bus -->
            <th>Modelo</th> <!-- Modelo del bus -->
            <th>Capacidad</th> <!-- Capacidad de pasajeros -->
            <th>GPS</th> <!-- Si tiene o no GPS -->
            <th>Tipo de Transporte</th> <!-- Tipo de bus -->
            <th>Acciones</th> <!-- Nuevas acciones: Editar / Eliminar -->
            <!-- Columnas condicionales según tipo de bus -->
            <th v-if="arrayBuses.some(b => b.tipo_transporte === 'Transmilenio')">Biarticulado</th>
            <th v-if="arrayBuses.some(b => b.tipo_transporte === 'SITP')">Otros Buses</th>
          </tr>
        </thead>

        <tbody>
          <!-- Iteramos sobre cada bus recibido desde el backend -->
          <tr v-for="bus in arrayBuses" :key="bus.id">
            <td>{{ bus.id }}</td>
            <td>{{ bus.codigo_bus }}</td>
            <td>{{ bus.modelo }}</td>
            <td>{{ bus.capacidad }}</td>
            <td>{{ bus.gps ? 'Sí' : 'No' }}</td> <!-- GPS traducido a texto ya que el dato es booleano -->
            <td>{{ bus.tipo_transporte }}</td>
            <!-- Botones para editar y eliminar -->
            <td>
              <!-- Botón que llena el formulario con los datos del bus para editar -->
              <button class="btn btn-sm btn-warning me-2" @click="editarBus(bus)">Editar</button>
              <!-- Botón para eliminar el bus -->
              <button class="btn btn-sm btn-danger" @click="eliminarBus(bus.id)">Eliminar</button>
            </td>
            <!-- Si el bus es de tipo Transmilenio, se va a mostrar una marca -->
            <td v-if="bus.tipo_transporte === 'Transmilenio'">✔️</td>
            <!-- Si es SITP u otro tipo -->
            <td v-if="bus.tipo_transporte === 'SITP'">✔️</td>
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
      // Aquí se almacenará el arreglo de buses traído desde la API
      arrayBuses: [],
      // Objeto que almacena los datos del nuevo bus a registrar o editar
      nuevoBus: {
        codigo_bus: '',
        modelo: '',
        capacidad: '',
        gps: true,
        tipo_transporte: ''
      },
      // Este ID se usará para identificar si se está editando un bus y que se active el boton de actualizar
      editandoBusId: null
    };
  },
  methods: {
    // Método que se ejecuta para obtener los datos de los buses desde el backend usando GET
    ListarBuses() {
      this.$axios.get('buses/')
        .then(response => {
          this.arrayBuses = response.data;
          console.log('Datos de buses recibidos:', this.arrayBuses);
        })
        .catch(error => {
          console.error('Error al obtener los buses:', error);
        });
    },
    // Método para agregar un nuevo bus al backend usando POST
    agregarBus() {
      this.$axios.post('buses/', this.nuevoBus)
        .then(response => {
          console.log('Bus agregado correctamente:', response.data);
          this.ListarBuses();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al agregar el bus:', error);
        });
    },
    // Método que se activa cuando se da clic en el boton de editar y es para traer los datos de un bus y colocarlos en el formulario para poderlos editar
    editarBus(bus) {
      this.nuevoBus = { ...bus }; // Copi todos los datos del bus del ID seleccionado
      this.editandoBusId = bus.id;   // Guarda el ID actual para usar en PUT
    },
    // Método para enviar la actualización al backend haciendo uso del PUT
    actualizarBus() {
      this.$axios.put('buses/' + this.editandoBusId + '/', this.nuevoBus)
        .then(response => {
          console.log('Bus actualizado correctamente:', response.data);
          this.ListarBuses();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al actualizar el bus:', error);
        });
    },

    // Método para eliminar un bus específico haciendo uso de DELETE
    eliminarBus(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este bus?')) {
        this.$axios.delete('buses/' + id + '/')
          .then(() => {
            console.log('Bus eliminado');
            this.ListarBuses();
          })
          .catch(error => {
            console.error('Error al eliminar el bus:', error);
          });
      }
    },

    // Método que reinicia el formulario y sale del modo edición
    resetFormulario() {
      this.nuevoBus = {
        codigo_bus: '',
        modelo: '',
        capacidad: '',
        gps: true,
        tipo_transporte: ''
      };
      this.editandoBusId = null;
    }
  },
  
  created() {
    this.ListarBuses();
  }
};
</script>

<style scoped>
.btn-link {
  color: #198754;
  cursor: pointer;
  text-decoration: none;
}
.btn-link:hover {
  text-decoration: underline;
}
</style>