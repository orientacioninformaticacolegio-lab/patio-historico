PATIO HISTÓRICO — COLEGIO DEL URUGUAY
======================================

ESTRUCTURA DEL PROYECTO
-----------------------

index.html
    Portada, galería general, filtros y línea de tiempo.

arbol.html
    Plantilla utilizada para mostrar la ficha de cada especie.

app.js
    Carga los datos, genera las tarjetas y construye las fichas individuales.

styles.css
    Contiene todos los estilos visuales y las reglas responsive.

data/arboles.json
    Base de datos de las especies. Este es el archivo principal para corregir
    textos, agregar fotografías o incorporar nuevos ejemplares.

assets/img/
    Escudo, sello e imágenes del proyecto.

MODIFICAR UNA ESPECIE
---------------------

1. Abrir data/arboles.json con un editor de texto o código.
2. Buscar el campo "id" o el nombre de la especie.
3. Modificar los datos necesarios sin eliminar comas ni comillas.
4. Guardar el archivo y volver a cargar el sitio.

AGREGAR UNA ESPECIE
-------------------

1. Copiar uno de los objetos completos de data/arboles.json.
2. Separarlo del anterior con una coma.
3. Cambiar el campo "id" por un identificador único, en minúsculas y sin espacios.
4. Completar los textos y las rutas de las fotografías.

PRUEBA LOCAL
------------

Por seguridad, algunos navegadores no permiten cargar el archivo JSON al abrir
index.html directamente. Para probar el sitio, iniciar un servidor local dentro
de la carpeta del proyecto. Con Python instalado:

    python -m http.server 8000

Luego abrir:

    http://localhost:8000

PUBLICACIÓN EN GITHUB PAGES
---------------------------

Subir el contenido completo de esta carpeta a un repositorio y activar GitHub
Pages desde la configuración del repositorio, publicando desde la rama principal.


ESTRUCTURA DEL CONTENIDO
------------------------
Cada especie se administra desde data/arboles.json.

Campos principales:
- informacionPrincipal: introducción breve, siempre visible en la ficha y en la tarjeta.
- descripcion: características generales del ejemplar.
- floresYFrutos: información sobre floración, frutos y semillas.
- usos: usos y valor ornamental, forestal o cultural.
- historia: información histórica vinculada con el Colegio. Es opcional; si no está definido, el cuadro histórico no se muestra.
- conservacion, observacion y curiosidad: campos opcionales que generan secciones solo cuando contienen información.
- fotos: lista de imágenes de la especie.

Para ocultar una sección opcional, basta con eliminar el campo correspondiente del objeto JSON o dejarlo vacío.

GENERACIÓN DE CÓDIGOS QR
------------------------

El archivo qr.html es una herramienta administrativa y no está enlazado desde la portada.
Para abrirlo, escriba su dirección directamente después de publicar el proyecto:

    https://dominio-o-cuenta/ruta-del-proyecto/qr.html

La página detecta automáticamente la ubicación donde está alojado el proyecto y genera un
código para cada ficha con una dirección de este tipo:

    arbol.html?id=nombre-de-la-especie

Antes de imprimir, se puede corregir manualmente la dirección base. Esto permite trasladar
el mismo proyecto a GitHub Pages, otro hosting o un dominio propio sin modificar el código.

En impresión A4 se genera una grilla de cuatro columnas. Cada código QR mide exactamente
4 x 4 cm y lleva el nombre de la especie debajo. Las líneas punteadas sirven como guía de corte.

IMPORTANTE: los códigos se obtienen mediante un servicio web al abrir qr.html, por lo cual
se requiere conexión a Internet al momento de generarlos e imprimirlos.
