const { computeBestTaxiCombination, summarizeSelection } = require('./taxiPlanner');

describe('computeBestTaxiCombination', () => {
    it('elige 1 Taxi 1 para 4 pasajeros', () => {
        const result = computeBestTaxiCombination(4);
        expect(result.selection).toEqual({ taxi1: 1, taxi2: 0, taxi3: 0 });
        expect(result.taxiCount).toBe(1);
        expect(result.taxiCost).toBe(0);
    });

    it('elige 1 Taxi 2 para 5 pasajeros minimizando numero de taxis', () => {
        const result = computeBestTaxiCombination(5);
        expect(result.selection).toEqual({ taxi1: 0, taxi2: 1, taxi3: 0 });
        expect(result.taxiCount).toBe(1);
        expect(result.totalCapacity).toBe(6);
    });

    it('elige 1 Taxi 3 para 8 pasajeros', () => {
        const result = computeBestTaxiCombination(8);
        expect(result.selection).toEqual({ taxi1: 0, taxi2: 0, taxi3: 1 });
        expect(result.taxiCount).toBe(1);
        expect(result.taxiCost).toBe(18);
    });

    it('soporta mas de 8 pasajeros y minimiza primero taxis luego coste', () => {
        const result = computeBestTaxiCombination(12);
        expect(result.taxiCount).toBe(2);
        expect(result.selection).toEqual({ taxi1: 1, taxi2: 0, taxi3: 1 });
        expect(result.taxiCost).toBe(18);
    });

    it('para 9 pasajeros elige 2 taxis con menor coste posible', () => {
        const result = computeBestTaxiCombination(9);
        expect(result.taxiCount).toBe(2);
        expect(result.selection).toEqual({ taxi1: 1, taxi2: 1, taxi3: 0 });
        expect(result.taxiCost).toBe(10);
    });
});

describe('summarizeSelection', () => {
    it('calcula capacidad y coste de una seleccion manual', () => {
        const summary = summarizeSelection({ taxi1: 1, taxi2: 0, taxi3: 1 }, undefined, 10);
        expect(summary.taxiCount).toBe(2);
        expect(summary.totalCapacity).toBe(12);
        expect(summary.spareSeats).toBe(2);
        expect(summary.taxiCost).toBe(18);
        expect(summary.formattedCombination).toBe('1x Taxi 3 + 1x Taxi 1');
    });
});
