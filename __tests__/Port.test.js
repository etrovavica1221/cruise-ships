/* globals describe it expect */
const Port = require('../src/Port.js')

describe('Port', () => { 
    describe('with ports and ships', () => {
        let port;
        let portOne;
        let ship;
        let titanic;
        let queenMary;

        beforeEach(() => {
            port = new Port('Dover');
            portOne = new Port('St.Petersburg'); 
            ship = jest.fn();
            titanic = jest.fn();
            queenMary = jest.fn();
        })

        it('can be instantiated', () => {
        expect(new Port()).toBeInstanceOf(Object);
        })
        it('Port object has a name property', () => {
        expect(port.name).toBe('Dover');
        expect(portOne.name).toBe('St.Petersburg');
        })
        it('can add a ship', () => {
        port.addShip(ship);
        expect(port.ships).toContain(ship);
        })
        it('can remove a ship', () => {  
        port.addShip(titanic);
        port.addShip(queenMary);
        port.removeShip(queenMary);
        expect(port.ships).toEqual([titanic]);
        })
    });
});