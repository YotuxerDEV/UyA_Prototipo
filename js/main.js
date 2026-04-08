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
			'footer.rights': '© 2026 Taxi Transfer TFS. Todos los derechos reservados.',
			'home.hero.title': 'Traslados desde el Aeropuerto de Tenerife Sur',
			'home.hero.subtitle': 'Reserva tu taxi oficial al mejor precio. Viaja seguro y sin esperas a cualquier punto de la isla.',
			'home.hero.cta': 'Reserva tu traslado ahora',
			'home.destinations.title': 'Nuestros Destinos Principales',
			'home.destinations.adeje.title': 'Costa Adeje',
			'home.destinations.adeje.text': 'Llega a tu hotel en el sur en menos de 20 minutos.',
			'home.destinations.cristianos.title': 'Los Cristianos',
			'home.destinations.cristianos.text': 'Traslados directos y confortables a la zona turística.',
			'home.destinations.santacruz.title': 'Santa Cruz de Tenerife',
			'home.destinations.santacruz.text': 'Viaja a la capital o al puerto con total seguridad.',
			'home.destinations.medano.title': 'El Médano',
			'home.destinations.medano.text': 'Llegadas rápidas para disfrutar de playa, viento y deportes acuáticos.',
			'home.destinations.laguna.title': 'La Laguna',
			'home.destinations.laguna.text': 'Conecta con el casco histórico y la zona universitaria sin complicaciones.',
			'home.destinations.gigantes.title': 'Los Gigantes',
			'home.destinations.gigantes.text': 'Traslados cómodos hacia los acantilados y puertos del oeste de Tenerife.',
			'booking.title': 'Solicitud de Reserva',
			'booking.subtitle': 'Completa el formulario para reservar tu traslado.',
			'booking.legend': 'Detalles del Viaje',
			'booking.fields.name': 'Nombre Completo',
			'booking.fields.email': 'Correo Electrónico',
			'booking.fields.phone': 'Teléfono de Contacto',
			'booking.fields.origin': 'Lugar de Origen',
			'booking.fields.destination': 'Lugar de Destino',
			'booking.fields.date': 'Fecha del Traslado',
			'booking.fields.time': 'Hora del Traslado',
			'booking.fields.passengers': 'Número de Pasajeros',
			'booking.fields.extras': 'Extras opcionales',
			'booking.fields.requests': 'Peticiones especiales',
			'booking.extras.wheelchair': 'Silla de ruedas (+6 EUR)',
			'booking.extras.babySeat': 'Silla de bebé (+8 EUR)',
			'booking.extras.booster': 'Elevador infantil (+5 EUR)',
			'booking.extras.pet': 'Traslado de mascota (+7 EUR)',
			'booking.destination.placeholder': 'Selecciona un destino...',
			'booking.help.destination': 'Selecciona un destino disponible de Tenerife.',
			'booking.placeholders.name': 'Ej. Juan Pérez',
			'booking.placeholders.email': 'Ej. juan@email.com',
			'booking.placeholders.phone': 'Ej. 600123456',
			'booking.placeholders.requests': 'Ej. Necesito ayuda con el equipaje',
			'booking.help.name': 'Introduce tu nombre y apellidos.',
			'booking.help.email': 'Te enviaremos la confirmación por correo.',
			'booking.help.phone': 'Solo dígitos, entre 9 y 15 números.',
			'booking.help.date': 'Selecciona el día previsto para el servicio.',
			'booking.help.time': 'Indica la hora de recogida prevista.',
			'booking.help.requests': 'Indica cualquier necesidad especial (opcional).',
			'booking.origin.placeholder': 'Selecciona un origen...',
			'booking.origin.tfs': 'Aeropuerto Tenerife Sur (TFS)',
			'booking.origin.tfn': 'Aeropuerto Tenerife Norte (TFN)',
			'booking.origin.gcxo': 'Aeropuerto de La Gomera (GCXO)',
			'booking.submit': 'Ir a pago seguro',
			'manage.title': 'Mis Reservas',
			'manage.subtitle': 'Introduce tu código y correo para gestionar tu reserva.',
			'manage.fields.code': 'Código de Reserva',
			'manage.fields.email': 'Correo Electrónico',
			'manage.placeholders.code': 'Ej. TX-12345',
			'manage.placeholders.email': 'correo@ejemplo.com',
			'manage.submit': 'Buscar Reserva',
			'contact.title': 'Contacto y Soporte',
			'contact.subtitle': '¿Tienes dudas? Estamos aquí para ayudarte.',
			'contact.info.addressLabel': 'Dirección',
			'contact.info.addressValue': 'Aeropuerto de Tenerife Sur, Granadilla de Abona, 38610',
			'contact.info.phoneLabel': 'Teléfono',
			'contact.info.emailLabel': 'Email',
			'contact.form.title': 'Envíanos un mensaje',
			'contact.form.name': 'Nombre Completo',
			'contact.form.email': 'Correo Electrónico',
			'contact.form.emailHelp': 'No compartiremos tu correo con nadie más.',
			'contact.form.message': 'Mensaje',
			'contact.form.submit': 'Enviar Mensaje',
			'status.bookingSuccess': 'Reserva realizada con éxito. Tu código es {code}.',
			'status.storageError': 'No se pudo guardar la reserva.',
			'status.manageMissing': 'Introduce código y correo.',
			'status.manageNotFound': 'No se ha encontrado una reserva con esos datos.',
			'status.manageFound': 'Reserva encontrada. Mostrando detalles.',
			'booking.detail.title': 'Reserva {code}',
			'booking.detail.name': 'Nombre',
			'booking.detail.email': 'Correo',
			'booking.detail.phone': 'Teléfono',
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
			'footer.rights': '© 2026 Taxi Transfer TFS. All rights reserved.',
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
			'home.destinations.medano.title': 'El Medano',
			'home.destinations.medano.text': 'Fast arrivals to enjoy beach, wind and water sports.',
			'home.destinations.laguna.title': 'La Laguna',
			'home.destinations.laguna.text': 'Reach the historic center and university area with no hassle.',
			'home.destinations.gigantes.title': 'Los Gigantes',
			'home.destinations.gigantes.text': 'Comfortable transfers to Tenerife’s west coast cliffs and harbors.',
			'booking.title': 'Booking Request',
			'booking.subtitle': 'Complete the form to book your transfer.',
			'booking.legend': 'Trip Details',
			'booking.fields.name': 'Full Name',
			'booking.fields.email': 'Email Address',
			'booking.fields.phone': 'Contact Phone',
			'booking.fields.origin': 'Origin',
			'booking.fields.destination': 'Destination',
			'booking.fields.date': 'Transfer Date',
			'booking.fields.time': 'Transfer Time',
			'booking.fields.passengers': 'Number of Passengers',
			'booking.fields.extras': 'Optional extras',
			'booking.fields.requests': 'Special requests',
			'booking.extras.wheelchair': 'Wheelchair support (+6 EUR)',
			'booking.extras.babySeat': 'Baby seat (+8 EUR)',
			'booking.extras.booster': 'Booster seat (+5 EUR)',
			'booking.extras.pet': 'Pet transfer (+7 EUR)',
			'booking.destination.placeholder': 'Select a destination...',
			'booking.help.destination': 'Select an available destination in Tenerife.',
			'booking.placeholders.name': 'Ex. John Smith',
			'booking.placeholders.email': 'Ex. john@email.com',
			'booking.placeholders.phone': 'Ex. 600123456',
			'booking.placeholders.requests': 'Ex. I need help with luggage',
			'booking.help.name': 'Enter your first and last name.',
			'booking.help.email': 'We will send your booking confirmation by email.',
			'booking.help.phone': 'Digits only, from 9 to 15 numbers.',
			'booking.help.date': 'Select the planned service day.',
			'booking.help.time': 'Enter the expected pickup time.',
			'booking.help.requests': 'Add any special needs (optional).',
			'booking.origin.placeholder': 'Select an origin...',
			'booking.origin.tfs': 'Tenerife South Airport (TFS)',
			'booking.origin.tfn': 'Tenerife North Airport (TFN)',
			'booking.origin.gcxo': 'La Gomera Airport (GCXO)',
			'booking.submit': 'Go to secure payment',
			'manage.title': 'My Bookings',
			'manage.subtitle': 'Enter your code and email to manage your booking.',
			'manage.fields.code': 'Booking Code',
			'manage.fields.email': 'Email Address',
			'manage.placeholders.code': 'Ex. TX-12345',
			'manage.placeholders.email': 'email@example.com',
			'manage.submit': 'Find Booking',
			'contact.title': 'Contact and Support',
			'contact.subtitle': 'Do you have questions? We are here to help.',
			'contact.info.addressLabel': 'Address',
			'contact.info.addressValue': 'Tenerife South Airport, Granadilla de Abona, 38610',
			'contact.info.phoneLabel': 'Phone',
			'contact.info.emailLabel': 'Email',
			'contact.form.title': 'Send us a message',
			'contact.form.name': 'Full Name',
			'contact.form.email': 'Email Address',
			'contact.form.emailHelp': 'We will never share your email.',
			'contact.form.message': 'Message',
			'contact.form.submit': 'Send Message',
			'status.bookingSuccess': 'Booking created successfully. Your code is {code}.',
			'status.storageError': 'Could not save booking.',
			'status.manageMissing': 'Enter booking code and email.',
			'status.manageNotFound': 'No booking found with those details.',
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
			themeButton.innerHTML = `<span aria-hidden="true">${icon}</span>`;
			themeButton.setAttribute('aria-label', label);
			themeButton.setAttribute('title', label);
		}
	}

	function applyLanguage() {
		document.documentElement.setAttribute('lang', currentLang);

		document.querySelectorAll('[data-i18n]').forEach((node) => {
			const key = node.getAttribute('data-i18n');
			if (key) {
				node.textContent = t(key);
			}
		});

		document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
			const key = node.getAttribute('data-i18n-placeholder');
			if (key) {
				node.setAttribute('placeholder', t(key));
			}
		});

		const languageButton = document.getElementById('lang-toggle');
		if (languageButton) {
			const nextLabel = currentLang === 'es' ? 'EN' : 'ES';
			languageButton.innerHTML = '<span aria-hidden="true">🌐</span>';
			languageButton.setAttribute('aria-label', currentLang === 'es' ? 'Switch language to English' : 'Cambiar idioma a español');
			languageButton.setAttribute('title', nextLabel);
		}

		applyTheme();

		const resultContainer = document.getElementById('resultado-reserva');
		if (lastRenderedBooking && resultContainer) {
			renderBookingDetails(resultContainer, lastRenderedBooking);
		}
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

	function normalizeEmail(email) {
		return (email || '').trim().toLowerCase();
	}

	function escapeHtml(value) {
		return String(value)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}

	function generateBookingCode(existingBookings) {
		let code;
		do {
			code = `TX-${Math.floor(10000 + Math.random() * 90000)}`;
		} while (existingBookings.some((item) => item.codigo_reserva === code));
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
			pasajeros: data.pasajeros,
			extras: data.extras || [],
			peticiones: data.peticiones || ''
		};

		bookings.push(booking);
		if (!saveStoredBookings(bookings)) {
			return null;
		}
		return booking;
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
					<p class="mb-2"><strong>${escapeHtml(t('booking.detail.date'))}:</strong> ${escapeHtml(booking.fecha)}</p>
					<p class="mb-2"><strong>${escapeHtml(t('booking.detail.time'))}:</strong> ${escapeHtml(booking.hora)}</p>
					<p class="mb-0"><strong>${escapeHtml(t('booking.detail.passengers'))}:</strong> ${escapeHtml(booking.pasajeros)}</p>
				</div>
			</article>
		`;
	}

	function showFormStatus(form, message, success) {
		let status = form.querySelector('.form-status');
		if (!status) {
			status = document.createElement('div');
			status.className = 'form-status mt-3';
			status.setAttribute('aria-live', 'assertive');
			form.appendChild(status);
		}
		status.textContent = message;
		status.style.color = success ? '#155724' : '#842029';
		status.style.backgroundColor = success ? '#d1e7dd' : '#f8d7da';
		status.style.padding = '0.65rem 0.9rem';
		status.style.borderRadius = '0.5rem';
	}

	const themeToggle = document.getElementById('theme-toggle');
	if (themeToggle) {
		themeToggle.addEventListener('click', () => {
			currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
			localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
			applyTheme();
		});
	}

	const langToggle = document.getElementById('lang-toggle');
	if (langToggle) {
		langToggle.addEventListener('click', () => {
			currentLang = currentLang === 'es' ? 'en' : 'es';
			localStorage.setItem(LANG_STORAGE_KEY, currentLang);
			applyLanguage();
		});
	}

	const bookingForm = document.getElementById('booking-form');
	if (bookingForm) {
		bookingForm.addEventListener('submit', (event) => {
			event.preventDefault();

			const formData = {
				nombre: bookingForm.nombre?.value?.trim() || '',
				email: normalizeEmail(bookingForm.email?.value || ''),
				telefono: bookingForm.telefono?.value?.trim() || '',
				origen: bookingForm.origen?.value || '',
				destino: bookingForm.destino?.value || '',
				fecha: bookingForm.fecha?.value || '',
				hora: bookingForm.hora?.value || '',
				pasajeros: Number.parseInt(bookingForm.pasajeros?.value || '1', 10),
				extras: Array.from(bookingForm.querySelectorAll('input[name="extras"]:checked')).map((item) => item.value),
				peticiones: bookingForm.peticiones?.value?.trim() || ''
			};

			if (!formData.nombre || !/^\S+@\S+\.\S+$/.test(formData.email) || !formData.origen || !formData.destino || !formData.fecha || !formData.hora) {
				showFormStatus(bookingForm, t('status.storageError'), false);
				return;
			}

			const booking = createBookingRecord(formData);
			if (!booking) {
				showFormStatus(bookingForm, t('status.storageError'), false);
				return;
			}

			showFormStatus(bookingForm, t('status.bookingSuccess', { code: booking.codigo_reserva }), true);
			sessionStorage.setItem('paymentAccess', '1');
			sessionStorage.setItem('currentBooking', JSON.stringify(booking));

			setTimeout(() => {
				window.location.href = 'payment.html';
			}, 1200);
		});
	}

	const manageForm = document.getElementById('manage-form');
	if (manageForm) {
		manageForm.addEventListener('submit', (event) => {
			event.preventDefault();

			const codigo = (manageForm.codigo_reserva?.value || '').trim().toUpperCase();
			const email = normalizeEmail(manageForm.email_reserva?.value || '');
			const resultContainer = document.getElementById('resultado-reserva');

			if (!codigo || !email) {
				showFormStatus(manageForm, t('status.manageMissing'), false);
				if (resultContainer) {
					resultContainer.innerHTML = '';
				}
				return;
			}

			const bookings = getStoredBookings();
			const bookingIndex = bookings.findIndex((item) => item.codigo_reserva === codigo && normalizeEmail(item.email) === email);
			if (bookingIndex === -1) {
				showFormStatus(manageForm, t('status.manageNotFound'), false);
				if (resultContainer) {
					resultContainer.innerHTML = '';
				}
				return;
			}

			const booking = bookings[bookingIndex];
			showFormStatus(manageForm, t('status.manageFound'), true);

			if (typeof window.renderBookingDetailsWithActions === 'function') {
				window.renderBookingDetailsWithActions(resultContainer, booking, bookingIndex);
			} else {
				renderBookingDetails(resultContainer, booking);
			}
		});
	}

	applyLanguage();
	applyTheme();
});
