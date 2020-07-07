(function exportPort() { 
    function Port(portName) {
        this.portName = portName;
        this.ships = [];
    }

    Port.prototype = {
        addShip(ship) {
            this.ships.push(ship);
        },
        removeShip(ship) {
            const removedShip =this.ships.indexOf(ship);
            this.ships.splice(removedShip, 1);
        },
    };


    if (typeof module !== 'undefined' && module.exports) {
    module.exports = Port;
    } else {
        window.Port = Port;
    }
}());
