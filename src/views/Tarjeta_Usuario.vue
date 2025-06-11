<template>
  <div class="container my-4">
    <!-- Título principal -->
    <h2 class="mb-4">Tarjetas Registradas</h2>

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
              <label for="saldo_actual" class="form-label">Saldo Acual</label>
              <input type="number" class="form-control" id="saldo_actual" v-model="nuevaTarjeta.saldo_actual" required>
            </div>

            <div class="mb-3">
              <label for="numero_tarjeta" class="form-label">Numero de Tarjeta Registrada</label>
              <input type="number" class="form-control" id="numero_tarjeta" v-model="nuevaTarjeta.numero_tarjeta" required>
            </div>


            <!-- Botones para agregar una tarjeta y cuando se seleccione el editar de abajo trae el id para actualizar los datos y con el ID se activa el boton de actualizar -->
            <div>
              <button type="button" class="btn btn-primary me-2" @click="agregarTarjeta" v-if="!editandoTarjetaId">Agregar</button>
              <button type="button" class="btn btn-success" @click="actualizarTarjeta" v-else>Actualizar</button>
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
            <th>Saldo Actual</th> <!-- Saldo Actual -->
            <th>Número de Tarjeta Registrada</th> <!-- Numero de tarjeta -->
            <th>Acciones</th>   
          </tr>
        </thead>

        <tbody>
          <!-- Iteramos sobre cada tarjeta recibida desde el backend -->
          <tr v-for="tarjeta in arrayTarjetas" :key="tarjeta.id">
            <td>{{ tarjeta.saldo_actual }}</td>
            <td>{{ tarjeta.numero_tarjeta }}</td>
            <!-- Botones para editar y eliminar -->
            <td>
              <!-- Botón que llena el formulario con los datos de la tarjeta para editar -->
              <button class="btn btn-sm btn-warning me-2" @click="editarTarjeta(tarjeta)">Editar</button>
              <!-- Botón para eliminar la tarjeta -->
              <button class="btn btn-sm btn-danger" @click="eliminarTarjeta(tarjeta.id)">Eliminar</button>
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
      // Aquí se almacenará el arreglo de tarjetas traído desde la API
      arrayTarjetas: [],
      // Objeto que almacena los datos de la nueva tarjeta a registrar o editar
      nuevaTarjeta: {
        saldo_actual: '',
        numero_tarjeta: ''
      },
      // Este ID se usará para identificar si se está editando una tarjeta y que se active el boton de actualizar
      editandoTarjetaId: null
    };
  },
  methods: {
    // Método que se ejecuta para obtener los datos de las tarjetas desde el backend usando GET
    ListarTarjetas() {
      this.$axios.get('tarjeta_usuario/')
        .then(response => {
          this.arrayTarjetas = response.data;
          console.log('Datos de tarjetas recibidas:', this.arrayTarjetas);
        })
        .catch(error => {
          console.error('Error al obtener las tarjetas:', error);
        });
    },
    // Método para agregar una nueva tarjeta al backend usando POST
    agregarTarjeta() {
      this.$axios.post('tarjeta_usuario/', this.nuevaTarjeta)
        .then(response => {
          console.log('Tarjeta agregada correctamente:', response.data);
          this.ListarTarjetas();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al agregar la tarjeta:', error);
        });
    },
    // Método que se activa cuando se da clic en el boton de editar y es para traer los datos de una tarjeta y colocarlos en el formulario para poderlos editar
    editarTarjeta(tarjeta) {
      this.nuevaTarjeta = { ...tarjeta }; // Copi todos los datos de la tarjeta del ID seleccionado
      this.editandoTarjetaId = tarjeta.id;   // Guarda el ID actual para usar en PUT
    },
    // Método para enviar la actualización al backend haciendo uso del PUT
    actualizarTarjeta() {
      this.$axios.put('tarjeta_usuario/' + this.editandoTarjetaId + '/', this.nuevaTarjeta)
        .then(response => {
          console.log('Tarjeta actualizada correctamente:', response.data);
          this.ListarTarjetas();
          this.resetFormulario();
        })
        .catch(error => {
          console.error('Error al actualizar la tarjeta:', error);
        });
    },

    // Método para eliminar una tarjeta específica haciendo uso de DELETE
    eliminarTarjeta(id) {
      if (confirm('¿Estás seguro de que deseas eliminar esta tarjeta?')) {
        this.$axios.delete('tarjeta_usuario/' + id + '/')
          .then(() => {
            console.log('Tarjeta eliminada');
            this.ListarTarjetas();
          })
          .catch(error => {
            console.error('Error al eliminar la tarjeta:', error);
          });
      }
    },

    // Método que reinicia el formulario y sale del modo edición
    resetFormulario() {
      this.nuevaTarjeta = {
        saldo_actual: '',
        numero_tarjeta: ''
      };
      this.editandoTarjetaId = null;
    }
  },
  
  created() {
    this.ListarTarjetas();
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