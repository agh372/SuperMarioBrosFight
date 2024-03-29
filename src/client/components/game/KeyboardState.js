const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();

        // Holds the callback functions for a key code
        this.keyMap = new Map();

        this.currentCode;

    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    getCurrentCode() {
        return this.currentCode;;
    }


    handleEvent(event,socket) {
        const {code} = event;
        this.currentCode = code;
        socket.emit('marioKeyPressed', { key : code, type : event.type });

        if (!this.keyMap.has(code)) {
            // Did not have key mapped.
            return;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    listenTo(window, socket) {
        ['keydown', 'keyup'].forEach(eventName => {

            window.addEventListener(eventName, event => {
                this.handleEvent(event,socket);
            });
        });
    }
}