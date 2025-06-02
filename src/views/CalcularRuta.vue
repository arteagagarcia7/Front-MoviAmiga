<template>
    <div class="container mt-4">
        <h2 class="mb-4">Calcula la mejor ruta a tu destino.</h2>
        <h3 class="mb-4">Ingresa tu lugar de origen y el de destino, nos encargaremos de encontrar la ruta que sea más apropiada y con la que puedes ahorrar tiempo.</h3>

        <!-- Espacio para poder ingresar el punto de inicio -->
        <div class="mb-3">
            <input
                id="origen"
                class="form-control"
                type="text"
                placeholder="Punto de partida"
            />
        </div>

        <!-- Espacio para poder ingresar el punto de llegada -->
        <div class="mb-3">
            <input
                id="destino"
                class="form-control"
                type="text"
                placeholder="Destino"
            />
        </div>

        <!-- Botón para calcular la ruta -->
        <button class="btn btn-success mb-3" @click="calcularRuta">
            Calcular Ruta
        </button>

        <!-- Contenedor del mapa, falta enlazar con google maps y en scrips poner el código correspondiente -->
        <div id="map" style="height: 500px; width: 100%;"></div>
    </div>
</template>

<script>
</script>

<style scoped>
    /* Estilos para el mapa */
    #map {
        border: 1px solid #ccc;
        border-radius: 8px;
    }
</style>