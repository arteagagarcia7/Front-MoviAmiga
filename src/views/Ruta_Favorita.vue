<template>
  <div class="container my-4">
    <!-- Título principal -->
    <h2 class="mb-4">Tus Rutas Favoritas</h2>

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
              <label for="nombre" class="form-label">Nombre de la ruta</label>
              <input type="text" class="form-control" id="nombre" v-model="nuevaRuta_Favorita.nombre" required>
            </div>
            
            <div class="mb-3">
              <label for="punto_inicial" class="form-label">Punto Inicial</label>
              <input type="text" class="form-control" id="punto_inicial" v-model="nuevaRuta_Favorita.Punto_Inicial" required>
            </div>

            <div class="mb-3">
              <label for="punto_final" class="form-label">Punto Final</label>
              <input type="text" class="form-control" id="punto_final" v-model="nuevaRuta_Favorita.Punto_Final" required>
            </div>


            <!-- Botones para agregar una Ruta Favorita y cuando se seleccione el editar de abajo trae el id para actualizar los datos y con el ID se activa el boton de actualizar -->
            <div>
              <button type="button" class="btn btn-primary me-2" @click="agregarRuta_Favorita" v-if="!editandoRuta_FavoritaId">Agregar</button>
              <button type="button" class="btn btn-success" @click="actualizarRuta_Favorita" v-else>Actualizar</button>
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
            <th>Nombre de la Ruta</th> <!-- Nombre de Ruta Favorita -->
            <th>Punto Inicial</th> <!-- Punto de inicio -->
            <th>Punto Final</th> <!-- Punto de llegada -->   
          </tr>
        </thead>

        <tbody>
          <!-- Iteramos sobre cada Ruta Favorita recibida desde el backend -->
          <tr v-for="Ruta_Favorita in arrayRuta_Favoritas" :key="Ruta_Favorita.id">
            <td>{{ Ruta_Favorita.nombre }}</td>
            <td>{{ Ruta_Favorita.Punto_Inicial }}</td>
            <td>{{ Ruta_Favorita.Punto_Final }}</td>
            <!-- Botones para editar y eliminar -->
            <td>
              <!-- Botón que llena el formulario con los datos de la Ruta Favorita para editar -->
              <button class="btn btn-sm btn-warning me-2" @click="editarRuta_Favorita(Ruta_Favorita)">Editar</button>
              <!-- Botón para eliminar la Ruta Favorita -->
              <button class="btn btn-sm btn-danger" @click="eliminarRuta_Favorita(Ruta_Favorita.id)">Eliminar</button>
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
      // Aquí se almacenará el arreglo de las Ruta Favorita traidas desde la API
      arrayRuta_Favoritas: [],
      // Objeto que almacena los datos de la Ruta Favorita a registrar o editar
      nuevaRuta_Favorita: {
        nombre: '',
        Punto_Inicial: '',
        Punto_Final: ''
      },
      // Este ID se usará para identificar si se está editando una Ruta Favorita y que se active el boton de actualizar
      editandoRuta_FavoritaId: null
    };
  },
  methods: {
    // Método que se ejecuta para obtener los datos de las Rutas Favoritas desde el backend usando GET
    ListarRutas_Favoritas() {
      this.$axios.get('ruta_favorita/')
        .then(response => {
          this.arrayRuta_Favoritas = response.data;
          console.log('Datos de rutas favoritas recibidas:', this.arrayRuta_Favoritas);
        })
        .catch(error => {
          console.error('Error al obtener las rutas favoritas:', error);
        });
    },
    // Método para agregar una nueva Ruta Favorita al backend usando POST
    agregarRuta_Favorita() {
      this.$axios.post('ruta_favorita/', this.nuevaRuta_Favorita)
        .then(response => {
          console.log('Ruta Favorita agregada correctamente:', response.data);
          this.ListarRutas_Favoritas();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al agregar la ruta favorita:', error);
        });
    },
    // Método que se activa cuando se da clic en el boton de editar y es para traer los datos de una Ruta Favorita y colocarlos en el formulario para poderlos editar
    editarRuta_Favorita(Ruta_Favorita) {
      this.nuevaRuta_Favorita = { ...Ruta_Favorita }; // Copia todos los datos de la Ruta Favorita del ID seleccionado
      this.editandoRuta_FavoritaId = Ruta_Favorita.id;   // Guarda el ID actual para usar en PUT
    },
    // Método para enviar la actualización al backend haciendo uso del PUT
    actualizarRuta_Favorita() {
      this.$axios.put('ruta_favorita/' + this.editandoRuta_FavoritaId + '/', this.nuevaRuta_Favorita)
        .then(response => {
          console.log('Ruta favorita actualizada correctamente:', response.data);
          this.ListarRutas_Favoritas();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al actualizar la ruta favorita:', error);
        });
    },

    // Método para eliminar una Ruta Favorita específico haciendo uso de DELETE
    eliminarRuta_Favorita(id) {
      if (confirm('¿Estás seguro de que deseas eliminar esta ruta favorita?')) {
        this.$axios.delete('ruta_favorita/' + id + '/')
          .then(() => {
            console.log('Ruta favorita eliminada');
            this.ListarRutas_Favoritas();
          })
          .catch(error => {
            console.error('Error al eliminar la ruta favorita:', error);
          });
      }
    },

    // Método que reinicia el formulario y sale del modo edición
    resetFormulario() {
      this.nuevaRuta_Favorita = {
        nombre: '',
        Punto_Inicial: '',
        Punto_Final: ''
      };
      this.editandoRuta_FavoritaId = null;
    }
  },
  
  created() {
    this.ListarRutas_Favoritas();
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