// taxiPlanner.js
// Utility functions to calculate recommended taxi combinations.

(function initTaxiPlanner(globalScope) {
    const TAXI_TYPES = [
        { id: 'taxi1', label: 'Taxi 1', capacity: 4, additionalCost: 0 },
        { id: 'taxi2', label: 'Taxi 2', capacity: 6, additionalCost: 10 },
        { id: 'taxi3', label: 'Taxi 3', capacity: 8, additionalCost: 18 }
    ];

    function toSafePassengerCount(passengers) {
        const parsed = Number.parseInt(passengers, 10);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
    }

    function normalizeSelection(selection, taxiTypes) {
        return taxiTypes.reduce((acc, taxi) => {
            const value = Number.parseInt(selection?.[taxi.id] ?? 0, 10);
            acc[taxi.id] = Number.isFinite(value) && value > 0 ? value : 0;
            return acc;
        }, {});
    }

    function summarizeSelection(selection, taxiTypes = TAXI_TYPES, passengerCount = 1) {
        const normalized = normalizeSelection(selection, taxiTypes);
        const totals = taxiTypes.reduce((acc, taxi) => {
            const qty = normalized[taxi.id];
            acc.taxiCount += qty;
            acc.totalCapacity += qty * taxi.capacity;
            acc.taxiCost += qty * taxi.additionalCost;
            return acc;
        }, { taxiCount: 0, totalCapacity: 0, taxiCost: 0 });

        const spareSeats = Math.max(0, totals.totalCapacity - passengerCount);

        return {
            selection: normalized,
            taxiCount: totals.taxiCount,
            totalCapacity: totals.totalCapacity,
            spareSeats,
            taxiCost: totals.taxiCost,
            formattedCombination: formatTaxiCombination(normalized, taxiTypes)
        };
    }

    function formatTaxiCombination(selection, taxiTypes = TAXI_TYPES) {
        const normalized = normalizeSelection(selection, taxiTypes);
        const parts = taxiTypes
            .slice()
            .sort((a, b) => b.capacity - a.capacity)
            .filter((taxi) => normalized[taxi.id] > 0)
            .map((taxi) => `${normalized[taxi.id]}x ${taxi.label}`);

        return parts.length ? parts.join(' + ') : 'Sin taxis';
    }

    function computeBestTaxiCombination(passengers, taxiTypes = TAXI_TYPES) {
        const passengerCount = toSafePassengerCount(passengers);
        const minCapacity = Math.min(...taxiTypes.map((taxi) => taxi.capacity));
        const maxTaxisPerType = Math.ceil(passengerCount / minCapacity) + 2;

        let best = null;

        for (let taxi1 = 0; taxi1 <= maxTaxisPerType; taxi1 += 1) {
            for (let taxi2 = 0; taxi2 <= maxTaxisPerType; taxi2 += 1) {
                for (let taxi3 = 0; taxi3 <= maxTaxisPerType; taxi3 += 1) {
                    const candidate = { taxi1, taxi2, taxi3 };
                    const summary = summarizeSelection(candidate, taxiTypes, passengerCount);

                    if (summary.taxiCount === 0 || summary.totalCapacity < passengerCount) {
                        continue;
                    }

                    const isBetterTaxiCount = !best || summary.taxiCount < best.taxiCount;
                    const isBetterCost = best && summary.taxiCount === best.taxiCount && summary.taxiCost < best.taxiCost;
                    const isBetterSpareSeats = best && summary.taxiCount === best.taxiCount && summary.taxiCost === best.taxiCost && summary.spareSeats < best.spareSeats;

                    if (isBetterTaxiCount || isBetterCost || isBetterSpareSeats) {
                        best = {
                            ...summary,
                            passengerCount
                        };
                    }
                }
            }
        }

        return best || {
            selection: { taxi1: 0, taxi2: 0, taxi3: 0 },
            taxiCount: 0,
            totalCapacity: 0,
            spareSeats: 0,
            taxiCost: 0,
            formattedCombination: 'Sin taxis',
            passengerCount
        };
    }

    const api = {
        TAXI_TYPES,
        computeBestTaxiCombination,
        summarizeSelection,
        formatTaxiCombination,
        toSafePassengerCount
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }

    globalScope.taxiPlanner = api;
})(typeof window !== 'undefined' ? window : globalThis);
