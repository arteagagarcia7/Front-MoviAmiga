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
              <label for="nombre" class="form-label">Nombre del Portal</label>
              <input type="text" class="form-control" id="nombre" v-model="nuevoPortal.nombre" required>
            </div>

            <div class="mb-3">
              <label for="ubicación" class="form-label">Dirección</label>
              <input type="text" class="form-control" id="ubicacion" v-model="nuevoPortal.ubicacion" required>
            </div>

            <div class="mb-3">
              <label for="tipo_transporte" class="form-label">Tipo de Transporte Urbano:</label>
              <input type="text" class="form-control" id="tipo_transporte" v-model="nuevoPortal.tipo_transporte" required>
            </div>

            <!-- Botones para agregar un portal y cuando se seleccione el editar de abajo trae el id para actualizar los datos y con el ID se activa el boton de actualizar -->
            <div>
              <button type="button" class="btn btn-primary me-2" @click="agregarPortal" v-if="!editandoPortalId">Agregar</button>
              <button type="button" class="btn btn-success" @click="actualizarPortal" v-else>Actualizar</button>
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
            <th>ID</th> <!-- ID del portal -->
            <th>Nombre</th> <!-- Código interno del portal -->
            <th>Dirección</th> <!-- Punto asignado del portal -->
            <th>Tipo de Transporte</th> <!-- Tipo de transporte del portal -->
            <th>Acciones</th> <!-- Nuevas acciones: Editar / Eliminar -->
            <!-- Columnas condicionales según tipo de portal -->
            <th v-if="arrayPortales.some(b => b.tipo_transporte === 'Transmilenio')">Biarticulado</th>
            <th v-if="arrayPortales.some(b => b.tipo_transporte === 'SITP')">Otros Buses</th>
          </tr>
        </thead>

        <tbody>
          <!-- Iteramos sobre cada portal recibido desde el backend -->
          <tr v-for="portal in arrayPortales" :key="portal.id">
            <td>{{ portal.id }}</td>
            <td>{{ portal.nombre }}</td>
            <td>{{ portal.ubicacion }}</td>
            <td>{{ portal.tipo_transporte }}</td>
            <!-- Botones para editar y eliminar -->
            <td>
              <!-- Botón que llena el formulario con los datos del portal para editar -->
              <button class="btn btn-sm btn-warning me-2" @click="editarPortal(portal)">Editar</button>
              <!-- Botón para eliminar el portal -->
              <button class="btn btn-sm btn-danger" @click="eliminarPortal(portal.id)">Eliminar</button>
            </td>
            <!-- Si el portal es de tipo Transmilenio, se va a mostrar una marca -->
            <td v-if="portal.tipo_transporte === 'Transmilenio'">✔️</td>
            <!-- Si es SITP u otro tipo -->
            <td v-if="portal.tipo_transporte === 'SITP'">✔️</td>
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
      // Aquí se almacenará el arreglo de portales traído desde la API
      arrayPortales: [],
      // Objeto que almacena los datos del nuevo portal a registrar o editar
      nuevoPortal: {
        nombre: '',
        ubicacion: '',
        tipo_transporte: ''
      },
      // Este ID se usará para identificar si se está editando un portal y que se active el boton de actualizar
      editandoPortalId: null
    };
  },
  methods: {
    // Método que se ejecuta para obtener los datos de los portales desde el backend usando GET
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
    // Método para agregar un nuevo portal al backend usando POST
    agregarPortal() {
      this.$axios.post('portales/', this.nuevoPortal)
        .then(response => {
          console.log('Portal agregado correctamente:', response.data);
          this.ListarPortales();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al agregar el portal:', error);
        });
    },
    // Método que se activa cuando se da clic en el boton de editar y es para traer los datos de un portal y colocarlos en el formulario para poderlos editar
    editarPortal(portal) {
      this.nuevoPortal = { ...portal }; // Copi todos los datos del portal del ID seleccionado
      this.editandoPortalId = portal.id;   // Guarda el ID actual para usar en PUT
    },
    // Método para enviar la actualización al backend haciendo uso del PUT
    actualizarPortal() {
      this.$axios.put('portales/' + this.editandoPortalId + '/', this.nuevoPortal)
        .then(response => {
          console.log('Portal actualizado correctamente:', response.data);
          this.ListarPortales();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al actualizar el portal:', error);
        });
    },

    // Método para eliminar un portal específico haciendo uso de DELETE
    eliminarPortal(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este portal?')) {
        this.$axios.delete('portales/' + id + '/')
          .then(() => {
            console.log('Portal eliminado');
            this.ListarPortales();
          })
          .catch(error => {
            console.error('Error al eliminar el portal:', error);
          });
      }
    },

    // Método que reinicia el formulario y sale del modo edición
    resetFormulario() {
      this.nuevoPortal = {
        nombre: '',
        ubicacion: '',
        tipo_transporte: ''
      };
      this.editandoPortalId = null;
    }
  },
  
  created() {
    this.ListarPortales();
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