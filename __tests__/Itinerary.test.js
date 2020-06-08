/* globals describe it expect */
const Itinerary = require('../src/Itinerary.js');

describe('Itinerary', () => {
    it('can be instantiated', () => {
        expect(new Itinerary()).toBeInstanceOf(Object);
    })
    it('can have ports', () => {
        const dover = jest.fn();
        const stPetersburg = jest.fn();
        const itinerary = new Itinerary([dover,stPetersburg]);
        expect(itinerary.ports).toEqual([dover,stPetersburg]);
    })
});