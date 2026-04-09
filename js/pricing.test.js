const { calculateBookingPricing } = require('./pricing');

describe('calculateBookingPricing', () => {
    it('aplica trayecto base por cada taxi seleccionado y suma extras y coste de tipo', () => {
        const pricing = calculateBookingPricing({
            destinationData: { km: 18, base: 20 },
            extrasTotal: 13,
            taxiAdditionalCost: 10,
            taxiCount: 2
        });

        expect(pricing.km).toBe(18);
        expect(pricing.basePricePerTaxi).toBe(20);
        expect(pricing.tripCost).toBe(40);
        expect(pricing.extrasTotal).toBe(13);
        expect(pricing.taxiAdditionalCost).toBe(10);
        expect(pricing.subtotal).toBe(63);
        expect(pricing.igic).toBeCloseTo(4.41, 2);
        expect(pricing.total).toBeCloseTo(67.41, 2);
    });

    it('devuelve 0 en trayecto cuando no hay taxis seleccionados', () => {
        const pricing = calculateBookingPricing({
            destinationData: { km: 55, base: 50 },
            extrasTotal: 7,
            taxiAdditionalCost: 18,
            taxiCount: 0
        });

        expect(pricing.tripCost).toBe(0);
        expect(pricing.subtotal).toBe(25);
        expect(pricing.total).toBeCloseTo(26.75, 2);
    });
});
