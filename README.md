# Taxi Transfer Tenerife

Prototipo web de una aplicacion de reservas de traslados en taxi en Tenerife. El proyecto esta orientado a usabilidad, accesibilidad y una experiencia completa en cliente sin backend.

## Descripcion

La aplicacion simula el flujo principal de una central de traslados:

- crear una reserva desde un formulario
- calcular una combinacion de taxis en funcion del numero de pasajeros
- mostrar un resumen dinamico de precio con impuestos y extras
- confirmar la reserva en un modal previo al pago
- completar un pago simulado en una pasarela inline
- guardar la reserva en el navegador con `localStorage`
- recuperar, editar o cancelar una reserva existente desde la pagina de gestion

Todo funciona en cliente. No hay backend, base de datos remota ni pasarela de pago real.

## Paginas incluidas

| Pagina | Archivo | Funcion |
| --- | --- | --- |
| Inicio | `index.html` | Landing principal con informacion del servicio y accesos rapidos |
| Reservar | `booking.html` | Formulario de reserva con seleccion de taxis, resumen de precio y pago inline |
| Mis Reservas | `manage-booking.html` | Busqueda, edicion y cancelacion de reservas guardadas |
| Contacto | `contact.html` | Informacion de contacto y formulario visual de consulta |
| Pago | `payment.html` | Pantalla legacy de pago, mantenida dentro del prototipo |

## Funcionalidad implementada

### Reserva de traslados

El formulario de reserva solicita:

- nombre completo
- correo electronico
- telefono
- origen
- destino
- fecha
- hora
- numero de pasajeros
- extras opcionales
- peticiones especiales

Ademas, incorpora una seccion de taxis con dos modos:

- modo automatico recomendado: calcula la mejor combinacion disponible
- modo manual: permite elegir cantidades de Taxi 1, Taxi 2 y Taxi 3

Al enviar el formulario:

- se validan los datos en cliente
- se calcula la combinacion recomendada y la seleccion activa
- se muestra un modal de confirmacion con resumen del pasajero, traslado, taxis y precio
- se abre una pasarela de pago inline en otro modal
- tras el pago, se genera un codigo de reserva con formato `TX-12345`
- la reserva se guarda en `localStorage` con la clave `taxiTransferBookings`

### Calculo de precio

El precio estimado se construye a partir de:

- coste base del trayecto segun destino
- numero total de taxis solicitados
- coste adicional por tipo de taxi
- extras opcionales
- IGIC del 7%

Regla actual de negocio:

- el coste del trayecto se multiplica por el numero total de taxis, independientemente del tipo
- el recargo propio de cada tipo de taxi se suma aparte

### Gestion de reservas

La pagina Mis Reservas permite localizar una reserva guardada usando:

- codigo de reserva
- correo electronico

Si la reserva existe, se muestra una tarjeta con el detalle completo y dos acciones:

- editar fecha, hora y pasajeros
- cancelar la reserva

Al cancelar:

- la reserva se elimina del almacenamiento local
- se abre el cliente de correo del usuario mediante `mailto:`
- el correo se rellena automaticamente para solicitar el reembolso a la empresa

### Tema e idioma

La interfaz incluye:

- modo claro y oscuro
- cambio de idioma espanol / ingles
- textos de formularios, modales y resumen de precio adaptados al idioma activo

## Validaciones actuales

La validacion implementada comprueba:

- nombre obligatorio
- email con formato valido
- telefono de 9 a 15 digitos
- origen obligatorio
- destino obligatorio
- fecha obligatoria
- hora obligatoria
- pasajeros entre 1 y 40
- datos de tarjeta con formato valido en el modal de pago
- en modo manual, la seleccion de taxis debe cubrir a todos los pasajeros

Las validaciones estan presentes tanto en la logica principal como en los modulos probados con Jest.

## Accesibilidad

El prototipo incorpora medidas de accesibilidad como:

- estructura semantica con `header`, `main`, `section`, `aside` y `footer`
- atributos ARIA en formularios, navegacion y modales
- mensajes dinamicos anunciados con `aria-live`
- modales con cierre manual para evitar cierres accidentales
- navegacion por teclado
- diseno responsive con Bootstrap 5

## Tecnologias

- HTML5
- CSS3
- Bootstrap 5
- JavaScript vanilla
- Jest para pruebas unitarias

## Como usarlo

### Instalar dependencias

```bash
npm install
```

### Ejecutar pruebas

```bash
npm test
```

## Limitaciones actuales

- no existe backend real
- las reservas solo se guardan en el navegador actual
- el pago es simulado y no procesa transacciones reales
- la cancelacion abre un cliente de correo local, por lo que depende de que el usuario tenga uno configurado
- el formulario de contacto no envia datos a un servicio externo

## Archivos clave

- `js/main.js`: logica principal de la app, i18n, tema, flujo de reserva, modales, pago inline y gestion de reservas
- `js/taxiPlanner.js`: calculo de combinaciones de taxis
- `js/pricing.js`: calculo de precio del trayecto, extras, recargos e IGIC
- `js/bookingValidation.js`: modulo aislado de validacion de datos de reserva
- `js/bookingValidation.test.js`: pruebas unitarias de validacion
- `js/taxiPlanner.test.js`: pruebas del planificador de taxis
- `js/pricing.test.js`: pruebas del calculo de precios