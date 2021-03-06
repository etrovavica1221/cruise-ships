(function exportController() {
    function Controller (ship) {
        this.ship = ship,
        this.initialiseSea();

        document.querySelector('#sailbutton').addEventListener('click', () => {
            this.setSail();
        });

        document.querySelector("#add_button").addEventListener('click', (e) => {
            e.preventDefault();
            this.addPort();
            this.renderPorts(ship.itinerary.ports);
            this.renderShip();
            this.renderMessageBox("Added to itinerary");
            document.getElementById("input-port").value = "";
        });
    }
        
        Controller.prototype.initialiseSea = function() {
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
            if (!document.querySelector(`[data-port-name=${port.portName}]`)) {
                const newPortElement = document.createElement('div');
            
                newPortElement.className = 'port';
                newPortElement.dataset.portName = port.portName;
                newPortElement.dataset.portIndex = index;
                portsElement.appendChild(newPortElement);
                //const portsElementWidth = parseInt(portsElement.style.width, 10);
                const portsElementWidth = 300;
                portsElement.style.width = `${portsElementWidth + 256}px`;
            }
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
        this.renderMessageBox(`Now departing ${ship.currentPort.portName}`);
        ship.setSail();
        
        const shipElement = document.querySelector('#ship');
        const sailInterval = setInterval(() => {
            const shipLeft = parseInt(shipElement.style.left, 10);
            if (shipLeft === (nextPortElement.offsetLeft - 32)) {
                ship.dock();
                this.setDisplay();
                clearInterval(sailInterval);
            }
            shipElement.style.left = `${shipLeft + 1}px`; 
        }, 20);
     
    };

    Controller.prototype.renderMessageBox = function(message) {
        const messageElement = document.createElement('div');
        messageElement.id = 'message';
        messageElement.innerHTML = message;
        const display = document.querySelector('#display');
        display.appendChild(messageElement);

        setTimeout(() => {
            display.removeChild(messageElement)
        },1200); 
    };

    Controller.prototype.setDisplay = function() {
        this.ship = ship;
        const currentPortP = document.getElementById('currentPort');
        const nextPortP = document.getElementById('nextPort');
        const nextPortIndex = ship.itinerary.ports.indexOf(ship.currentPort) + 1;
        
        const currentPortMessage = `Current Port: ${ship.currentPort.portName}`;


        if (nextPortIndex < ship.itinerary.ports.length) {
            const nextPortMessage = `Next Port: ${ship.itinerary.ports[nextPortIndex].portName}`;
            nextPortP.innerText = nextPortMessage;
        } else {
                nextPortP.innerText = 'The end of the cruise!';  
            }
        currentPortP.innerText = currentPortMessage;
    };

    Controller.prototype.addPort = function() {
        const ship = this.ship;
        const newPort = document.getElementById('input-port').value.replace(/\s/g, "");
        const portObj = new Port(newPort)

        if (!newPort) {
            return this.renderMessageBox('At least two ports are required!');
        } else{
            ship.itinerary.ports.push(portObj);
        }

        if (!ship.currentPort) {
            ship.currentPort = ship.itinerary.ports[0];
        }
    };
      
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }

}());
