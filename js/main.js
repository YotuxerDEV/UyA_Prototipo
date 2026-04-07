// main.js
// Script principal del proyecto:
// - Gestiona anuncios accesibles para lectores de pantalla.
// - Valida formularios de reserva y consulta.
// - Permite modo oscuro y cambio de idioma ES/EN en todas las paginas.

document.addEventListener('DOMContentLoaded', () => {
    const BOOKING_STORAGE_KEY = 'taxiTransferBookings';
    const THEME_STORAGE_KEY = 'taxiTheme';
    const LANG_STORAGE_KEY = 'taxiLang';

    const translations = {
        es: {
            brand: 'Taxi Transfer Tenerife',
            'nav.home': 'Inicio',
            'nav.book': 'Reservar',
            'nav.manage': 'Mis Reservas',
            'nav.contact': 'Contacto',
            'controls.dark': 'Modo oscuro',
            'controls.light': 'Modo claro',
            'footer.rights': '\u00A9 2026 Taxi Transfer TFS. Todos los derechos reservados.',

            'home.hero.title': 'Traslados desde el Aeropuerto de Tenerife Sur',
            'home.hero.subtitle': 'Reserva tu taxi oficial al mejor precio. Viaja seguro y sin esperas a cualquier punto de la isla.',
            'home.hero.cta': 'Reserva tu traslado ahora',
            'home.destinations.title': 'Nuestros Destinos Principales',
            'home.destinations.adeje.title': 'Costa Adeje',
            'home.destinations.adeje.text': 'Llega a tu hotel en el sur en menos de 20 minutos.',
            'home.destinations.cristianos.title': 'Los Cristianos',
            'home.destinations.cristianos.text': 'Traslados directos y confortables a la zona turistica.',
            'home.destinations.santacruz.title': 'Santa Cruz de Tenerife',
            'home.destinations.santacruz.text': 'Viaja a la capital o al puerto con total seguridad.',

            'booking.title': 'Solicitud de Reserva',
            'booking.subtitle': 'Por favor, completa el siguiente formulario para reservar tu traslado en taxi desde el Aeropuerto de Tenerife Sur.',
            'booking.legend': 'Detalles del Viaje',
            'booking.fields.name': 'Nombre Completo',
            'booking.fields.email': 'Correo Electronico',
            'booking.fields.phone': 'Telefono de Contacto',
            'booking.fields.origin': 'Lugar de Origen',
            'booking.fields.destination': 'Lugar de Destino',
            'booking.fields.date': 'Fecha del Traslado',
            'booking.fields.time': 'Hora del Traslado',
            'booking.fields.passengers': 'Numero de Pasajeros',
            'booking.placeholders.name': 'Ej. Juan Perez',
            'booking.placeholders.email': 'Ej. juan@email.com',
            'booking.placeholders.phone': 'Ej. 600123456',
            'booking.placeholders.destination': 'Ej. Hotel Costa Adeje',
            'booking.help.name': 'Introduce tu nombre y apellidos.',
            'booking.help.email': 'Te enviaremos la confirmacion de la reserva a este correo.',
            'booking.help.phone': 'Incluye tu numero para avisos importantes (solo digitos, sin espacios).',
            'booking.help.destination': 'Indica el nombre del hotel, municipio o direccion exacta.',
            'booking.help.date': 'Selecciona el dia previsto para el servicio.',
            'booking.help.time': 'Indica la hora de recogida o llegada prevista.',
            'booking.origin.placeholder': 'Selecciona un origen...',
            'booking.origin.tfs': 'Aeropuerto Tenerife Sur (TFS)',
            'booking.origin.tfn': 'Aeropuerto Tenerife Norte (TFN)',
            'booking.origin.gcxo': 'Aeropuerto de La Gomera (GCXO)',
            'booking.submit': 'Confirmar Reserva',

            'manage.title': 'Mis Reservas',
            'manage.subtitle': 'Introduce tu codigo de reserva y correo electronico para consultar o gestionar tu viaje.',
            'manage.fields.code': 'Codigo de Reserva',
            'manage.fields.email': 'Correo Electronico',
            'manage.placeholders.code': 'Ej. TX-12345',
            'manage.placeholders.email': 'correo@ejemplo.com',
            'manage.submit': 'Buscar Reserva',

            'contact.title': 'Contacto y Soporte',
            'contact.subtitle': 'Tienes alguna duda o necesitas asistencia con tu reserva? Estamos aqui para ayudarte.',
            'contact.info.addressLabel': 'Direccion',
            'contact.info.addressValue': 'Aeropuerto de Tenerife Sur, Granadilla de Abona, 38610',
            'contact.info.phoneLabel': 'Telefono',
            'contact.info.emailLabel': 'Email',
            'contact.form.title': 'Envia un mensaje',
            'contact.form.name': 'Nombre Completo',
            'contact.form.email': 'Correo Electronico',
            'contact.form.emailHelp': 'No compartiremos tu correo con nadie mas.',
            'contact.form.message': 'Mensaje',
            'contact.form.submit': 'Enviar Mensaje',

            'announce.nav.expanded': 'Menu de navegacion expandido',
            'announce.nav.collapsed': 'Menu de navegacion contraido',

            'validation.nameRequired': 'El nombre es obligatorio.',
            'validation.emailInvalid': 'Introduce un correo electronico valido.',
            'validation.phoneInvalid': 'Introduce un telefono valido (solo digitos, 9-15 numeros).',
            'validation.originRequired': 'Selecciona el lugar de origen.',
            'validation.destinationRequired': 'El destino es obligatorio.',
            'validation.destinationArea': 'Solo se permiten destinos en Tenerife, Adeje o Arona.',
            'validation.dateRequired': 'Selecciona la fecha del traslado.',
            'validation.timeInvalid': 'Selecciona una hora valida para el traslado.',
            'validation.passengersRange': 'El numero de pasajeros debe estar entre 1 y 8.',

            'status.storageError': 'No se pudo guardar la reserva en este dispositivo. Intentalo de nuevo.',
            'status.bookingSuccess': 'Reserva realizada con exito. Tu codigo es {code}.',
            'status.manageMissing': 'Introduce el codigo de reserva y el correo electronico.',
            'status.manageNotFound': 'No se ha encontrado una reserva con ese codigo y correo electronico.',
            'status.manageFound': 'Reserva encontrada. Mostrando detalles.',

            'booking.detail.title': 'Reserva {code}',
            'booking.detail.name': 'Nombre',
            'booking.detail.email': 'Correo electronico',
            'booking.detail.phone': 'Telefono',
            'booking.detail.origin': 'Origen',
            'booking.detail.destination': 'Destino',
            'booking.detail.date': 'Fecha',
            'booking.detail.time': 'Hora',
            'booking.detail.passengers': 'Pasajeros'
        },
        en: {
            brand: 'Taxi Transfer Tenerife',
            'nav.home': 'Home',
            'nav.book': 'Book',
            'nav.manage': 'My Bookings',
            'nav.contact': 'Contact',
            'controls.dark': 'Dark mode',
            'controls.light': 'Light mode',
            'footer.rights': '\u00A9 2026 Taxi Transfer TFS. All rights reserved.',

            'home.hero.title': 'Transfers from Tenerife South Airport',
            'home.hero.subtitle': 'Book your official taxi at the best price. Travel safely and without waiting to any point on the island.',
            'home.hero.cta': 'Book your transfer now',
            'home.destinations.title': 'Our Main Destinations',
            'home.destinations.adeje.title': 'Costa Adeje',
            'home.destinations.adeje.text': 'Reach your hotel in the south in less than 20 minutes.',
            'home.destinations.cristianos.title': 'Los Cristianos',
            'home.destinations.cristianos.text': 'Direct and comfortable transfers to the tourist area.',
            'home.destinations.santacruz.title': 'Santa Cruz de Tenerife',
            'home.destinations.santacruz.text': 'Travel to the capital or port with total safety.',

            'booking.title': 'Booking Request',
            'booking.subtitle': 'Please complete the following form to book your taxi transfer from Tenerife South Airport.',
            'booking.legend': 'Trip Details',
            'booking.fields.name': 'Full Name',
            'booking.fields.email': 'Email Address',
            'booking.fields.phone': 'Contact Phone',
            'booking.fields.origin': 'Origin',
            'booking.fields.destination': 'Destination',
            'booking.fields.date': 'Transfer Date',
            'booking.fields.time': 'Transfer Time',
            'booking.fields.passengers': 'Number of Passengers',
            'booking.placeholders.name': 'Ex. John Smith',
            'booking.placeholders.email': 'Ex. john@email.com',
            'booking.placeholders.phone': 'Ex. 600123456',
            'booking.placeholders.destination': 'Ex. Costa Adeje Hotel',
            'booking.help.name': 'Enter your first and last name.',
            'booking.help.email': 'We will send your booking confirmation to this email.',
            'booking.help.phone': 'Include your number for important notices (digits only, no spaces).',
            'booking.help.destination': 'Enter hotel name, municipality, or full address.',
            'booking.help.date': 'Select the expected service date.',
            'booking.help.time': 'Enter expected pickup or arrival time.',
            'booking.origin.placeholder': 'Select an origin...',
            'booking.origin.tfs': 'Tenerife South Airport (TFS)',
            'booking.origin.tfn': 'Tenerife North Airport (TFN)',
            'booking.origin.gcxo': 'La Gomera Airport (GCXO)',
            'booking.submit': 'Confirm Booking',

            'manage.title': 'My Bookings',
            'manage.subtitle': 'Enter your booking code and email to view or manage your trip.',
            'manage.fields.code': 'Booking Code',
            'manage.fields.email': 'Email Address',
            'manage.placeholders.code': 'Ex. TX-12345',
            'manage.placeholders.email': 'email@example.com',
            'manage.submit': 'Find Booking',

            'contact.title': 'Contact and Support',
            'contact.subtitle': 'Do you have any questions or need help with your booking? We are here to help.',
            'contact.info.addressLabel': 'Address',
            'contact.info.addressValue': 'Tenerife South Airport, Granadilla de Abona, 38610',
            'contact.info.phoneLabel': 'Phone',
            'contact.info.emailLabel': 'Email',
            'contact.form.title': 'Send us a message',
            'contact.form.name': 'Full Name',
            'contact.form.email': 'Email Address',
            'contact.form.emailHelp': 'We will never share your email with anyone else.',
            'contact.form.message': 'Message',
            'contact.form.submit': 'Send Message',

            'announce.nav.expanded': 'Navigation menu expanded',
            'announce.nav.collapsed': 'Navigation menu collapsed',

            'validation.nameRequired': 'Name is required.',
            'validation.emailInvalid': 'Please enter a valid email address.',
            'validation.phoneInvalid': 'Please enter a valid phone number (digits only, 9-15 numbers).',
            'validation.originRequired': 'Please select the origin.',
            'validation.destinationRequired': 'Destination is required.',
            'validation.destinationArea': 'Only Tenerife, Adeje or Arona destinations are allowed.',
            'validation.dateRequired': 'Please select transfer date.',
            'validation.timeInvalid': 'Please select a valid transfer time.',
            'validation.passengersRange': 'Number of passengers must be between 1 and 8.',

            'status.storageError': 'Could not save your booking on this device. Please try again.',
            'status.bookingSuccess': 'Booking created successfully. Your code is {code}.',
            'status.manageMissing': 'Enter both booking code and email.',
            'status.manageNotFound': 'No booking was found with that code and email.',
            'status.manageFound': 'Booking found. Showing details.',

            'booking.detail.title': 'Booking {code}',
            'booking.detail.name': 'Name',
            'booking.detail.email': 'Email',
            'booking.detail.phone': 'Phone',
            'booking.detail.origin': 'Origin',
            'booking.detail.destination': 'Destination',
            'booking.detail.date': 'Date',
            'booking.detail.time': 'Time',
            'booking.detail.passengers': 'Passengers'
        }
    };

    let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || 'es';
    if (!translations[currentLang]) {
        currentLang = 'es';
    }

    let currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    let lastRenderedBooking = null;

    function t(key, replacements = {}) {
        const table = translations[currentLang] || translations.es;
        let text = table[key] || translations.es[key] || key;

        Object.entries(replacements).forEach(([name, value]) => {
            text = text.replace(`{${name}}`, value);
        });

        return text;
    }

    function applyTheme() {
        document.body.classList.toggle('theme-dark', currentTheme === 'dark');

        const themeButton = document.getElementById('theme-toggle');
        if (themeButton) {
            const label = currentTheme === 'dark' ? t('controls.light') : t('controls.dark');
            const icon = currentTheme === 'dark' ? '☀️' : '🌙';
            themeButton.innerHTML = `<span class="control-icon" aria-hidden="true">${icon}</span>${label}`;
            themeButton.setAttribute('aria-label', label);
        }
    }

    function applyLanguage() {
        document.documentElement.setAttribute('lang', currentLang);

        const translatableNodes = document.querySelectorAll('[data-i18n]');
        translatableNodes.forEach((node) => {
            const key = node.getAttribute('data-i18n');
            if (!key) {
                return;
            }
            node.textContent = t(key);
        });

        const placeholderNodes = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderNodes.forEach((node) => {
            const key = node.getAttribute('data-i18n-placeholder');
            if (!key) {
                return;
            }
            node.setAttribute('placeholder', t(key));
        });

        const languageButton = document.getElementById('lang-toggle');
        if (languageButton) {
            const nextLabel = currentLang === 'es' ? 'EN' : 'ES';
            const flag = currentLang === 'es' ? '🇬🇧' : '🇪🇸';
            languageButton.innerHTML = `<span class="control-icon" aria-hidden="true">${flag}</span>${nextLabel}`;
            languageButton.setAttribute('aria-label', currentLang === 'es' ? 'Switch language to English' : 'Cambiar idioma a espanol');
        }

        applyTheme();

        const resultContainer = document.getElementById('resultado-reserva');
        if (lastRenderedBooking && resultContainer) {
            renderBookingDetails(resultContainer, lastRenderedBooking);
        }
    }

    function persistTheme(theme) {
        currentTheme = theme;
        localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
        applyTheme();
    }

    function persistLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(LANG_STORAGE_KEY, currentLang);
        applyLanguage();
    }

    // Referencias a elementos del menu responsive de Bootstrap.
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');

    // Sincroniza aria-expanded con el estado real del menu colapsable.
    if (navbarToggler && navbarCollapse) {
        navbarCollapse.addEventListener('shown.bs.collapse', () => {
            navbarToggler.setAttribute('aria-expanded', 'true');
            announceToScreenReader(t('announce.nav.expanded'));
        });

        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            navbarToggler.setAttribute('aria-expanded', 'false');
            announceToScreenReader(t('announce.nav.collapsed'));
        });
    }

    // Crea (si no existe) una region aria-live para anunciar cambios no visuales.
    function announceToScreenReader(message) {
        let announcer = document.getElementById('aria-announcer');

        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'aria-announcer';
            announcer.setAttribute('aria-live', 'polite');

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
            return { valid: false, errorMsg: t('validation.nameRequired'), invalidField: 'nombre' };
        }

        if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
            return { valid: false, errorMsg: t('validation.emailInvalid'), invalidField: 'email' };
        }

        if (!data.telefono || !/^\d{9,15}$/.test(data.telefono)) {
            return { valid: false, errorMsg: t('validation.phoneInvalid'), invalidField: 'telefono' };
        }

        if (!data.origen) {
            return { valid: false, errorMsg: t('validation.originRequired'), invalidField: 'origen' };
        }

        if (!data.destino) {
            return { valid: false, errorMsg: t('validation.destinationRequired'), invalidField: 'destino' };
        }

        if (!/(tenerife|adeje|arona)/i.test(data.destino)) {
            return { valid: false, errorMsg: t('validation.destinationArea'), invalidField: 'destino' };
        }

        if (!data.fecha) {
            return { valid: false, errorMsg: t('validation.dateRequired'), invalidField: 'fecha' };
        }

        if (!data.hora || !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.hora)) {
            return { valid: false, errorMsg: t('validation.timeInvalid'), invalidField: 'hora' };
        }

        if (!data.pasajeros || data.pasajeros < 1 || data.pasajeros > 8) {
            return { valid: false, errorMsg: t('validation.passengersRange'), invalidField: 'pasajeros' };
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

        return new Intl.DateTimeFormat(currentLang === 'en' ? 'en-GB' : 'es-ES', {
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

        lastRenderedBooking = booking;

        container.innerHTML = `
            <article class="card border-success shadow-sm" tabindex="-1">
                <div class="card-body">
                    <h2 class="h4 card-title mb-3">${escapeHtml(t('booking.detail.title', { code: booking.codigo_reserva }))}</h2>
                    <p class="mb-2"><strong>${escapeHtml(t('booking.detail.name'))}:</strong> ${escapeHtml(booking.nombre)}</p>
                    <p class="mb-2"><strong>${escapeHtml(t('booking.detail.email'))}:</strong> ${escapeHtml(booking.email)}</p>
                    <p class="mb-2"><strong>${escapeHtml(t('booking.detail.phone'))}:</strong> ${escapeHtml(booking.telefono)}</p>
                    <p class="mb-2"><strong>${escapeHtml(t('booking.detail.origin'))}:</strong> ${escapeHtml(booking.origen)}</p>
                    <p class="mb-2"><strong>${escapeHtml(t('booking.detail.destination'))}:</strong> ${escapeHtml(booking.destino)}</p>
                    <p class="mb-2"><strong>${escapeHtml(t('booking.detail.date'))}:</strong> ${escapeHtml(formatBookingDate(booking.fecha))}</p>
                    <p class="mb-2"><strong>${escapeHtml(t('booking.detail.time'))}:</strong> ${escapeHtml(formatBookingTime(booking.hora))}</p>
                    <p class="mb-0"><strong>${escapeHtml(t('booking.detail.passengers'))}:</strong> ${escapeHtml(booking.pasajeros)}</p>
                </div>
            </article>
        `;

        const card = container.querySelector('article');
        if (card) {
            card.focus();
        }
    }

    // Botones de control global (tema e idioma).
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            persistTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            persistLanguage(currentLang === 'es' ? 'en' : 'es');
        });
    }

    // Formulario de reserva (booking.html).
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
                    const storageErrorMsg = t('status.storageError');
                    announceToScreenReader(storageErrorMsg);
                    showFormStatus(bookingForm, storageErrorMsg, false);
                    return;
                }

                const successMsg = t('status.bookingSuccess', { code: booking.codigo_reserva });
                announceToScreenReader(successMsg);
                showFormStatus(bookingForm, successMsg, true);
                bookingForm.reset();
                return;
            }

            announceToScreenReader(validation.errorMsg);
            showFormStatus(bookingForm, validation.errorMsg, false);
        });
    }

    // Formulario de gestion de reservas (manage-booking.html).
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
                errorMsg = t('status.manageMissing');
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
                    errorMsg = t('status.manageNotFound');
                    announceToScreenReader(errorMsg);
                    showFormStatus(manageForm, errorMsg, false);

                    if (resultContainer) {
                        resultContainer.innerHTML = '';
                        lastRenderedBooking = null;
                    }

                    return;
                }

                const successMsg = t('status.manageFound');
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
                lastRenderedBooking = null;
            }
        });
    }

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

    applyLanguage();
    applyTheme();
});
