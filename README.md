[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/tqGs7jxy)
# Práctica 4.8 Página dinámica en JavaScript

El objetivo de esta práctica es aplicar los fundamentos de JavaScript sobre una interfaz web con Bootstrap, trabajando la manipulación del DOM, eventos, validación de formularios e interactividad, introduciendo el uso de localStorage y buenas prácticas de organización y depuración del código.

Esta práctica sirve para encaminar la entrega del segundo proyecto trimestral evaluable del módulo de Desarrollo de Interfaces.

## Parte 1

1. Implementa un **modo oscuro** en tu página que:
    - Cambie el fondo de la página.
    - Cambie el texto del botón a “Modo Claro”.
    - Guarde la preferencia en el `localStorage`.
2.  Agrega al formulario un botón **limpiar** que borre todos los campos del formulario previamente introducidos. Al limpiarse deberá de mostrar una **notificación emergente** que no sea intrusiva (como el componente *Toast* de Bootstrap) indicando que los campos se han borrado.
3.  Agrega al menos **tres validaciones adicionales** a campos de tu formulario mediante un script, y que no hayas hecho previamente en *Bootstrap/HTML5*, mostadas de forma no intrusiva. Ejemplo de dichas validaciones:
    -   Validar que los campos no tengan números ni caracteres especiales.
    -   Verificar que al menos un checkbox esté seleccionado.
    -   Verificar un rango de fechas.
4.  Agrega un script para que al hacer clic en el botón **enviar** formulario, y todo esté verificado correctamente, se muestre otra **notificación emergente** de tipo `toast`, que no sea intrusiva, indicando que el formulario se ha enviado correctamente durante al menos 4 segundos.


## Parte 2

1. Crear un array de objetos con los datos de la tabla:
    - Genera la tabla dinámicamente desde *JS*.
    - Resaltar el lenguaje seleccionado en el formulario.

2. Al enviar correctamente el **formulario** anterior:
    - Crear un objeto JavaScript con los datos
    - Guardarlo en un array
    - Mostrar el array por consola usando: `console.table(arrayUsuarios); `

3. Coloca un **breakpoint** en una de las partes anteriores y haz una captura del *DevTools* explicando su funcionamiento.

## Parte 3

1. Escoge entre 2-3 de los siguientes apartados, para implementar interactividad a tu interfaz en JavaScript:
    - Busca el código para agregar un **reloj digital sencillo** en JavaScript en alguna parte de tu página.
    - Crea un script para que al hacer clic sobre una **imagen del carrusel** se agrande sin cerrar la galería y un botón para cambiar las imágenes del carrusel dinámicamente al clic en este.
    - Agrega a tu formulario un **selector de color**, en el que al hacer clic, cambie el color de la tabla de datos.
    - Agrega un campo para poder hacer una **búsqueda dinámica** el contenido mostrado en la tabla.

2. Por último agrega al menos 2 elementos adicionales en JavaScript por tu cuenta, que sean parecidos a los anteriores y que tengan que ver con la temática o funcionalidad de tu web.

## Valoración y testing

Para la evaluación de la práctica se tendrá en cuenta:

- Inclusión de una **tabla de pruebas** donde se documenten:
  - Funcionamiento adecuado del modo oscuro y de la persistencia mediante *localStorage*.
  - Funcionamiento correcto del botón **Limpiar** del formulario.
  - Uso de una notificación emergente no intrusiva (*Toast* de Bootstrap).
  - Envío correcto del formulario, solo permitido si todas las validaciones son correctas.
  
- **Documentación** de la web en formato *markdown* con capturas de la web y su funcionamiento.
