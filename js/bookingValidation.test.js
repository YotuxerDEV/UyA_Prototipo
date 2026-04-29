// bookingValidation.test.js
// Pruebas unitarias para la función validateBookingForm.
// Cada test verifica un caso de validación del formulario de reserva.

// Importamos la función a testear desde el módulo de validación
const { validateBookingForm, isPastBookingDateTime } = require('./bookingValidation');

// Grupo de tests para validateBookingForm
describe('validateBookingForm', () => {
    // Test: formulario válido (todos los campos correctos)
    it('valida correctamente un formulario válido', () => {
        const data = {
            nombre: 'Juan Pérez',
            email: 'juan@email.com',
            telefono: '600123456',
            origen: 'TFS',
            destino: 'Hotel Tenerife',
            fecha: '2026-03-22',
            hora: '09:30',
            pasajeros: 2
        };
        // Espera que la validación sea exitosa
        expect(validateBookingForm(data)).toEqual({ valid: true, errorMsg: null, invalidField: null });
    });

    // Test: nombre vacío
    it('detecta nombre vacío', () => {
        const data = { ...base(), nombre: '' };
        // Espera error en el campo nombre
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'El nombre es obligatorio.', invalidField: 'nombre' });
    });

    // Test: email inválido
    it('detecta email inválido', () => {
        const data = { ...base(), email: 'juan@' };
        // Espera error en el campo email
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Introduce un correo electrónico válido.', invalidField: 'email' });
    });

    // Test: teléfono inválido
    it('detecta teléfono inválido', () => {
        const data = { ...base(), telefono: '123' };
        // Espera error en el campo teléfono
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Introduce un teléfono válido (solo dígitos, 9-15 números).', invalidField: 'telefono' });
    });

    // Test: origen vacío
    it('detecta origen vacío', () => {
        const data = { ...base(), origen: '' };
        // Espera error en el campo origen
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Selecciona el lugar de origen.', invalidField: 'origen' });
    });

    // Test: destino vacío
    it('detecta destino vacío', () => {
        const data = { ...base(), destino: '' };
        // Espera error en el campo destino
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'El destino es obligatorio.', invalidField: 'destino' });
    });

    // Test: destino fuera de zona permitida
    it('detecta destino fuera de zona', () => {
        const data = { ...base(), destino: 'Madrid' };
        // Espera error por destino no permitido
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Solo se permiten destinos en Tenerife, Adeje o Arona.', invalidField: 'destino' });
    });

    // Test: fecha vacía
    it('detecta fecha vacía', () => {
        const data = { ...base(), fecha: '' };
        // Espera error en el campo fecha
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Selecciona la fecha del traslado.', invalidField: 'fecha' });
    });

    // Test: hora vacía
    it('detecta hora vacía', () => {
        const data = { ...base(), hora: '' };
        // Espera error en el campo hora
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Selecciona una hora válida para el traslado.', invalidField: 'hora' });
    });

    // Test: hora con formato inválido
    it('detecta hora con formato inválido', () => {
        const data = { ...base(), hora: '25:00' };
        // Espera error en el campo hora
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'Selecciona una hora válida para el traslado.', invalidField: 'hora' });
    });

    // Test: fecha/hora anterior al momento actual
    it('detecta fecha y hora de reserva en el pasado', () => {
        const data = {
            ...base(),
            fecha: '2024-01-01',
            hora: '09:30'
        };
        // Espera error por fecha y hora anteriores al momento actual
        expect(validateBookingForm(data)).toEqual({
            valid: false,
            errorMsg: 'La fecha y hora de la reserva deben ser posteriores al momento actual.',
            invalidField: 'hora'
        });
    });

    // Test: pasajeros fuera de rango permitido
    it('detecta pasajeros fuera de rango', () => {
        const data = { ...base(), pasajeros: 0 };
        // Espera error por número de pasajeros inválido
        expect(validateBookingForm(data)).toEqual({ valid: false, errorMsg: 'El número de pasajeros debe estar entre 1 y 40.', invalidField: 'pasajeros' });
    });

    // Función auxiliar para obtener un objeto base válido
    function base() {
        return {
            nombre: 'Juan Pérez',
            email: 'juan@email.com',
            telefono: '600123456',
            origen: 'TFS',
            destino: 'Hotel Tenerife',
            fecha: '2026-03-22',
            hora: '09:30',
            pasajeros: 2
        };
    }
});

describe('isPastBookingDateTime', () => {
    it('devuelve true cuando fecha/hora es anterior al momento actual', () => {
        const now = new Date('2026-04-29T12:00:00');
        expect(isPastBookingDateTime('2026-04-29', '11:59', now)).toBe(true);
    });

    it('devuelve false cuando fecha/hora es posterior al momento actual', () => {
        const now = new Date('2026-04-29T12:00:00');
        expect(isPastBookingDateTime('2026-04-29', '12:01', now)).toBe(false);
    });
});
