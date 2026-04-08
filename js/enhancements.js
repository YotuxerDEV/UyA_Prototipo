// enhancements.js
// Características avanzadas: cálculo de precios por distancia, gestión de extras, edición y cancelación de reservas

document.addEventListener('DOMContentLoaded', () => {
    const BOOKING_STORAGE_KEY = 'taxiTransferBookings';
    const PAYMENT_ACCESS_KEY = 'paymentAccess';
    
    // Precios base por distancia aproximada desde el aeropuerto (EUR)
    // Estimación de km desde Tenerife Sur (TFS) a cada destino
    const destinoPrices = {
        'Costa Adeje': { km: 18, base: 25 },
        'Los Cristianos': { km: 22, base: 30 },
        'Playa de las Americas': { km: 20, base: 28 },
        'El Médano': { km: 15, base: 22 },
        'Santa Cruz de Tenerife': { km: 80, base: 65 },
        'Puerto de la Cruz': { km: 90, base: 75 },
        'La Laguna': { km: 85, base: 70 },
        'Los Gigantes': { km: 55, base: 50 },
        'Vilaflor': { km: 42, base: 45 },
        'San Miguel': { km: 48, base: 48 },
        'Garachico': { km: 100, base: 85 },
        'Puerto del Rosario': { km: 5, base: 15 },
        'Icod de los Vinos': { km: 95, base: 80 },
        'Candelaria': { km: 70, base: 60 },
        'Arafo': { km: 35, base: 38 }
    };

    // Nombres legibles de extras con precios
    const extrasNames = {
        wheelchair: 'Silla de ruedas',
        babySeat: 'Silla de bebé',
        booster: 'Elevador infantil',
        pet: 'Mascota a bordo'
    };

    const extrasPrices = {
        wheelchair: 6,
        babySeat: 8,
        booster: 5,
        pet: 7
    };

    function getLocaleText() {
        const lang = (document.documentElement.getAttribute('lang') || 'es').toLowerCase();
        const en = lang.startsWith('en');
        return {
            summaryTitle: en ? 'Price Summary' : 'Resumen de Precio',
            distance: en ? 'Estimated distance' : 'Distancia estimada',
            baseFare: en ? 'Base fare' : 'Tarifa base',
            passengers: en ? 'Passengers' : 'Pasajeros',
            optionalExtras: en ? 'Optional extras' : 'Extras opcionales',
            igic: en ? 'IGIC (7%)' : 'IGIC (7%)',
            totalEstimated: en ? 'Estimated total' : 'Total estimado',
            bookingCode: en ? 'BOOKING CODE' : 'CÓDIGO DE RESERVA',
            transferDetails: en ? 'Transfer details' : 'Detalles del traslado',
            extras: en ? 'Extras' : 'Extras',
            km: en ? 'km' : 'km'
        };
    }

    // Renderizar preview de precio en booking.html
    function renderPreview(form) {
        const previewContainer = document.getElementById('booking-summary');
        if (!previewContainer) return;
        const text = getLocaleText();

        // Detectar si está en modo oscuro
        const isDarkMode = document.body.classList.contains('theme-dark');
        
        // Colores según el tema
        const colors = {
            cardBg: isDarkMode ? 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)' : 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
            textPrimary: isDarkMode ? '#e0e0e0' : '#555',
            textSecondary: isDarkMode ? '#aaa' : '#495057',
            distanceBg: isDarkMode ? 'rgba(100, 181, 246, 0.15)' : 'rgba(13, 110, 253, 0.08)',
            distanceText: isDarkMode ? '#64b5f6' : '#0d6efd',
            normalBg: isDarkMode ? 'rgba(200, 200, 200, 0.08)' : 'rgba(108, 117, 125, 0.08)',
            greenBg: isDarkMode ? 'rgba(76, 175, 80, 0.15)' : 'rgba(25, 135, 84, 0.08)',
            greenText: isDarkMode ? '#81c784' : '#198754',
            separatorColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#dee2e6',
            orangeBg: isDarkMode ? 'rgba(255, 193, 7, 0.15)' : 'rgba(255, 193, 7, 0.08)',
            orangeText: isDarkMode ? '#ffb74d' : '#ff9800',
            totalGradient: isDarkMode ? 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)' : 'linear-gradient(135deg, #0d6efd 0%, #0056b3 100%)',
            totalText: '#ffd166',
            titleColor: isDarkMode ? '#ffffff' : '#333'
        };

        const destino = form.destino?.value || '';
        const pasajeros = parseInt(form.pasajeros?.value || 1);
        const extrasChecked = Array.from(form.querySelectorAll('input[name="extras"]:checked'));
        
        const destData = destinoPrices[destino];
        const basePrice = destData ? destData.base : 0;
        const km = destData ? destData.km : 0;
        
        const extrasTotal = extrasChecked.reduce((sum, item) => {
            const price = extrasPrices[item.value] || 0;
            return sum + price;
        }, 0);
        
        const subtotal = basePrice + extrasTotal;
        const igic = subtotal * 0.07; // 7% IGIC
        const total = subtotal + igic;

        previewContainer.innerHTML = `
            <div class="card border-0 shadow-lg" style="position: sticky; top: calc(82px + 1rem); width: 100%; background: ${colors.cardBg};">
                <div class="card-body" style="padding: 1.5rem;">
                    <h3 class="h5 mb-4" style="font-weight: 700; color: ${colors.titleColor}; display: flex; align-items: center; gap: 0.5rem;">
                        💰 ${text.summaryTitle}
                    </h3>
                    
                    <div style="display: grid; gap: 1rem; font-size: 0.95em;">
                        <!-- Distancia -->
                        <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: ${colors.distanceBg}; border-radius: 0.5rem; border-left: 4px solid ${colors.distanceText};">
                            <span style="color: ${colors.textPrimary}; font-weight: 500;">${text.distance}:</span>
                            <span style="font-weight: 700; color: ${colors.distanceText};">${km > 0 ? km + ' ' + text.km : '—'}</span>
                        </div>
                        
                        <!-- Tarifa base -->
                        <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: ${colors.normalBg}; border-radius: 0.5rem;">
                            <span style="color: ${colors.textPrimary}; font-weight: 500;">${text.baseFare}:</span>
                            <span style="font-weight: 700; color: ${colors.textSecondary};">${basePrice.toFixed(2)} EUR</span>
                        </div>
                        
                        <!-- Pasajeros -->
                        <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: ${colors.normalBg}; border-radius: 0.5rem;">
                            <span style="color: ${colors.textPrimary}; font-weight: 500;">${text.passengers}:</span>
                            <span style="font-weight: 700; color: ${colors.textSecondary};">${pasajeros}x</span>
                        </div>
                        
                        <!-- Extras Totales -->
                        <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: ${extrasTotal > 0 ? colors.greenBg : colors.normalBg}; border-radius: 0.5rem;">
                            <span style="color: ${colors.textPrimary}; font-weight: 500;">${text.optionalExtras}:</span>
                            <span style="font-weight: 700; color: ${extrasTotal > 0 ? colors.greenText : colors.textSecondary};">${extrasTotal > 0 ? '+' : ''}${extrasTotal.toFixed(2)} EUR</span>
                        </div>
                        
                        <!-- Separador -->
                        <div style="border-top: 2px dashed ${colors.separatorColor}; margin: 0.5rem 0;"></div>
                        
                        <!-- IGIC -->
                        <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: ${colors.orangeBg}; border-radius: 0.5rem;">
                            <span style="color: ${colors.textPrimary}; font-weight: 500;">${text.igic}:</span>
                            <span style="font-weight: 700; color: ${colors.orangeText};">${igic.toFixed(2)} EUR</span>
                        </div>
                        
                        <!-- Total -->
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: ${colors.totalGradient}; border-radius: 0.75rem; margin-top: 0.5rem;">
                            <span style="color: #fff; font-weight: 700; font-size: 1.05em;">${text.totalEstimated}:</span>
                            <span style="color: ${colors.totalText}; font-weight: 700; font-size: 1.25em;">${total.toFixed(2)} EUR</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Escuchar cambios en el formulario (booking.html)
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('change', () => renderPreview(bookingForm));
        bookingForm.addEventListener('input', () => renderPreview(bookingForm));
        renderPreview(bookingForm);
        
        // Observar cambios en el tema oscuro y re-renderizar preview
        const observer = new MutationObserver(() => {
            renderPreview(bookingForm);
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        const langObserver = new MutationObserver(() => {
            renderPreview(bookingForm);
        });
        langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }

    // Formatear extras con nombres legibles
    function formatExtras(extrasArray) {
        if (!extrasArray || extrasArray.length === 0) return 'Ninguno';
        return extrasArray.map(ext => extrasNames[ext] || ext).join(', ');
    }

    // Función para mostrar mail-popup
    function showMailPopup(subject, message, type = 'success') {
        const popup = document.createElement('div');
        popup.className = 'mail-popup';
        popup.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            max-width: 350px;
            z-index: 10000;
            font-family: system-ui, -apple-system, sans-serif;
        `;
        popup.innerHTML = `
            <div style="color: ${type === 'success' ? '#155724' : '#721c24'};">
                <h5 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">📧 ${subject}</h5>
                <p style="margin: 0; font-size: 0.9rem; line-height: 1.4;">${message}</p>
            </div>
        `;
        document.body.appendChild(popup);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            popup.style.transition = 'opacity 0.3s ease-out';
            popup.style.opacity = '0';
            setTimeout(() => popup.remove(), 300);
        }, 5000);
    }

    // Actualizar manage-booking.html con funcionalidad de editar/cancelar
    const manageForm = document.getElementById('manage-form');
    if (manageForm) {
        manageForm.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        // Crear modal para editar
        const editModal = document.createElement('div');
        editModal.id = 'edit-modal';
        editModal.className = 'modal fade';
        editModal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">✏️ Editar Reserva</h5>
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
                                <label for="edit-pasajeros" class="form-label">Número de Pasajeros</label>
                                <input type="number" class="form-control" id="edit-pasajeros" min="1" max="8">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="save-edit-btn">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(editModal);

        // Modal para confirmar cancelación
        const cancelModal = document.createElement('div');
        cancelModal.id = 'cancel-modal';
        cancelModal.className = 'modal fade';
        cancelModal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">❌ Cancelar Reserva</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>¿Estás seguro de que deseas cancelar esta reserva? Esta acción no se puede deshacer.</p>
                        <p style="font-size: 0.9em; color: #666;">Se te enviará un correo de confirmación de la cancelación.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No, mantener reserva</button>
                        <button type="button" class="btn btn-danger" id="confirm-cancel-btn">Sí, cancelar reserva</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(cancelModal);
    }

    // Exponer función para renderizar detalles con botones de editar/cancelar
    window.renderBookingDetailsWithActions = function(container, booking, bookingIndex) {
        if (!container) return;

        container.innerHTML = `
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <h3 class="h5 card-title mb-3" style="font-weight: 600;">✈️ Reserva ${booking.codigo_reserva}</h3>
                    <dl style="display: grid; gap: 0.75rem; font-size: 0.95em;">
                        <div><dt style="font-weight: 600; color: #007bff;">Pasajero:</dt><dd style="margin-left: 0;">${booking.nombre}</dd></div>
                        <div><dt style="font-weight: 600; color: #007bff;">Email:</dt><dd style="margin-left: 0;">${booking.email}</dd></div>
                        <div><dt style="font-weight: 600; color: #007bff;">Teléfono:</dt><dd style="margin-left: 0;">${booking.telefono}</dd></div>
                        <div style="border-top: 1px solid #ddd; padding-top: 0.5rem; margin-top: 0.5rem;"><dt style="font-weight: 600; color: #007bff;">Origen:</dt><dd style="margin-left: 0;">${booking.origen}</dd></div>
                        <div><dt style="font-weight: 600; color: #007bff;">Destino:</dt><dd style="margin-left: 0;">${booking.destino}</dd></div>
                        <div><dt style="font-weight: 600; color: #007bff;">Fecha:</dt><dd style="margin-left: 0;">${booking.fecha}</dd></div>
                        <div><dt style="font-weight: 600; color: #007bff;">Hora:</dt><dd style="margin-left: 0;">${booking.hora}</dd></div>
                        <div><dt style="font-weight: 600; color: #007bff;">Pasajeros:</dt><dd style="margin-left: 0;">${booking.pasajeros}</dd></div>
                        ${booking.extras && booking.extras.length > 0 ? `<div><dt style="font-weight: 600; color: #007bff;">Extras:</dt><dd style="margin-left: 0;">${formatExtras(booking.extras)}</dd></div>` : ''}
                        ${booking.peticiones ? `<div><dt style="font-weight: 600; color: #007bff;">Solicitudes:</dt><dd style="margin-left: 0;">${booking.peticiones}</dd></div>` : ''}
                    </dl>
                    <div class="mt-4 d-flex gap-2">
                        <button type="button" class="btn btn-warning btn-sm" id="edit-btn" data-booking-index="${bookingIndex}">✏️ Editar</button>
                        <button type="button" class="btn btn-danger btn-sm" id="cancel-btn" data-booking-index="${bookingIndex}">❌ Cancelar</button>
                    </div>
                </div>
            </div>
        `;

        // Event listeners para botones
        const editBtn = container.querySelector('#edit-btn');
        const cancelBtn = container.querySelector('#cancel-btn');

        if (editBtn) {
            editBtn.addEventListener('click', () => {
                const modal = new bootstrap.Modal(document.getElementById('edit-modal'));
                document.getElementById('edit-fecha').value = booking.fecha;
                document.getElementById('edit-hora').value = booking.hora;
                document.getElementById('edit-pasajeros').value = booking.pasajeros;

                const saveBtn = document.getElementById('save-edit-btn');
                saveBtn.onclick = () => {
                    const bookings = JSON.parse(localStorage.getItem(BOOKING_STORAGE_KEY)) || [];
                    bookings[bookingIndex].fecha = document.getElementById('edit-fecha').value;
                    bookings[bookingIndex].hora = document.getElementById('edit-hora').value;
                    bookings[bookingIndex].pasajeros = parseInt(document.getElementById('edit-pasajeros').value);
                    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings));
                    modal.hide();
                    showMailPopup('Reserva Actualizada', `Tu reserva ${booking.codigo_reserva} ha sido actualizada exitosamente.`, 'success');
                    setTimeout(() => location.reload(), 2000);
                };

                modal.show();
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                const modal = new bootstrap.Modal(document.getElementById('cancel-modal'));
                const confirmBtn = document.getElementById('confirm-cancel-btn');
                confirmBtn.onclick = () => {
                    const bookings = JSON.parse(localStorage.getItem(BOOKING_STORAGE_KEY)) || [];
                    bookings.splice(bookingIndex, 1);
                    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings));
                    modal.hide();
                    showMailPopup('Reserva Cancelada', `Tu reserva ${booking.codigo_reserva} ha sido cancelada. Se te reembolsará el dinero en 5-7 días.`, 'error');
                    setTimeout(() => location.reload(), 2000);
                };
                modal.show();
            });
        }
    };

    // Simular pago (payment.html)
    const paymentForm = document.getElementById('payment-form');
    
    // Función para renderizar resumen de pago
    window.renderPaymentSummary = function() {
        const summaryContainer = document.getElementById('payment-summary');
        if (!summaryContainer) return;
        const text = getLocaleText();
        
        const bookingData = sessionStorage.getItem('currentBooking');
        if (!bookingData) return;
        
        const booking = JSON.parse(bookingData);
        const destData = destinoPrices[booking.destino];
        const basePrice = destData ? destData.base : 0;
        const km = destData ? destData.km : 0;
        
        const extrasTotal = (booking.extras || []).reduce((sum, ext) => {
            return sum + (extrasPrices[ext] || 0);
        }, 0);
        
        const subtotal = basePrice + extrasTotal;
        const igic = subtotal * 0.07;
        const total = subtotal + igic;
        
        let extrasHTML = '';
        if (booking.extras && booking.extras.length > 0) {
            extrasHTML = booking.extras.map(ext => {
                const price = extrasPrices[ext] || 0;
                const label = extrasNames[ext] || ext;
                return `<div style="display: flex; justify-content: space-between; padding: 0.5rem 0;">
                    <span>+ ${label}:</span>
                    <span>${(price).toFixed(2)} EUR</span>
                </div>`;
            }).join('');
        }
        
        summaryContainer.innerHTML = `
            <div class="card border-0" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #fff;">
                <div class="card-body" style="padding: 2rem;">
                    <div style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid rgba(255,255,255,0.1);">
                        <p style="margin: 0; font-size: 0.9em; color: #aaa;">${text.bookingCode}</p>
                        <h2 style="margin: 0.5rem 0 0 0; font-size: 1.8em; font-weight: bold; color: #ffd166;">${booking.codigo_reserva}</h2>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <p style="margin: 0 0 1rem 0; font-weight: 600; color: #ccc;">${text.transferDetails}</p>
                        <div style="display: grid; gap: 0.75rem; font-size: 0.95em;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: #bbb;">${text.distance}:</span>
                                <span style="font-weight: 600;">${km} ${text.km}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.1);">
                                <span style="color: #bbb;">${text.baseFare}:</span>
                                <span style="font-weight: 600;">${basePrice.toFixed(2)} EUR</span>
                            </div>
                            ${booking.extras && booking.extras.length > 0 ? `
                                <div style="color: #aaa;">
                                    ${extrasHTML}
                                </div>
                            ` : `
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: #bbb;">${text.extras}:</span>
                                    <span style="font-weight: 600;">0.00 EUR</span>
                                </div>
                            `}
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: #bbb;">${text.passengers}:</span>
                                <span style="font-weight: 600;">${booking.pasajeros}x</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="padding-top: 1rem; border-top: 2px solid rgba(255,255,255,0.2);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.9em;">
                            <span style="color: #bbb;">${text.igic}:</span>
                            <span style="color: #bbb;">${igic.toFixed(2)} EUR</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 1.3em; font-weight: bold;">
                            <span style="color: #fff;">${text.totalEstimated}:</span>
                            <span style="color: #ffd166;">${total.toFixed(2)} EUR</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cardNumber = document.getElementById('card-number').value;
            if (!/^\d{13,19}$/.test(cardNumber.replace(/\s/g, ''))) {
                showMailPopup('Error en el Pago', 'El número de tarjeta no es válido. Por favor, verifica e intenta de nuevo.', 'error');
                return;
            }
            showMailPopup('¡Pago Exitoso!', '¡Tu pago ha sido procesado correctamente! Tu reserva está confirmada.', 'success');
            sessionStorage.removeItem(PAYMENT_ACCESS_KEY);
            sessionStorage.removeItem('currentBooking');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        });
    }

    // Validar acceso a payment.html
    if (window.location.pathname.includes('payment.html')) {
        if (!sessionStorage.getItem(PAYMENT_ACCESS_KEY)) {
            window.location.href = 'booking.html';
        }
    }
});
