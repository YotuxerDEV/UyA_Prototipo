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
			'footer.privacy': 'Consulta nuestra Politica de privacidad.',
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
			'booking.progress.title': 'Progreso de la reserva',
			'booking.progress.filled': '{done} de {total} campos obligatorios',
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
			'booking.submit': 'Confirmar datos',
			'booking.none': 'Ninguno',
			'booking.taxi.title': 'Seleccion de taxis',
			'booking.taxi.mode': 'Modo de seleccion',
			'booking.taxi.mode.auto': 'Automatico recomendado',
			'booking.taxi.mode.manual': 'Manual',
			'booking.taxi.type.taxi1': 'Taxi 1 (4 plazas, +0 EUR)',
			'booking.taxi.type.taxi2': 'Taxi 2 (6 plazas, +10 EUR)',
			'booking.taxi.type.taxi3': 'Taxi 3 (8 plazas, +18 EUR)',
			'booking.breakdown.recommended': 'Combinacion recomendada',
			'booking.breakdown.active': 'Seleccion activa',
			'booking.breakdown.capacityRecommended': 'Capacidad total recomendada',
			'booking.breakdown.capacityActive': 'Capacidad total activa',
			'booking.breakdown.spareRecommended': 'Plazas sobrantes recomendadas',
			'booking.breakdown.spareActive': 'Plazas sobrantes activas',
			'booking.breakdown.taxiCostRecommended': 'Coste adicional taxis recomendado',
			'booking.breakdown.taxiCostActive': 'Coste adicional taxis activo',
			'booking.breakdown.manualInvalid': 'La seleccion manual debe cubrir todos los pasajeros.',
			'booking.summary.title': 'Resumen de precio',
			'booking.summary.distance': 'Distancia estimada',
			'booking.summary.tripByTaxis': 'Trayecto x {count} taxis (sin importar el tipo)',
			'booking.summary.extras': 'Extras',
			'booking.summary.taxiExtra': 'Coste adicional por tipo de taxi',
			'booking.summary.igic': 'IGIC (7%)',
			'booking.summary.total': 'Total estimado',
			'booking.modal.confirm.title': 'Confirmar datos de la reserva',
			'booking.modal.confirm.edit': 'Editar',
			'booking.modal.confirm.proceed': 'Continuar al pago',
			'booking.modal.passenger.title': 'Datos del pasajero',
			'booking.modal.transfer.title': 'Datos del traslado',
			'booking.modal.taxis.title': 'Taxis',
			'booking.modal.price.title': 'Precio',
			'booking.modal.payment.title': 'Pago seguro',
			'booking.modal.payment.cardHolder': 'Titular de la tarjeta',
			'booking.modal.payment.cardHolder.placeholder': 'Nombre completo',
			'booking.modal.payment.cardNumber': 'Numero de tarjeta',
			'booking.modal.payment.cardNumber.placeholder': '1234 5678 9012 3456',
			'booking.modal.payment.expiry': 'Vencimiento',
			'booking.modal.payment.expiry.placeholder': 'MM/AA',
			'booking.modal.payment.cvv': 'CVV',
			'booking.modal.payment.cvv.placeholder': '123',
			'booking.modal.payment.submit': 'Pagar y confirmar reserva',
			'booking.modal.payment.totalToPay': 'Total a pagar',
			'status.payment.pendingMissing': 'No hay una reserva pendiente para pagar.',
			'status.payment.invalidCard': 'Revisa los datos de la tarjeta.',
			'status.payment.persistError': 'No se pudo guardar la reserva en este navegador.',
			'status.payment.success': 'Pago completado. Codigo de reserva: {code}',
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
			'status.bookingPastDateTime': 'La fecha y hora de la reserva deben ser posteriores al momento actual.',
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
			'footer.privacy': 'Read our Privacy Policy.',
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
			'booking.progress.title': 'Booking progress',
			'booking.progress.filled': '{done} of {total} required fields',
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
			'booking.submit': 'Confirm details',
			'booking.none': 'None',
			'booking.taxi.title': 'Taxi selection',
			'booking.taxi.mode': 'Selection mode',
			'booking.taxi.mode.auto': 'Recommended automatic',
			'booking.taxi.mode.manual': 'Manual',
			'booking.taxi.type.taxi1': 'Taxi 1 (4 seats, +0 EUR)',
			'booking.taxi.type.taxi2': 'Taxi 2 (6 seats, +10 EUR)',
			'booking.taxi.type.taxi3': 'Taxi 3 (8 seats, +18 EUR)',
			'booking.breakdown.recommended': 'Recommended combination',
			'booking.breakdown.active': 'Active selection',
			'booking.breakdown.capacityRecommended': 'Recommended total capacity',
			'booking.breakdown.capacityActive': 'Active total capacity',
			'booking.breakdown.spareRecommended': 'Recommended spare seats',
			'booking.breakdown.spareActive': 'Active spare seats',
			'booking.breakdown.taxiCostRecommended': 'Recommended taxi type surcharge',
			'booking.breakdown.taxiCostActive': 'Active taxi type surcharge',
			'booking.breakdown.manualInvalid': 'Manual selection must cover all passengers.',
			'booking.summary.title': 'Price summary',
			'booking.summary.distance': 'Estimated distance',
			'booking.summary.tripByTaxis': 'Trip x {count} taxis (regardless of type)',
			'booking.summary.extras': 'Extras',
			'booking.summary.taxiExtra': 'Taxi type surcharge',
			'booking.summary.igic': 'IGIC (7%)',
			'booking.summary.total': 'Estimated total',
			'booking.modal.confirm.title': 'Confirm booking details',
			'booking.modal.confirm.edit': 'Edit',
			'booking.modal.confirm.proceed': 'Continue to payment',
			'booking.modal.passenger.title': 'Passenger details',
			'booking.modal.transfer.title': 'Transfer details',
			'booking.modal.taxis.title': 'Taxis',
			'booking.modal.price.title': 'Price',
			'booking.modal.payment.title': 'Secure payment',
			'booking.modal.payment.cardHolder': 'Cardholder name',
			'booking.modal.payment.cardHolder.placeholder': 'Full name',
			'booking.modal.payment.cardNumber': 'Card number',
			'booking.modal.payment.cardNumber.placeholder': '1234 5678 9012 3456',
			'booking.modal.payment.expiry': 'Expiry date',
			'booking.modal.payment.expiry.placeholder': 'MM/YY',
			'booking.modal.payment.cvv': 'CVV',
			'booking.modal.payment.cvv.placeholder': '123',
			'booking.modal.payment.submit': 'Pay and confirm booking',
			'booking.modal.payment.totalToPay': 'Total to pay',
			'status.payment.pendingMissing': 'There is no pending booking to pay.',
			'status.payment.invalidCard': 'Please review the card details.',
			'status.payment.persistError': 'Could not save booking in this browser.',
			'status.payment.success': 'Payment completed. Booking code: {code}',
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
			'status.bookingPastDateTime': 'The booking date and time must be later than the current time.',
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

	window.appI18n = {
		t,
		getLang: () => currentLang,
		translations
	};

	function updateBookingProgress(form) {
		if (!form) {
			return;
		}

		const progressFill = document.getElementById('booking-progress-fill');
		const progressCurrent = document.getElementById('booking-progress-current');

		if (!progressFill && !progressCurrent) {
			return;
		}

		const requiredFields = Array.from(form.querySelectorAll('[required]')).filter((field) => !field.disabled);
		const validFields = requiredFields.filter((field) => field.checkValidity() && String(field.value || '').trim() !== '');
		const totalFields = requiredFields.length;
		const doneFields = validFields.length;
		const progressValue = totalFields > 0 ? Math.round((doneFields / totalFields) * 100) : 0;

		if (progressFill) {
			progressFill.style.width = `${progressValue}%`;
			progressFill.setAttribute('aria-valuenow', String(progressValue));
		}

		if (progressCurrent) {
			progressCurrent.textContent = t('booking.progress.filled', { done: doneFields, total: totalFields });
		}
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

		const bookingFormNode = document.getElementById('booking-form');
		if (bookingFormNode) {
			updateBookingProgress(bookingFormNode);
		}

		document.dispatchEvent(new CustomEvent('app:languageChanged', {
			detail: { lang: currentLang }
		}));
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

	const planner = window.taxiPlanner;
	const pricingCalculator = window.bookingPricing;

	const destinoPrices = {
		'Costa Adeje': { km: 18, base: 25 },
		'Los Cristianos': { km: 22, base: 30 },
		'Playa de las Americas': { km: 20, base: 28 },
		'El Medano': { km: 15, base: 22 },
		'El Médano': { km: 15, base: 22 },
		'Santa Cruz de Tenerife': { km: 80, base: 65 },
		'Puerto de la Cruz': { km: 90, base: 75 },
		'La Laguna': { km: 85, base: 70 },
		'Los Gigantes': { km: 55, base: 50 },
		Vilaflor: { km: 42, base: 45 },
		'San Miguel de Abona': { km: 48, base: 48 },
		Garachico: { km: 100, base: 85 },
		'Puerto del Rosario': { km: 5, base: 15 },
		'Icod de los Vinos': { km: 95, base: 80 },
		Candelaria: { km: 70, base: 60 },
		Arafo: { km: 35, base: 38 }
	};

	const extrasLabelKeys = {
		wheelchair: 'booking.extras.wheelchair',
		babySeat: 'booking.extras.babySeat',
		booster: 'booking.extras.booster',
		pet: 'booking.extras.pet'
	};

	const extrasPrices = {
		wheelchair: 6,
		babySeat: 8,
		booster: 5,
		pet: 7
	};

	let pendingBookingPayload = null;

	function money(value) {
		return `${Number(value || 0).toFixed(2)} EUR`;
	}

	function getTaxiMode(form) {
		return form.querySelector('input[name="taxiSelectionMode"]:checked')?.value || 'auto';
	}

	function getPassengers(form) {
		return planner?.toSafePassengerCount(form.pasajeros?.value || 1) || 1;
	}

	function getManualTaxiSelection() {
		return {
			taxi1: Number.parseInt(document.getElementById('taxi1Count')?.value || '0', 10) || 0,
			taxi2: Number.parseInt(document.getElementById('taxi2Count')?.value || '0', 10) || 0,
			taxi3: Number.parseInt(document.getElementById('taxi3Count')?.value || '0', 10) || 0
		};
	}

	function getTaxiSelection(form, passengers, recommendedPlan) {
		const mode = getTaxiMode(form);
		if (!planner || mode === 'auto') {
			return { ...recommendedPlan, mode: 'auto', valid: true };
		}

		const manual = planner.summarizeSelection(getManualTaxiSelection(), planner.TAXI_TYPES, passengers);
		return {
			...manual,
			mode: 'manual',
			valid: manual.totalCapacity >= passengers && manual.taxiCount > 0,
			validationMessage: manual.totalCapacity >= passengers
				? ''
				: t('booking.breakdown.manualInvalid')
		};
	}

	function getBookingDataFromForm(form) {
		const pasajeros = getPassengers(form);
		const extras = Array.from(form.querySelectorAll('input[name="extras"]:checked')).map((item) => item.value);
		return {
			nombre: form.nombre?.value?.trim() || '',
			email: normalizeEmail(form.email?.value || ''),
			telefono: form.telefono?.value?.trim() || '',
			origen: form.origen?.value || '',
			destino: form.destino?.value || '',
			fecha: form.fecha?.value || '',
			hora: form.hora?.value || '',
			pasajeros,
			extras,
			peticiones: form.peticiones?.value?.trim() || ''
		};
	}

	function parseBookingDateTime(fecha, hora) {
		if (!fecha || !hora) {
			return null;
		}

		const parsed = new Date(`${fecha}T${hora}`);
		if (Number.isNaN(parsed.getTime())) {
			return null;
		}

		return parsed;
	}

	function isPastBookingDateTime(fecha, hora, now = new Date()) {
		const bookingDateTime = parseBookingDateTime(fecha, hora);
		if (!bookingDateTime) {
			return false;
		}

		return bookingDateTime.getTime() < now.getTime();
	}

	function clearDateTimeValidation(form) {
		if (form.fecha) {
			form.fecha.setCustomValidity('');
		}
		if (form.hora) {
			form.hora.setCustomValidity('');
		}
	}

	function buildPricing(bookingData, taxiSelection) {
		const destinationData = destinoPrices[bookingData.destino] || { km: 0, base: 0 };
		const extrasTotal = bookingData.extras.reduce((sum, extra) => sum + (extrasPrices[extra] || 0), 0);

		if (pricingCalculator && typeof pricingCalculator.calculateBookingPricing === 'function') {
			return pricingCalculator.calculateBookingPricing({
				destinationData,
				extrasTotal,
				taxiAdditionalCost: taxiSelection.taxiCost,
				taxiCount: taxiSelection.taxiCount,
				igicRate: 0.07
			});
		}

		const tripCost = (destinationData.base || 0) * (taxiSelection.taxiCount || 0);
		const subtotal = tripCost + extrasTotal + (taxiSelection.taxiCost || 0);
		const igic = subtotal * 0.07;

		return {
			km: destinationData.km || 0,
			taxiCount: taxiSelection.taxiCount || 0,
			basePricePerTaxi: destinationData.base || 0,
			tripCost,
			extrasTotal,
			taxiAdditionalCost: taxiSelection.taxiCost || 0,
			subtotal,
			igic,
			total: subtotal + igic
		};
	}

	function renderTaxiBreakdown(recommendedPlan, selectedPlan) {
		const container = document.getElementById('taxi-breakdown');
		if (!container) {
			return;
		}

		const warningHtml = selectedPlan.valid
			? ''
			: `<p class="text-danger small mb-0 mt-3">${escapeHtml(t('booking.breakdown.manualInvalid'))}</p>`;

		container.innerHTML = `
			<div class="taxi-breakdown-card">
				<h4 class="taxi-breakdown-heading">${escapeHtml(t('booking.breakdown.recommended'))}</h4>
				<p class="small mb-1"><strong>${escapeHtml(t('booking.breakdown.recommended'))}:</strong> ${escapeHtml(recommendedPlan.formattedCombination)}</p>
				<p class="small mb-1">${escapeHtml(t('booking.breakdown.capacityRecommended'))}: ${recommendedPlan.totalCapacity}</p>
				<p class="small mb-1">${escapeHtml(t('booking.breakdown.spareRecommended'))}: ${recommendedPlan.spareSeats}</p>
				<p class="small mb-0">${escapeHtml(t('booking.breakdown.taxiCostRecommended'))}: ${money(recommendedPlan.taxiCost)}</p>
			</div>
			<div class="taxi-breakdown-card mt-3">
				<h4 class="taxi-breakdown-heading">${escapeHtml(t('booking.breakdown.active'))}</h4>
				<p class="small mb-1"><strong>${escapeHtml(t('booking.breakdown.active'))}:</strong> ${escapeHtml(selectedPlan.formattedCombination)}</p>
				<p class="small mb-1">${escapeHtml(t('booking.breakdown.capacityActive'))}: ${selectedPlan.totalCapacity}</p>
				<p class="small mb-1">${escapeHtml(t('booking.breakdown.spareActive'))}: ${selectedPlan.spareSeats}</p>
				<p class="small mb-0">${escapeHtml(t('booking.breakdown.taxiCostActive'))}: ${money(selectedPlan.taxiCost)}</p>
			</div>
			${warningHtml}
		`;
	}

	function renderPreview(form) {
		const summary = document.getElementById('booking-summary');
		if (!summary || !planner) {
			return;
		}

		const bookingData = getBookingDataFromForm(form);
		const recommendedPlan = planner.computeBestTaxiCombination(bookingData.pasajeros);

		if (getTaxiMode(form) === 'auto') {
			document.getElementById('taxi1Count').value = recommendedPlan.selection.taxi1;
			document.getElementById('taxi2Count').value = recommendedPlan.selection.taxi2;
			document.getElementById('taxi3Count').value = recommendedPlan.selection.taxi3;
		}

		const selectedPlan = getTaxiSelection(form, bookingData.pasajeros, recommendedPlan);
		const pricing = buildPricing(bookingData, selectedPlan);
		renderTaxiBreakdown(recommendedPlan, selectedPlan);

		summary.innerHTML = `
			<section class="card border-0 shadow-lg booking-summary-card" role="region" aria-label="${escapeHtml(t('booking.summary.title'))}">
				<div class="card-body p-4 p-xl-4">
					<p class="pricing-eyebrow mb-2">${escapeHtml(t('booking.summary.title'))}</p>
					<h3 class="h4 fw-bold mb-3 pricing-title">${money(pricing.total)}</h3>
					<p class="pricing-note mb-3">${escapeHtml(t('booking.summary.tripByTaxis', { count: pricing.taxiCount }))}</p>

					<dl class="pricing-list mb-0" aria-live="polite">
						<div class="pricing-row">
							<dt>${escapeHtml(t('booking.summary.distance'))}</dt>
							<dd>${pricing.km || '-'} km</dd>
						</div>
						<div class="pricing-row">
							<dt>${escapeHtml(t('booking.summary.tripByTaxis', { count: pricing.taxiCount }))}</dt>
							<dd>${money(pricing.tripCost)}</dd>
						</div>
						<div class="pricing-row">
							<dt>${escapeHtml(t('booking.summary.extras'))}</dt>
							<dd>${money(pricing.extrasTotal)}</dd>
						</div>
						<div class="pricing-row">
							<dt>${escapeHtml(t('booking.summary.taxiExtra'))}</dt>
							<dd>${money(pricing.taxiAdditionalCost)}</dd>
						</div>
						<div class="pricing-row">
							<dt>${escapeHtml(t('booking.summary.igic'))}</dt>
							<dd>${money(pricing.igic)}</dd>
						</div>
					</dl>

					<div class="pricing-total-row mt-3" aria-label="${escapeHtml(t('booking.summary.total'))}">
						<span class="fw-bold">${escapeHtml(t('booking.summary.total'))}</span>
						<strong>${money(pricing.total)}</strong>
					</div>
				</div>
			</section>
		`;
	}

	function createConfirmSummaryHTML(bookingData, recommendedPlan, selectedPlan, pricing) {
		const extrasLabel = bookingData.extras.length
			? bookingData.extras.map((extra) => t(extrasLabelKeys[extra] || extra)).join(', ')
			: t('booking.none');

		return `
			<div class="confirm-grid">
				<section class="confirm-panel">
					<h3 class="h6 fw-bold mb-2">${escapeHtml(t('booking.modal.passenger.title'))}</h3>
					<p class="mb-1"><strong>${escapeHtml(t('booking.fields.name'))}:</strong> ${escapeHtml(bookingData.nombre)}</p>
					<p class="mb-1"><strong>${escapeHtml(t('booking.fields.email'))}:</strong> ${escapeHtml(bookingData.email)}</p>
					<p class="mb-0"><strong>${escapeHtml(t('booking.fields.phone'))}:</strong> ${escapeHtml(bookingData.telefono)}</p>
				</section>

				<section class="confirm-panel">
					<h3 class="h6 fw-bold mb-2">${escapeHtml(t('booking.modal.transfer.title'))}</h3>
					<p class="mb-1"><strong>${escapeHtml(t('booking.fields.origin'))}:</strong> ${escapeHtml(bookingData.origen)}</p>
					<p class="mb-1"><strong>${escapeHtml(t('booking.fields.destination'))}:</strong> ${escapeHtml(bookingData.destino)}</p>
					<p class="mb-1"><strong>${escapeHtml(t('booking.fields.date'))}:</strong> ${escapeHtml(bookingData.fecha)}</p>
					<p class="mb-1"><strong>${escapeHtml(t('booking.fields.time'))}:</strong> ${escapeHtml(bookingData.hora)}</p>
					<p class="mb-1"><strong>${escapeHtml(t('booking.fields.passengers'))}:</strong> ${bookingData.pasajeros}</p>
					<p class="mb-0"><strong>${escapeHtml(t('booking.fields.extras'))}:</strong> ${escapeHtml(extrasLabel)}</p>
				</section>

				<section class="confirm-panel">
					<h3 class="h6 fw-bold mb-2">${escapeHtml(t('booking.modal.taxis.title'))}</h3>
					<p class="mb-1"><strong>${escapeHtml(t('booking.breakdown.recommended'))}:</strong> ${escapeHtml(recommendedPlan.formattedCombination)}</p>
					<p class="mb-1"><strong>${escapeHtml(t('booking.breakdown.active'))}:</strong> ${escapeHtml(selectedPlan.formattedCombination)}</p>
					<p class="mb-1"><strong>${escapeHtml(t('booking.breakdown.capacityActive'))}:</strong> ${selectedPlan.totalCapacity}</p>
					<p class="mb-0"><strong>${escapeHtml(t('booking.breakdown.spareActive'))}:</strong> ${selectedPlan.spareSeats}</p>
				</section>

				<section class="confirm-panel confirm-panel-price">
					<h3 class="h6 fw-bold mb-2">${escapeHtml(t('booking.modal.price.title'))}</h3>
					<p class="mb-1"><strong>${escapeHtml(t('booking.summary.tripByTaxis', { count: pricing.taxiCount }))}:</strong> ${money(pricing.tripCost)}</p>
					<p class="mb-1"><strong>${escapeHtml(t('booking.summary.extras'))}:</strong> ${money(pricing.extrasTotal)}</p>
					<p class="mb-1"><strong>${escapeHtml(t('booking.summary.taxiExtra'))}:</strong> ${money(pricing.taxiAdditionalCost)}</p>
					<p class="mb-1"><strong>${escapeHtml(t('booking.summary.igic'))}:</strong> ${money(pricing.igic)}</p>
					<p class="mb-0 fs-5"><strong>${escapeHtml(t('booking.summary.total'))}:</strong> ${money(pricing.total)}</p>
				</section>
			</div>
		`;
	}

	function validatePaymentForm() {
		const holder = document.getElementById('modal-card-holder')?.value?.trim() || '';
		const card = (document.getElementById('modal-card-number')?.value || '').replace(/\s/g, '');
		const exp = document.getElementById('modal-card-exp')?.value?.trim() || '';
		const cvv = document.getElementById('modal-card-cvv')?.value?.trim() || '';

		return !!(holder && /^\d{13,19}$/.test(card) && /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp) && /^\d{3,4}$/.test(cvv));
	}

	function showInlinePaymentStatus(message, success) {
		const status = document.getElementById('inline-payment-status');
		if (!status) {
			return;
		}
		status.textContent = message;
		status.className = success ? 'alert alert-success mt-3' : 'alert alert-danger mt-3';
	}

	function persistBooking(payload) {
		const bookings = getStoredBookings();
		const booking = {
			codigo_reserva: generateBookingCode(bookings),
			...payload.bookingData,
			taxiSelectionMode: payload.selectedPlan.mode,
			taxiSelection: payload.selectedPlan.selection,
			taxiRecommendation: payload.recommendedPlan.selection,
			taxiSummary: {
				formattedCombination: payload.selectedPlan.formattedCombination,
				totalCapacity: payload.selectedPlan.totalCapacity,
				spareSeats: payload.selectedPlan.spareSeats,
				taxiCost: payload.selectedPlan.taxiCost,
				taxiCount: payload.selectedPlan.taxiCount
			},
			pricing: payload.pricing,
			createdAt: new Date().toISOString()
		};

		bookings.push(booking);
		if (!saveStoredBookings(bookings)) {
			return null;
		}

		return booking;
	}

	function setupBookingFlow() {
		const form = document.getElementById('booking-form');
		const confirmModalEl = document.getElementById('confirm-booking-modal');
		const paymentModalEl = document.getElementById('payment-modal');

		if (!form || !confirmModalEl || !paymentModalEl || !planner || typeof bootstrap === 'undefined') {
			return;
		}

		window.bookingEnhancedFlowActive = true;

		const confirmModal = new bootstrap.Modal(confirmModalEl);
		const paymentModal = new bootstrap.Modal(paymentModalEl);
		const modeInputs = Array.from(form.querySelectorAll('input[name="taxiSelectionMode"]'));
		const manualControls = document.getElementById('taxi-manual-controls');
		const manualInputs = [
			document.getElementById('taxi1Count'),
			document.getElementById('taxi2Count'),
			document.getElementById('taxi3Count')
		];
		function setManualControlsState() {
			const isManual = getTaxiMode(form) === 'manual';
			if (manualControls) {
				manualControls.classList.toggle('manual-disabled', !isManual);
			}
			manualInputs.forEach((input) => {
				if (input) {
					input.disabled = !isManual;
				}
			});
			renderPreview(form);
			updateBookingProgress(form);
		}

		modeInputs.forEach((input) => {
			input.addEventListener('change', setManualControlsState);
		});

		manualInputs.forEach((input) => {
			if (input) {
				input.addEventListener('input', () => {
					renderPreview(form);
					updateBookingProgress(form);
				});
			}
		});

		form.addEventListener('change', () => {
			renderPreview(form);
			updateBookingProgress(form);
		});
		form.addEventListener('input', () => {
			renderPreview(form);
			updateBookingProgress(form);
		});

		form.addEventListener('submit', (event) => {
			event.preventDefault();
			event.stopImmediatePropagation();
			clearDateTimeValidation(form);

			if (!form.checkValidity()) {
				form.reportValidity();
				return;
			}

			const bookingData = getBookingDataFromForm(form);
			if (isPastBookingDateTime(bookingData.fecha, bookingData.hora)) {
				const message = t('status.bookingPastDateTime');
				if (form.hora) {
					form.hora.setCustomValidity(message);
					form.hora.reportValidity();
				}
				showFormStatus(form, message, false);
				return;
			}

			const recommendedPlan = planner.computeBestTaxiCombination(bookingData.pasajeros);
			const selectedPlan = getTaxiSelection(form, bookingData.pasajeros, recommendedPlan);

			if (!selectedPlan.valid) {
				renderPreview(form);
				return;
			}

			const pricing = buildPricing(bookingData, selectedPlan);
			pendingBookingPayload = { bookingData, recommendedPlan, selectedPlan, pricing };

			const confirmContent = document.getElementById('confirm-booking-content');
			if (confirmContent) {
				confirmContent.innerHTML = createConfirmSummaryHTML(bookingData, recommendedPlan, selectedPlan, pricing);
			}

			confirmModal.show();
		}, true);

		const proceedButton = document.getElementById('proceed-to-payment-btn');
		if (proceedButton) {
			proceedButton.addEventListener('click', () => {
				if (!pendingBookingPayload) {
					return;
				}

				const paymentSummary = document.getElementById('payment-modal-summary');
				if (paymentSummary) {
					paymentSummary.innerHTML = `
						<div class="payment-amount-box">
							<p class="mb-1 text-muted">${escapeHtml(t('booking.modal.payment.totalToPay'))}</p>
							<p class="mb-0 fs-4 fw-bold">${money(pendingBookingPayload.pricing.total)}</p>
						</div>
					`;
				}

				confirmModal.hide();
				paymentModal.show();
			});
		}

		const paymentForm = document.getElementById('inline-payment-form');
		if (paymentForm) {
			paymentForm.addEventListener('submit', (event) => {
				event.preventDefault();
				if (!pendingBookingPayload) {
					showInlinePaymentStatus(t('status.payment.pendingMissing'), false);
					return;
				}

				if (!validatePaymentForm()) {
					showInlinePaymentStatus(t('status.payment.invalidCard'), false);
					return;
				}

				const booking = persistBooking(pendingBookingPayload);
				if (!booking) {
					showInlinePaymentStatus(t('status.payment.persistError'), false);
					return;
				}

				sessionStorage.setItem('currentBooking', JSON.stringify(booking));
				sessionStorage.setItem('paymentAccess', '1');
				showInlinePaymentStatus(t('status.payment.success', { code: booking.codigo_reserva }), true);

				const statusEl = document.getElementById('inline-payment-status');
				if (statusEl && !statusEl.querySelector('.js-payment-close')) {
					const closeBtn = document.createElement('button');
					closeBtn.type = 'button';
					closeBtn.className = 'btn btn-outline-secondary btn-sm mt-2 w-100 js-payment-close';
					closeBtn.textContent = 'Cerrar';
					closeBtn.addEventListener('click', () => {
						paymentModal.hide();
						pendingBookingPayload = null;
						paymentForm.reset();
						form.reset();
						form.pasajeros.value = '1';
						form.querySelector('input[name="taxiSelectionMode"][value="auto"]').checked = true;
						setManualControlsState();
						updateBookingProgress(form);
						showInlinePaymentStatus('', true);
						const statusNode = document.getElementById('inline-payment-status');
						if (statusNode) {
							statusNode.className = 'mt-3';
							statusNode.textContent = '';
						}
					});
					statusEl.appendChild(closeBtn);
				}
			});
		}

		document.addEventListener('app:languageChanged', () => {
			renderPreview(form);

			if (pendingBookingPayload) {
				const confirmContent = document.getElementById('confirm-booking-content');
				if (confirmContent) {
					confirmContent.innerHTML = createConfirmSummaryHTML(
						pendingBookingPayload.bookingData,
						pendingBookingPayload.recommendedPlan,
						pendingBookingPayload.selectedPlan,
						pendingBookingPayload.pricing
					);
				}

				const paymentSummary = document.getElementById('payment-modal-summary');
				if (paymentSummary) {
					paymentSummary.innerHTML = `
						<div class="payment-amount-box">
							<p class="mb-1 text-muted">${escapeHtml(t('booking.modal.payment.totalToPay'))}</p>
							<p class="mb-0 fs-4 fw-bold">${money(pendingBookingPayload.pricing.total)}</p>
						</div>
					`;
				}
			}
		});

		setManualControlsState();
		renderPreview(form);
		updateBookingProgress(form);
	}

	function formatExtras(extrasArray) {
		if (!extrasArray || extrasArray.length === 0) {
			return t('booking.none');
		}
		return extrasArray.map((extra) => t(extrasLabelKeys[extra] || extra)).join(', ');
	}

	function bookingPricingSnapshot(booking) {
		if (booking.pricing && typeof booking.pricing.tripCost === 'number' && typeof booking.pricing.taxiAdditionalCost === 'number') {
			return booking.pricing;
		}

		const fallbackTaxi = booking.taxiSummary?.taxiCost || 0;
		const fallbackSelection = booking.taxiSelection || { taxi1: 0, taxi2: 0, taxi3: 0 };
		const fallbackPassengers = Number.parseInt(booking.pasajeros || 1, 10);
		const selectedPlan = planner
			? planner.summarizeSelection(fallbackSelection, planner.TAXI_TYPES, fallbackPassengers)
			: { taxiCost: fallbackTaxi, totalCapacity: 0, spareSeats: 0, formattedCombination: 'Sin taxis' };

		return buildPricing({
			destino: booking.destino,
			extras: booking.extras || []
		}, selectedPlan);
	}

	function ensureManageModals() {
		if (document.getElementById('edit-modal')) {
			return;
		}

		const editModal = document.createElement('div');
		editModal.id = 'edit-modal';
		editModal.className = 'modal fade';
		editModal.setAttribute('data-bs-backdrop', 'static');
		editModal.setAttribute('data-bs-keyboard', 'false');
		editModal.innerHTML = `
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Editar reserva</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
					</div>
					<div class="modal-body">
						<form id="edit-booking-form">
							<div class="mb-3">
								<label for="edit-fecha" class="form-label">Fecha</label>
								<input type="date" class="form-control" id="edit-fecha">
							</div>
							<div class="mb-3">
								<label for="edit-hora" class="form-label">Hora</label>
								<input type="time" class="form-control" id="edit-hora">
							</div>
							<div class="mb-3">
								<label for="edit-pasajeros" class="form-label">Numero de pasajeros</label>
								<input type="number" class="form-control" id="edit-pasajeros" min="1" max="40">
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
						<button type="button" class="btn btn-primary" id="save-edit-btn">Guardar cambios</button>
					</div>
				</div>
			</div>
		`;
		document.body.appendChild(editModal);

		const cancelModal = document.createElement('div');
		cancelModal.id = 'cancel-modal';
		cancelModal.className = 'modal fade';
		cancelModal.setAttribute('data-bs-backdrop', 'static');
		cancelModal.setAttribute('data-bs-keyboard', 'false');
		cancelModal.innerHTML = `
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Cancelar reserva</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
					</div>
					<div class="modal-body">
						<p class="mb-0">¿Estas seguro de que deseas cancelar esta reserva? Se abrira tu cliente de correo para solicitar el reembolso a la empresa.</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Mantener reserva</button>
						<button type="button" class="btn btn-danger" id="confirm-cancel-btn">Si, cancelar</button>
					</div>
				</div>
			</div>
		`;
		document.body.appendChild(cancelModal);
	}

	window.renderBookingDetailsWithActions = function renderBookingDetailsWithActions(container, booking, bookingIndex) {
		if (!container) {
			return;
		}

		const pricing = bookingPricingSnapshot(booking);
		const taxiSummary = booking.taxiSummary || { formattedCombination: 'No disponible', totalCapacity: 0, spareSeats: 0, taxiCost: 0 };

		container.innerHTML = `
			<div class="card border-0 shadow-sm">
				<div class="card-body">
					<h3 class="h5 card-title mb-3">Reserva ${escapeHtml(booking.codigo_reserva)}</h3>
					<p class="mb-1"><strong>Pasajero:</strong> ${escapeHtml(booking.nombre)}</p>
					<p class="mb-1"><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
					<p class="mb-1"><strong>Telefono:</strong> ${escapeHtml(booking.telefono)}</p>
					<p class="mb-1"><strong>Origen:</strong> ${escapeHtml(booking.origen)}</p>
					<p class="mb-1"><strong>Destino:</strong> ${escapeHtml(booking.destino)}</p>
					<p class="mb-1"><strong>Fecha:</strong> ${escapeHtml(booking.fecha)}</p>
					<p class="mb-1"><strong>Hora:</strong> ${escapeHtml(booking.hora)}</p>
					<p class="mb-1"><strong>Pasajeros:</strong> ${escapeHtml(booking.pasajeros)}</p>
					<p class="mb-1"><strong>Extras:</strong> ${escapeHtml(formatExtras(booking.extras || []))}</p>
					<p class="mb-1"><strong>Taxis:</strong> ${escapeHtml(taxiSummary.formattedCombination)}</p>
					<p class="mb-1"><strong>Trayecto x taxis:</strong> ${money(pricing.tripCost || 0)}</p>
					<p class="mb-1"><strong>Coste adicional taxis:</strong> ${money(taxiSummary.taxiCost || pricing.taxiAdditionalCost || 0)}</p>
					<p class="mb-3"><strong>Total:</strong> ${money(pricing.total)}</p>
					<div class="d-flex gap-2">
						<button type="button" class="btn btn-warning btn-sm" id="edit-btn">Editar</button>
						<button type="button" class="btn btn-danger btn-sm" id="cancel-btn">Cancelar</button>
					</div>
				</div>
			</div>
		`;

		const editBtn = container.querySelector('#edit-btn');
		const cancelBtn = container.querySelector('#cancel-btn');

		if (editBtn && typeof bootstrap !== 'undefined') {
			editBtn.addEventListener('click', () => {
				const modal = new bootstrap.Modal(document.getElementById('edit-modal'));
				document.getElementById('edit-fecha').value = booking.fecha;
				document.getElementById('edit-hora').value = booking.hora;
				document.getElementById('edit-pasajeros').value = booking.pasajeros;

				const saveBtn = document.getElementById('save-edit-btn');
				saveBtn.onclick = () => {
					const bookings = getStoredBookings();
					const updatedPassengers = Number.parseInt(document.getElementById('edit-pasajeros').value || '1', 10);
					bookings[bookingIndex].fecha = document.getElementById('edit-fecha').value;
					bookings[bookingIndex].hora = document.getElementById('edit-hora').value;
					bookings[bookingIndex].pasajeros = updatedPassengers;

					if (planner) {
						const recommendation = planner.computeBestTaxiCombination(updatedPassengers);
						bookings[bookingIndex].taxiSelection = recommendation.selection;
						bookings[bookingIndex].taxiRecommendation = recommendation.selection;
						bookings[bookingIndex].taxiSummary = {
							formattedCombination: recommendation.formattedCombination,
							totalCapacity: recommendation.totalCapacity,
							spareSeats: recommendation.spareSeats,
							taxiCost: recommendation.taxiCost,
							taxiCount: recommendation.taxiCount
						};
					}

					bookings[bookingIndex].pricing = bookingPricingSnapshot(bookings[bookingIndex]);
					saveStoredBookings(bookings);
					modal.hide();
					window.location.reload();
				};

				modal.show();
			});
		}

		if (cancelBtn && typeof bootstrap !== 'undefined') {
			cancelBtn.addEventListener('click', () => {
				const modal = new bootstrap.Modal(document.getElementById('cancel-modal'));
				const confirmBtn = document.getElementById('confirm-cancel-btn');
				confirmBtn.onclick = () => {
					const bookings = getStoredBookings();
					const cancelled = bookings[bookingIndex];
					const refundEmail = cancelled?.email || '';
					const refundCode = cancelled?.codigo_reserva || '';
					bookings.splice(bookingIndex, 1);
					saveStoredBookings(bookings);
					modal.hide();

					const subject = encodeURIComponent(`Solicitud de reembolso - Reserva ${refundCode}`);
					const body = encodeURIComponent(
						`Estimado equipo de Taxi Transfer Tenerife,\n\nSolicito el reembolso correspondiente a la cancelacion de la reserva con codigo ${refundCode}.\n\nCorreo de la reserva: ${refundEmail}\n\nQuedo a la espera de sus instrucciones.\n\nGracias.`
					);
					window.location.href = `mailto:contacto@taxitransfertfs.es?subject=${subject}&body=${body}`;
				};
				modal.show();
			});
		}
	};

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
		if (bookingForm.fecha) {
			bookingForm.fecha.addEventListener('input', () => clearDateTimeValidation(bookingForm));
		}
		if (bookingForm.hora) {
			bookingForm.hora.addEventListener('input', () => clearDateTimeValidation(bookingForm));
		}

		bookingForm.addEventListener('submit', (event) => {
			if (window.bookingEnhancedFlowActive) {
				return;
			}

			event.preventDefault();
			clearDateTimeValidation(bookingForm);

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

			if (isPastBookingDateTime(formData.fecha, formData.hora)) {
				const message = t('status.bookingPastDateTime');
				if (bookingForm.hora) {
					bookingForm.hora.setCustomValidity(message);
					bookingForm.hora.reportValidity();
				}
				showFormStatus(bookingForm, message, false);
				return;
			}

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

	if (manageForm && typeof bootstrap !== 'undefined') {
		ensureManageModals();
	}

	setupBookingFlow();

	applyLanguage();
	applyTheme();
});
