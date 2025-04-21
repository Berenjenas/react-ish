import { describe, it, expect } from "vitest";
import * as utilities from "./utilities";

describe("Utilities", () => {
	// Tests for deepEqual
	describe("deepEqual", () => {
		it("should return true for identical primitive values", () => {
			// Given
			const a = 42;
			const b = 42;

			// When
			const result = utilities.deepEqual(a, b);

			// Then
			expect(result).toEqual(true);
		});

		it("should return false for different primitive values", () => {
			// Given
			const a = 42;
			const b = 43;

			// When
			const result = utilities.deepEqual(a, b);

			// Then
			expect(result).toEqual(false);
		});

		it("should return true for deeply equal objects", () => {
			// Given
			const a = { foo: "bar", nested: { value: 42 } };
			const b = { foo: "bar", nested: { value: 42 } };

			// When
			const result = utilities.deepEqual(a, b);

			// Then
			expect(result).toEqual(true);
		});

		it("should return false for objects with different values", () => {
			// Given
			const a = { foo: "bar", nested: { value: 42 } };
			const b = { foo: "bar", nested: { value: 43 } };

			// When
			const result = utilities.deepEqual(a, b);

			// Then
			expect(result).toEqual(false);
		});

		it("should return false for objects with different keys", () => {
			// Given
			const a = { foo: "bar" };
			const b = { bar: "foo" };

			// When
			const result = utilities.deepEqual(a, b);

			// Then
			expect(result).toEqual(false);
		});

		it("should return true for deeply equal arrays", () => {
			// Given
			const a = [1, 2, { foo: "bar" }];
			const b = [1, 2, { foo: "bar" }];

			// When
			const result = utilities.deepEqual(a, b);

			// Then
			expect(result).toEqual(true);
		});

		it("should return false for arrays with different values", () => {
			// Given
			const a = [1, 2, 3];
			const b = [1, 2, 4];

			// When
			const result = utilities.deepEqual(a, b);

			// Then
			expect(result).toEqual(false);
		});

		it("should return false for null and an object", () => {
			// Given
			const a = null;
			const b = {};

			// When
			const result = utilities.deepEqual(a, b);

			// Then
			expect(result).toEqual(false);
		});

		it("should return false if object keys lengths are different", () => {
			// Given
			const a = { foo: "bar" };
			const b = { foo: "bar", baz: "qux" };

			// When
			const result = utilities.deepEqual(a, b);

			// Then
			expect(result).toEqual(false);
		});

		it("should return true for two null values", () => {
			// Given
			const a = null;
			const b = null;

			// When
			const result = utilities.deepEqual(a, b);

			// Then
			expect(result).toEqual(true);
		});
	});
});
