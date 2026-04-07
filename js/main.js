// main.js
// Script principal del proyecto:
// - Gestiona anuncios accesibles para lectores de pantalla.
// - Valida formularios de reserva y consulta.
// - Muestra mensajes de estado con foco programático.

document.addEventListener('DOMContentLoaded', () => {
    const BOOKING_STORAGE_KEY = 'taxiTransferBookings';

    // Referencias a elementos del menú responsive de Bootstrap.
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');

    // Sincroniza aria-expanded con el estado real del menú colapsable.
    if (navbarToggler && navbarCollapse) {
        navbarCollapse.addEventListener('shown.bs.collapse', () => {
            navbarToggler.setAttribute('aria-expanded', 'true');
            announceToScreenReader('Menú de navegación expandido');
        });

        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            navbarToggler.setAttribute('aria-expanded', 'false');
            announceToScreenReader('Menú de navegación contraído');
        });
    }

    // Crea (si no existe) una región aria-live para anunciar cambios no visuales.
    function announceToScreenReader(message) {
        let announcer = document.getElementById('aria-announcer');

        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'aria-announcer';
            announcer.setAttribute('aria-live', 'polite');

            // Oculta visualmente el nodo sin retirarlo del árbol de accesibilidad.
            announcer.style.position = 'absolute';
            announcer.style.width = '1px';
            announcer.style.height = '1px';
            announcer.style.padding = '0';
            announcer.style.margin = '-1px';
            announcer.style.overflow = 'hidden';
            announcer.style.clip = 'rect(0,0,0,0)';
            announcer.style.border = '0';

            document.body.appendChild(announcer);
        }

        announcer.textContent = message;
    }

    function validateBookingData(data) {
        if (!data.nombre) {
            return { valid: false, errorMsg: 'El nombre es obligatorio.', invalidField: 'nombre' };
        }

        if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
            return { valid: false, errorMsg: 'Introduce un correo electrónico válido.', invalidField: 'email' };
        }

        if (!data.telefono || !/^\d{9,15}$/.test(data.telefono)) {
            return { valid: false, errorMsg: 'Introduce un teléfono válido (solo dígitos, 9-15 números).', invalidField: 'telefono' };
        }

        if (!data.origen) {
            return { valid: false, errorMsg: 'Selecciona el lugar de origen.', invalidField: 'origen' };
        }

        if (!data.destino) {
            return { valid: false, errorMsg: 'El destino es obligatorio.', invalidField: 'destino' };
        }

        if (!/(tenerife|adeje|arona)/i.test(data.destino)) {
            return { valid: false, errorMsg: 'Solo se permiten destinos en Tenerife, Adeje o Arona.', invalidField: 'destino' };
        }

        if (!data.fecha) {
            return { valid: false, errorMsg: 'Selecciona la fecha del traslado.', invalidField: 'fecha' };
        }

        if (!data.hora || !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.hora)) {
            return { valid: false, errorMsg: 'Selecciona una hora válida para el traslado.', invalidField: 'hora' };
        }

        if (!data.pasajeros || data.pasajeros < 1 || data.pasajeros > 8) {
            return { valid: false, errorMsg: 'El número de pasajeros debe estar entre 1 y 8.', invalidField: 'pasajeros' };
        }

        return { valid: true, errorMsg: null, invalidField: null };
    }

    function getStoredBookings() {
        try {
            const stored = localStorage.getItem(BOOKING_STORAGE_KEY);
            const bookings = stored ? JSON.parse(stored) : [];
            return Array.isArray(bookings) ? bookings : [];
        } catch (error) {
            return [];
        }
    }

    function saveStoredBookings(bookings) {
        try {
            localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings));
            return true;
        } catch (error) {
            return false;
        }
    }

    function generateBookingCode(existingBookings) {
        let code = '';

        do {
            code = `TX-${Math.floor(10000 + Math.random() * 90000)}`;
        } while (existingBookings.some((booking) => booking.codigo_reserva === code));

        return code;
    }

    function createBookingRecord(data) {
        const bookings = getStoredBookings();
        const booking = {
            codigo_reserva: generateBookingCode(bookings),
            nombre: data.nombre,
            email: data.email,
            telefono: data.telefono,
            origen: data.origen,
            destino: data.destino,
            fecha: data.fecha,
            hora: data.hora,
            pasajeros: data.pasajeros
        };

        bookings.push(booking);

        if (!saveStoredBookings(bookings)) {
            return null;
        }

        return booking;
    }

    function normalizeEmail(email) {
        return email.trim().toLowerCase();
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatBookingDate(dateString) {
        const date = new Date(`${dateString}T00:00:00`);

        if (Number.isNaN(date.getTime())) {
            return dateString;
        }

        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(date);
    }

    function formatBookingTime(timeString) {
        const [hours, minutes] = timeString.split(':');

        if (hours === undefined || minutes === undefined) {
            return timeString;
        }

        return `${hours}:${minutes} h`;
    }

    function renderBookingDetails(container, booking) {
        if (!container) {
            return;
        }

        container.innerHTML = `
            <article class="card border-success shadow-sm" tabindex="-1">
                <div class="card-body">
                    <h2 class="h4 card-title mb-3">Reserva ${escapeHtml(booking.codigo_reserva)}</h2>
                    <p class="mb-2"><strong>Nombre:</strong> ${escapeHtml(booking.nombre)}</p>
                    <p class="mb-2"><strong>Correo electrónico:</strong> ${escapeHtml(booking.email)}</p>
                    <p class="mb-2"><strong>Teléfono:</strong> ${escapeHtml(booking.telefono)}</p>
                    <p class="mb-2"><strong>Origen:</strong> ${escapeHtml(booking.origen)}</p>
                    <p class="mb-2"><strong>Destino:</strong> ${escapeHtml(booking.destino)}</p>
                    <p class="mb-2"><strong>Fecha:</strong> ${escapeHtml(formatBookingDate(booking.fecha))}</p>
                    <p class="mb-2"><strong>Hora:</strong> ${escapeHtml(formatBookingTime(booking.hora))}</p>
                    <p class="mb-0"><strong>Pasajeros:</strong> ${escapeHtml(booking.pasajeros)}</p>
                </div>
            </article>
        `;

        const card = container.querySelector('article');
        if (card) {
            card.focus();
        }
    }

    // Formulario de reserva (booking.html).
    // Se valida secuencialmente y se detiene en el primer error detectado.
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = {
                nombre: bookingForm.nombre.value.trim(),
                email: normalizeEmail(bookingForm.email.value),
                telefono: bookingForm.telefono.value.trim(),
                origen: bookingForm.origen.value,
                destino: bookingForm.destino.value.trim(),
                fecha: bookingForm.fecha.value,
                hora: bookingForm.hora.value,
                pasajeros: Number.parseInt(bookingForm.pasajeros.value, 10)
            };
            const validation = validateBookingData(formData);
            const fields = ['nombre', 'email', 'telefono', 'origen', 'destino', 'fecha', 'hora', 'pasajeros'];

            fields.forEach((fieldName) => {
                if (fieldName === validation.invalidField) {
                    bookingForm[fieldName].setAttribute('aria-invalid', 'true');
                } else {
                    bookingForm[fieldName].removeAttribute('aria-invalid');
                }
            });

            if (validation.valid) {
                const booking = createBookingRecord(formData);

                if (!booking) {
                    const storageErrorMsg = 'No se pudo guardar la reserva en este dispositivo. Inténtalo de nuevo.';
                    announceToScreenReader(storageErrorMsg);
                    showFormStatus(bookingForm, storageErrorMsg, false);
                    return;
                }

                const successMsg = `Reserva realizada con éxito. Tu código es ${booking.codigo_reserva}.`;
                announceToScreenReader(successMsg);
                showFormStatus(bookingForm, successMsg, true);
                bookingForm.reset();
                return;
            }

            announceToScreenReader(validation.errorMsg);
            showFormStatus(bookingForm, validation.errorMsg, false);
        });
    }

    // Formulario de gestión de reservas (manage-booking.html).
    // Valida presencia de código y email antes de simular búsqueda.
    const manageForm = document.getElementById('manage-form');
    if (manageForm) {
        manageForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const codigo = manageForm.codigo_reserva.value.trim().toUpperCase();
            const email = normalizeEmail(manageForm.email_reserva.value);
            const resultContainer = document.getElementById('resultado-reserva');
            let valid = true;
            let errorMsg = '';

            if (!codigo || !email) {
                valid = false;
                errorMsg = 'Introduce el código de reserva y el correo electrónico.';
            }

            if (!codigo) {
                manageForm.codigo_reserva.setAttribute('aria-invalid', 'true');
            } else {
                manageForm.codigo_reserva.removeAttribute('aria-invalid');
            }

            if (!email) {
                manageForm.email_reserva.setAttribute('aria-invalid', 'true');
            } else {
                manageForm.email_reserva.removeAttribute('aria-invalid');
            }

            if (valid) {
                const booking = getStoredBookings().find((storedBooking) => (
                    storedBooking.codigo_reserva === codigo && normalizeEmail(storedBooking.email) === email
                ));

                if (!booking) {
                    errorMsg = 'No se ha encontrado una reserva con ese código y correo electrónico.';
                    announceToScreenReader(errorMsg);
                    showFormStatus(manageForm, errorMsg, false);

                    if (resultContainer) {
                        resultContainer.innerHTML = '';
                    }

                    return;
                }

                const successMsg = 'Reserva encontrada. Mostrando detalles.';
                announceToScreenReader(successMsg);
                showFormStatus(manageForm, successMsg, true);
                renderBookingDetails(resultContainer, booking);
                manageForm.reset();
                return;
            }

            announceToScreenReader(errorMsg);
            showFormStatus(manageForm, errorMsg, false);

            if (resultContainer) {
                resultContainer.innerHTML = '';
            }
        });
    }

    // Inserta o reutiliza un contenedor de estado dentro del formulario.
    // Además, mueve el foco al mensaje para lectura inmediata por teclado/lector.
    function showFormStatus(form, message, success) {
        let status = form.querySelector('.form-status');

        if (!status) {
            status = document.createElement('div');
            status.className = 'form-status mt-3';
            status.setAttribute('aria-live', 'assertive');
            status.setAttribute('tabindex', '-1');
            form.appendChild(status);
        }

        status.textContent = message;
        status.style.color = success ? '#198754' : '#dc3545';
        status.style.backgroundColor = success ? '#e9fbe8' : '#f8d7da';
        status.style.padding = '0.5em 1em';
        status.style.borderRadius = '0.25em';
        status.style.marginTop = '1em';
        status.focus();
    }
});