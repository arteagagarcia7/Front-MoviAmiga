<template>
   <!-- El main es la sesión principal del contenido de la página. -->
   <main>

        <!-- Es un elemento generalmente que tiene contenido, en este caso tiene una clase llamada "content". -->
        <div class="content">
        <!-- El h contiene los titulos y subtitulos que contendrá la página. -->
        <!-- El h1 es el encabezado más importante y de ahí van bajando a 2, 3, hasta el 6. -->
        <!-- Tiene un titulo tipo 2 con su respectivo nombre. -->
        <h2>¿Quieres contactarnos?</h2>

        </div>


        <!-- la p es una etiqueta que se usa para definir párrafos. -->
        <p>Completa el siguiente formulario para sugerencias o reclamos y pronto nos prondremos en contacto contigo.</p>

        <!-- Div class container es una clase de Bootstrap que permite que todo lo que va a tener se vea centrado-->
        <div class="container">

            <!--Este div class form-container es el que contiene el formulario-->
            <div class="form-container">
    
                <!--El form es el atributo que indica que es un formulario y el id registro-form es como se va a identificar este formulario en el código-->
                <form id="contactenos-form">

                    <!-- Este div class mb-3 es una clase de bootstrap que permite que el texto y cada uno de los elementos tengan espacio entre ellos y no se peguen -->
                    <div class="mb-3 text-center">
         
                        <!--Este div class mb-3 es una clase de bootstrap que permite que el texto y cada uno de los elementos tengan espacio entre ellos y no se peguen -->
                        <!--Aquí se encuentran los otros aspectos del formulario-->
                        <div class="mb-3">
                            <label for="nombres" class="form-label">Nombres</label>
                            <input type="text" class="form-control" id="nombres" name="nombres" required>
                        </div>

                        <div class="mb-3">
                            <label for="apellidos" class="form-label">Apellidos</label>
                            <input type="text" class="form-control" id="apellidos" name="apellidos" required>
                        </div>


                        <div class="mb-3">
                            <label for="email" class="form-label">Correo Electronico</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>

                        <div class="mb-3">
                            <label for="number" class="form-label">Celular</label>
                            <input type="number" class="form-control" id="number" name="number" required>
                        </div>

                        <div class="mb-3">
                            <label for="message" class="form-label">Mensaje:</label>
                            <input type="text" class="form-control" id="message" name="message" required>
                        </div>

                        <a href="InicioSesion.html">
                            <!--Button es una etiqueta que indica que es un botón, en este caso el dipo de botón es de enviar el formulario y la clase indica que es un botón y es un estilo ya predefinido de bootstrap. -->
                            <button type="button" class="btn btn-primary">Enviar</button>
                        </a>
                    </div>
        
                </form>
            </div>
        </div>  

    </main>
</template>
  
  
<script>
    
</script>
  
  
<style scoped>
  
</style>