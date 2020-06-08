(function exportController() {
    function Controller (ship) {
        this.ship = ship,
        this.initialiseSea();

        document.querySelector('#sailbutton').addEventListener('click', () => {
            this.setSail();
        });
    }
        
        Controller.prototype.initialiseSea = function initialiseSea() {
            const backgrounds = [
                '../cruise-ships-gui/images/images/water0.png',
                '../cruise-ships-gui/images/images/water1.png'
            ];
        let backgroundsIndex = 0;
        window.setInterval(() => {
            document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgroundsIndex % backgrounds.length]}')`;
            backgroundsIndex += 1;
        }, 1000);    
    };
    
    Controller.prototype.renderPorts = function(ports) {
        const portsElement = document.querySelector('#ports');
        portsElement.style.width = '0px';
        ports.forEach((port, index) => {
            const newPortElement = document.createElement('div');
            newPortElement.className = 'port';
            newPortElement.dataset.portName = port.name;
            newPortElement.dataset.portIndex = index;
            portsElement.appendChild(newPortElement);
            const portsElementWidth = parseInt(portsElement.style.width, 10);
            portsElement.style.width = `${portsElementWidth + 256}px`;
        })
    };
    
    Controller.prototype.renderShip = function() {
        const ship = this.ship;
        const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);
        const shipElement = document.querySelector('#ship');
        shipElement.style.top = `${portElement.offsetTop + 32}px`;
        shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    };
    
    Controller.prototype.setSail = function() {
        const ship = this.ship;
        const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = currentPortIndex + 1;
        const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);
        if (!nextPortElement) {
            return this.renderMessageBox('The end of the cruise!');
        }
        this.renderMessageBox(`Now departing ${ship.currentPort.name}`)
        ship.setSail();
        
        const shipElement = document.querySelector('#ship');
        const sailInterval = setInterval(() => {
            const shipLeft = parseInt(shipElement.style.left, 10);
            if (shipLeft === (nextPortElement.offsetLeft - 32)) {
                ship.dock();
                this.renderMessageBox(`Arrived at ${ship.currentPort.name}`);
                clearInterval(sailInterval);
            }
            shipElement.style.left = `${shipLeft + 1}px`; 
        }, 20);

        
    };

    Controller.prototype.renderMessageBox = function(message) {
        const messageElement = document.createElement('div');
        messageElement.id = 'message';
        messageElement.innerHTML = message;
        const viewport = document.querySelector('#viewport');
        viewport.appendChild(messageElement);

        setTimeout(() => {
            viewport.removeChild(messageElement)
        },2000); 
    };
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }

}());
