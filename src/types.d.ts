export interface State<Value> {
    /**
     * The current value of the state
     */
    value: Value;
    /**
     * Updates the value of the state and notifies subscribers
     * @param newValue - The new value to set
     */
    set: (newValue: Value) => void;
}

export type Effect = () => void;

export type EffectCallback = () => EffectCleanup;

export type EffectOptions = Partial<{
    /**
     * Whether to skip the effect execution
     */
    skip: boolean;
}>;

export type EffectCleanup = (() => void) | void;

export type EffectStack = Effect[];

export type GlobalState = string | number | boolean | object | null | undefined;
