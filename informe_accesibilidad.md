# Taxi Transfer Tenerife
# Informe de accesibilidad

Eduardo Zuniga Alarco  
Javier Farrona Cabrera  
Gabriel Budimir Santana  
Marcos Borges Blanco

## Generales

La pagina tiene como titulo "Taxi Transfers Tenerife", y utiliza tipografia Arial, sans-serif con tamano base estandar de 1em.

### 1.1 Contraste

Se aplica una combinacion de colores con contraste suficiente para texto y componentes interactivos:

- Texto general oscuro sobre fondo claro (`#333` sobre `#f8f9fa`).
- Botones primarios en azul oscuro (`#0056b3`) con texto blanco.
- Estados de error en rojo (`#dc3545`) con fondo de apoyo (`#f8d7da`).
- Estados de exito en verde (`#198754`) con fondo de apoyo (`#e9fbe8`).

Ademas, se ha definido foco visible de alto contraste con borde naranja (`outline: 3px solid #ff9800`) para navegacion por teclado.

### Enlaces incluidos y accesibilidad

Se incluyen los siguientes enlaces para ir a distintas partes de la aplicacion:

- Inicio: lleva a la landing page.
- Reservar: lleva al formulario de reserva.
- Mis Reservas: lleva a la gestion de reservas existentes.
- Contacto: lleva al formulario de contacto.

Estos enlaces pueden ser seleccionados con la tecla Tab. Al recibir foco, muestran un indicador visible de alto contraste para que el usuario identifique claramente su posicion.

### Cambios dinamicos en la pagina y como resolver accesibilidad

Si se producen cambios dinamicos (por ejemplo, apertura/cierre del menu movil, mensajes de error o exito en formularios), se debe:

- Anunciar los cambios en una region `aria-live`.
- Actualizar atributos ARIA de estado (`aria-expanded`) en componentes desplegables.
- Mover el foco al mensaje relevante cuando sea necesario para que lector de pantalla y teclado reciban feedback inmediato.

En el prototipo actual, estas tecnicas ya se aplican mediante un anunciador accesible y mensajes de estado en formularios.

### Idioma preferente y expresiones en otro idioma

El idioma preferente de la aplicacion es espanol (`lang="es"` en el documento). Pueden aparecer expresiones en otro idioma en:

- Nombres de marca o terminos comerciales (por ejemplo, "Taxi Transfer", "Taxi Transfers Tenerife").
- Posibles etiquetas de plataformas externas (por ejemplo, nombres propios de redes sociales).

En caso de incluir fragmentos en otro idioma, se debe marcar el elemento con el atributo `lang` correspondiente para que el lector de pantalla cambie la pronunciacion correctamente.

### Componentes con cambios dinamicos

En la aplicacion se producen cambios dinamicos en:

- Menu de navegacion responsive (expandido/contraido).
- Formularios de reserva, gestion y contacto (mensajes de validacion y exito).

La tecnica aplicada para evitar problemas de accesibilidad es combinar `aria-live` para anuncios con gestion de foco en mensajes de estado, evitando que la informacion dinamica pase desapercibida.

### Adaptacion a distintos tamanos de dispositivo

Decisiones que facilitan la adaptacion responsive:

- Uso de Bootstrap 5 con sistema de rejilla fluido.
- Meta viewport configurado para moviles.
- Menu colapsable para pantallas pequenas.
- Contenedores y columnas adaptativas en formularios y tarjetas.
- Areas tactiles suficientes y espaciados consistentes.

## Estructura

### Niveles de secciones y orden de lectura

Se utiliza una jerarquia semantica clara para lectores de pantalla:

- `header` para cabecera y navegacion.
- `main` para contenido principal de cada pagina.
- `section` para bloques tematicos.
- `footer` para informacion final.
- Titulos `h1` para el tema principal y `h2`/`h3` para subsecciones.

Esta estructura permite un orden de lectura coherente y facilita la navegacion por encabezados.

### Tipos de secciones incluidas

La aplicacion incorpora:

- Encabezados globales con menu principal.
- Contenido principal por pagina (landing, formularios y contacto).
- Pie de pagina comun con informacion legal.

### Tablas

No se incluyen tablas en el prototipo actual.

### Etiquetado de secciones

El etiquetado se realiza mediante elementos HTML semanticos, encabezados y atributos ARIA cuando aplica:

- `aria-label` en navegacion y formularios para describir su proposito.
- `aria-current="page"` en el enlace activo del menu.
- `aria-required`, `aria-describedby` y `aria-invalid` en campos de formulario.

## Navegacion por teclado

### Componentes incluidos para facilitar navegacion

Se han incluido los siguientes componentes y tecnicas:

- Indicador de foco visible en enlaces, botones, inputs, textareas y select.
- Orden natural de tabulacion basado en HTML semantico.
- Boton de menu movil operable por teclado.
- Formularios completamente usables con teclado (relleno, envio, correccion).
- Mensajes de estado con foco programatico para feedback inmediato.

## 3.2 Componentes especiales

### Desplegables

Se usa el desplegable de navegacion responsive (navbar colapsable). Gestiona estado con `aria-expanded` y anuncia apertura/cierre con `aria-live`.

### Tarjetas

Se usan tarjetas informativas en la landing (destinos principales). Son contenido estatico, sin interacciones complejas, y respetan jerarquia de titulos.

### Carruseles

No se utilizan carruseles en el prototipo actual.

### Pop-ups, tooltips, alertas

No hay tooltips ni modales complejos. Se muestran mensajes dinamicos de error/exito en formularios mediante contenedores de estado accesibles. Este mecanismo cumple la funcion de alerta sin bloquear la interfaz.

### Gestion de foco y riesgo de atrapamiento

Los componentes actuales no generan foco atrapado. El unico caso con gestion especial es la notificacion de estado del formulario, a la que se mueve el foco temporalmente para su lectura.

### Tecnicas para resolver posibles problemas

Se aplican estas tecnicas:

- Uso de regiones `aria-live` para contenido dinamico.
- Actualizacion de estados ARIA en componentes interactivos.
- Foco visible y foco programatico controlado.
- Validacion con mensajes textuales claros (no solo color).

## Alternativas textuales a imagenes, videos y audios

### Imagenes decorativas

Hay una imagen decorativa en la esquina superior izquierda de un taxi al lado del nombre "Taxi Transfer Tenerife". Al ser decorativa, debe marcarse con `alt=""` y/o `aria-hidden="true"` para que no genere ruido en lector de pantalla.

### Imagenes que aportan informacion

Hay imagenes en la esquina superior derecha que indican la pagina de YouTube y la pagina de Twitter de nuestra pagina. Como aportan funcionalidad (enlace a red social), deben tener texto alternativo descriptivo o etiqueta accesible en el enlace (por ejemplo, "Ir a YouTube" y "Ir a Twitter").

### Imagenes de texto

No se contemplan imagenes de texto como mecanismo principal de informacion. El contenido textual relevante se presenta como texto HTML real.

### Graficos

No hay graficos de datos en el prototipo actual.

### Mapas

No hay mapas embebidos en el prototipo actual.

### Tecnicas para eliminar problemas

Tecnicas aplicadas o recomendadas:

- Texto alternativo adecuado segun funcion de la imagen.
- Marcar como decorativas las imagenes sin valor informativo.
- Evitar transmitir informacion solo de forma visual.
- Si hubiera multimedia futura, incluir subtitulado, transcripcion y controles accesibles.

## Audios

### Que audios hay

No hay audios en el prototipo actual.

### Tecnica AA a incorporar

Si se incorporan audios, se debe incluir como minimo:

- Transcripcion textual equivalente.
- Controles de reproduccion accesibles por teclado.
- No reproduccion automatica sin control del usuario.

## Videos

### Que videos hay

No hay videos en el prototipo actual.

### Tecnica AA a incorporar

Si se incorporan videos, se debe incluir como minimo:

- Subtitulos sincronizados.
- Alternativa textual/transcripcion.
- Controles accesibles de reproduccion y pausa.

## Formularios

### Proposito de cada campo y como lo entiende el usuario

La pagina tiene dos formularios, uno de reserva y otro de contacto.

El formulario de reserva tiene siete campos obligatorios:

- Nombre completo.
- Correo electronico.
- Telefono de contacto.
- Lugar de origen.
- Lugar de destino.
- Fecha de traslado.
- Numero de pasajeros.

Estos campos tienen el proposito de conseguir la informacion del cliente, saber el sitio al que quiere trasladarse y cuando quiere el traslado. Debajo de cada campo hay texto de ayuda que explica su cometido.

Ejemplo:

Correo electronico: "Te enviaremos la confirmacion de la reserva a este correo".

El formulario de contacto tiene tres campos obligatorios:

- Nombre completo.
- Correo electronico.
- Mensaje.

Su finalidad es identificar al usuario y disponer de un canal para responder a su consulta.

### Grupos de inputs relacionados

En el formulario de reserva se agrupan campos relacionados dentro de un `fieldset` con `legend` (detalles del viaje), mejorando comprension semantica para tecnologias de apoyo.

### Errores posibles y comunicacion al usuario

El usuario puede cometer distintos errores:

- Dejar campos obligatorios vacios.
- Introducir correo con formato incorrecto.
- Introducir telefono invalido.
- Indicar destino fuera del ambito permitido en la logica actual.
- Introducir numero de pasajeros fuera de rango.

Para advertir al usuario cuando se detecta un error:

- Se muestra un mensaje dinamico de error en la parte inferior del formulario con estilo rojo.
- Se anuncia el error por `aria-live`.
- Se marca el campo con `aria-invalid="true"` y estilo visual de error.
- Se mueve el foco al mensaje de estado para garantizar percepcion inmediata.

### Compromisos legales o financieros

La informacion enviada en el prototipo actual no implica directamente compromisos legales o financieros en la interfaz implementada. Si en futuras versiones se habilita pago o contratacion vinculante, debera incorporarse paso de confirmacion y posibilidad de revision antes del envio final.

### Tecnica AA incorporada en formularios

Se incorporan tecnicas de accesibilidad nivel AA:

- Etiquetas explicitas (`label`) asociadas a cada control.
- Indicacion de obligatoriedad y ayudas contextuales.
- Gestion de errores con texto claro y atributos ARIA.
- Feedback dinamico con `aria-live` y foco programatico.
- Navegacion completa por teclado.

## Conclusiones

El prototipo "Taxi Transfer Tenerife" aplica una base solida de accesibilidad alineada con nivel AA en sus componentes principales: estructura semantica, navegacion por teclado, contraste, gestion de foco y comunicacion de estados dinamicos.

Como mejora futura, se recomienda documentar formalmente la verificacion de contraste con herramientas automaticas y mantener el mismo nivel de exigencia al incorporar nuevos componentes (multimedia, mapas o procesos de pago).
