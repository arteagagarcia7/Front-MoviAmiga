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
              <label for="nombre" class="form-label">Nombre del Paradero</label>
              <input type="text" class="form-control" id="nombre" v-model="nuevoParadero.nombre" required>
            </div>

            <div class="mb-3">
              <label for="inclusion_discapacitados" class="form-label">Tiene Inclusión para Personas Discapacitadas</label>
              <select class="form-control" id="gps" v-model="nuevoParadero.inclusion_discapacitados" required>
                <option :value="true">Sí</option>
                <option :value="false">No</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="punto_asignado" class="form-label">Dirección</label>
              <input type="text" class="form-control" id="punto_asignado" v-model="nuevoParadero.punto_asignado" required>
            </div>

            <div class="mb-3">
              <label for="capacidad_total_buses" class="form-label">Capacidad Total de Buses</label>
              <input type="number" class="form-control" id="capacidad_total_buses" v-model="nuevoParadero.capacidad_total_buses" required>
            </div>

            <div class="mb-3">
              <label for="tipo_transporte" class="form-label">Tipo de Transporte Urbano:</label>
              <input type="text" class="form-control" id="tipo_transporte" v-model="nuevoParadero.tipo_transporte" required>
            </div>

            <!-- Botones para agregar un paradero y cuando se seleccione el editar de abajo trae el id para actualizar los datos y con el ID se activa el boton de actualizar -->
            <div>
              <button type="button" class="btn btn-primary me-2" @click="agregarParadero" v-if="!editandoParaderoId">Agregar</button>
              <button type="button" class="btn btn-success" @click="actualizarParadero" v-else>Actualizar</button>
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
            <th>ID</th> <!-- ID del paradero -->
            <th>Nombre</th> <!-- Nombre del paradero -->
            <th>Tiene Inclusión para Personas Discapacitadas</th> <!-- Si tiene o no inclusión de personas discapacitadas -->
            <th>Dirección</th> <!-- punto asingado del paradero -->
            <th>Capacidad Total de Buses</th> <!-- Capacidad total de buses que se pueden estacionar ahí -->
            <th>Tipo de Transporte</th> <!-- Tipo de transporte que recibe el paradero -->
            <th>Acciones</th> <!-- Nuevas acciones: Editar / Eliminar -->
            <!-- Columnas condicionales según tipo de portal -->
            <th v-if="arrayParaderos.some(b => b.tipo_transporte === 'Transmilenio')">Biarticulado</th>
            <th v-if="arrayParaderos.some(b => b.tipo_transporte === 'SITP')">Otros Buses</th>
          </tr>
        </thead>

        <tbody>
          <!-- Iteramos sobre cada paradero recibido desde el backend -->
          <tr v-for="paradero in arrayParaderos" :key="paradero.id">
            <td>{{ paradero.id }}</td>
            <td>{{ paradero.nombre }}</td>
            <td>{{ paradero.inclusion_discapacitados ? 'Sí' : 'No' }}</td> <!-- GPS traducido a texto ya que el dato es booleano -->
            <td>{{ paradero.punto_asignado }}</td>
            <td>{{ paradero.capacidad_total_buses }}</td>
            <td>{{ paradero.tipo_transporte }}</td>
            <!-- Botones para editar y eliminar -->
            <td>
              <!-- Botón que llena el formulario con los datos del paradero para editar -->
              <button class="btn btn-sm btn-warning me-2" @click="editarParadero(paradero)">Editar</button>
              <!-- Botón para eliminar el paradero -->
              <button class="btn btn-sm btn-danger" @click="eliminarParadero(paradero.id)">Eliminar</button>
            </td>
            <!-- Si el paradero es de tipo Transmilenio, se va a mostrar una marca -->
            <td v-if="paradero.tipo_transporte === 'Transmilenio'">✔️</td>
            <!-- Si es SITP u otro tipo -->
            <td v-if="paradero.tipo_transporte === 'SITP'">✔️</td>
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
      // Aquí se almacenará el arreglo de paradero traído desde la API
      arrayParaderos: [],
      // Objeto que almacena los datos del nuevo paradero a registrar o editar
      nuevoParadero: {
        nombre: '',
        inclusion_discapacitados: '',
        punto_asignado: '',
        capacidad_total_buses: '',
        tipo_transporte: ''
      },
      // Este ID se usará para identificar si se está editando un paradero y que se active el boton de actualizar
      editandoParaderoId: null
    };
  },
  methods: {
    // Método que se ejecuta para obtener los datos de los paradero desde el backend usando GET
    ListarParaderos() {
      this.$axios.get('paraderos/')
        .then(response => {
          this.arrayParaderos = response.data;
          console.log('Datos de paraderos recibidos:', this.arrayParaderos);
        })
        .catch(error => {
          console.error('Error al obtener los paraderos:', error);
        });
    },
    // Método para agregar un nuevo paradero al backend usando POST
    agregarParadero() {
      this.$axios.post('paraderos/', this.nuevoParadero)
        .then(response => {
          console.log('Paradero agregado correctamente:', response.data);
          this.ListarParaderos();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al agregar el paradero:', error);
        });
    },
    // Método que se activa cuando se da clic en el boton de editar y es para traer los datos de un paradero y colocarlos en el formulario para poderlos editar
    editarParadero(paradero) {
      this.nuevoParadero = { ...paradero }; // Copia todos los datos del paradero del ID seleccionado
      this.editandoParaderoId = paradero.id; // Guarda el ID actual para usar en PUT
    },
    // Método para enviar la actualización al backend haciendo uso del PUT
    actualizarParadero() {
      this.$axios.put('paraderos/' + this.editandoParaderoId + '/', this.nuevoParadero)
        .then(response => {
          console.log('Paradero actualizado correctamente:', response.data);
          this.ListarParaderos();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al actualizar el paradero:', error);
        });
    },
    // Método para eliminar un paradero específico haciendo uso de DELETE
    eliminarParadero(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este paradero?')) {
        this.$axios.delete('paraderos/' + id + '/')
          .then(() => {
            console.log('Paradero eliminado');
            this.ListarParaderos();
          })
          .catch(error => {
            console.error('Error al eliminar el paradero:', error);
          });
      }
    },
    // Método que reinicia el formulario y sale del modo edición
    resetFormulario() {
      this.nuevoParadero = {
        nombre: '',
        inclusion_discapacitados: '',
        punto_asignado: '',
        capacidad_total_buses: '',
        tipo_transporte: ''
      };
      this.editandoParaderoId = null;
    }
  },
  created() {
    this.ListarParaderos();
  }
};
</script>

<style scoped>
/* Estilo opcional si después usas botones con apariencia de enlace */
.btn-link {
  color: #198754; /* Verde Bootstrap */
  cursor: pointer;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>
