import { RunService, Players } from "@rbxts/services";

class SignalConnection {
    private readonly _disconnectCallback: () => void;
    
    /**
     * Whether the connection is actively connected
     * DO NOT MUTATE
     */
    public Connected = false;

    constructor(disconnectCallback: () => void) {
        this._disconnectCallback = disconnectCallback;
    }
    
    /**
     * Disconnects the connection from the associated signal
     */
    public Disconnect(): void {
        if (!this.Connected) {
            return;
        }

        this._disconnectCallback();
        this.Connected = false;
    }
}

/**
 * Defines a signal for creating new branches
 */
class Signal<T extends unknown[]> {
    private _connections = new Array<SignalConnection>();
    private _connectionsHandlersMap = new Map<SignalConnection, (...args: T) => void>();

    private _lastFiredTick = 0;
    private _lastFiredArgs?: T;

    /**
     * Connects a callback function to the signal
     * @param onFiredCallback The callback function
     */
    public Connect(onFiredCallback: (...args: T) => void) : SignalConnection {
        const connection = new SignalConnection(() => {
            if (!this._connectionsHandlersMap.has(connection)) {
                return;
            }

            this._connectionsHandlersMap.delete(connection);

            for (let i = 0; i < this._connections.size(); i++) {
                if (this._connections[i] === connection) {
                    this._connections.remove(i);
                    break;
                }
                Players.PlayerAdded.Connect
            }
        });

        this._connectionsHandlersMap.set(connection, onFiredCallback);
        this._connections.push(connection);

        return connection;
	}

    /**
     * Disconnects all connections
     */
    public DisconnectAll() {
        // Clear the handlers mapping first so that we don't get an O(n^2) runtime complexity (see disconnect callback)
        this._connectionsHandlersMap.clear();

        for (let i = 0; i < this._connections.size(); i++) {
            this._connections[i].Disconnect();
        }

        this._connections = new Array<SignalConnection>();
    }

    /**
     * Fires the signal
     * @param args The arguments to be used for firing the signal
     */
    public Fire(...args : T) {
        this._lastFiredArgs = args;
        this._lastFiredTick = tick();

        for (let i = 0; i < this._connections.size(); i++) {
            const handlerFunction = this._connectionsHandlersMap.get(this._connections[i]);
            if (handlerFunction !== undefined) {
                coroutine.wrap<Function>(handlerFunction)(...args);
            }
        }
    }

    /**
     * Waits for the signal to be fired and then returns the parameters that were supplied
     */
    public Wait() : LuaTuple<T> {
        const lastFiredTickAtStart = this._lastFiredTick;

        while (this._lastFiredTick === lastFiredTickAtStart) {
            RunService.Heartbeat.Wait();
        }

        return this._lastFiredArgs! as LuaTuple<T>;
    }
}

export = Signal;