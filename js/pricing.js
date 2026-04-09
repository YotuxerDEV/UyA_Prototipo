// pricing.js
// Shared pricing calculator for booking previews and tests.

(function initBookingPricing(globalScope) {
    function toSafeTaxiCount(value) {
        const parsed = Number.parseInt(value, 10);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    }

    function calculateBookingPricing({
        destinationData = { km: 0, base: 0 },
        extrasTotal = 0,
        taxiAdditionalCost = 0,
        taxiCount = 0,
        igicRate = 0.07
    } = {}) {
        const basePricePerTaxi = Number(destinationData.base) || 0;
        const km = Number(destinationData.km) || 0;
        const normalizedTaxiCount = toSafeTaxiCount(taxiCount);
        const normalizedExtras = Number(extrasTotal) || 0;
        const normalizedTaxiAdditionalCost = Number(taxiAdditionalCost) || 0;

        const tripCost = basePricePerTaxi * normalizedTaxiCount;
        const subtotal = tripCost + normalizedExtras + normalizedTaxiAdditionalCost;
        const igic = subtotal * igicRate;
        const total = subtotal + igic;

        return {
            km,
            taxiCount: normalizedTaxiCount,
            basePricePerTaxi,
            tripCost,
            extrasTotal: normalizedExtras,
            taxiAdditionalCost: normalizedTaxiAdditionalCost,
            subtotal,
            igic,
            total
        };
    }

    const api = {
        calculateBookingPricing
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }

    globalScope.bookingPricing = api;
})(typeof window !== 'undefined' ? window : globalThis);
