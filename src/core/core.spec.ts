import { describe, it, expect, vi } from "vitest";
import * as core from ".";

describe("Core Functionality", () => {
    describe("state", () => {
        it("should create a state with initial value", () => {
            // Given
            const initialValue = 10;

            // When
            const state = core.state(initialValue);

            // Then
            expect(state.value).toEqual(initialValue);
        });

        it("should update the state value", () => {
            // Given
            const state = core.state(10);

            // When
            state.set(20);

            // Then
            expect(state.value).toEqual(20);
        });

        it("should notify subscribers on value change", () => {
            // Given
            const state = core.state(10);
            const callback = vi.fn();
            core.effect(callback);

            // When
            state.set(20);

            // Then
            expect(callback).toHaveBeenCalledTimes(1);
            expect(state.value).toEqual(20);
        });
    });

    describe("computed", () => {
        it("should create a computed state based on a callback", () => {
            // Given
            const count = core.state(2);

            // When
            const double = core.computed(() => count.value * 2);

            // Then
            expect(double.value).toEqual(4);
        });

        it("should update computed state when dependencies change", () => {
            // Given
            const count = core.state(2);
            const double = core.computed(() => count.value * 2);

            // When
            count.set(3);

            // Then
            expect(double.value).toEqual(6);
        });
    });

    describe("readonly", () => {
        it("should create a readonly version of a state", () => {
            // Given
            const count = core.state(10);

            // When
            const readonlyCount = core.readonly(count);

            // Then
            expect(readonlyCount.value).toEqual(10);

            count.set(20);

            expect(readonlyCount.value).toEqual(20);
        });
    });

    describe("watch", () => {
        it("should execute callback when watched value changes", () => {
            // Given
            const count = core.state(10);
            const callback = vi.fn();

            core.watch(() => count.value, callback);

            // When
            count.set(20);

            // Then
            expect(callback).toHaveBeenCalledWith(20, 10);
        });

        it("should not execute callback if value does not change", () => {
            // Given
            const count = core.state(10);
            const callback = vi.fn();

            core.watch(() => count.value, callback);

            // When
            count.set(10);

            // Then
            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe("effect", () => {
        it("should execute the effect immediately", () => {
            // Given
            const callback = vi.fn();

            // When
            core.effect(callback);

            // Then
            expect(callback).toHaveBeenCalledTimes(1);
        });

        it("should re-run the effect when dependencies change", () => {
            // Given
            const count = core.state(10);
            const callback = vi.fn(() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                count.value;
            });

            // When
            core.effect(callback);
            count.set(20);

            // Then
            expect(callback).toHaveBeenCalledTimes(2);
        });

        it("should call cleanup function before re-running the effect", () => {
            // Given
            const count = core.state(10);
            const cleanup = vi.fn();
            const callback = vi.fn(() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                count.value;

                return cleanup;
            });

            // When
            core.effect(callback);
            count.set(20);

            // Then
            expect(cleanup).toHaveBeenCalledTimes(1);
        });

        it("should skip the effect if skip option is set to true", () => {
            // Given
            const count = core.state(10);
            const callback = vi.fn();

            // When
            core.effect(callback, { skip: true });
            count.set(20);

            // Then
            expect(callback).not.toHaveBeenCalled();
        });
    });
});
