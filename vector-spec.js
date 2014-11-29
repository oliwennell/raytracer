
describe("Vectors", function() {

	it("Can be constructed from 3D coordinates", function() {
		var v = new Vector(5, 6, 7);

		expect(v.x).toBe(5);
		expect(v.y).toBe(6);
		expect(v.z).toBe(7);
	});

	it("Can be added together", function() {
		var v1 = new Vector(1,2,3);
		var v2 = new Vector(1,2,3);

		var v3 = v1.add(v2);

		expect(v3.x).toBe(2);
		expect(v3.y).toBe(4);
		expect(v3.z).toBe(6);
	});

	it("Can be multiplied by a scalar", function() {
		var v1 = new Vector(1,2,4);

		var v2 = v1.mul(2);

		expect(v2.x).toBe(2);
		expect(v2.y).toBe(4);
		expect(v2.z).toBe(8);
	});

	it("Can have their dot product calculated", function() {
		var v1 = new Vector(1,1,1);
		var v2 = new Vector(2,2,2);

		var dot = v1.dot(v2);

		expect(dot).toBeCloseTo(6, 0.0001);
	});

	it("Can have their cross product calculated", function() {
		var v1 = new Vector(1,2,3);
		var v2 = new Vector(4,5,6);

		var v3 = v1.cross(v2);

		expect(v3.x).toBe(-3);
		expect(v3.y).toBe(6);
		expect(v3.z).toBe(-3);
	});

	it("Can be normalised", function() {
		var v = new Vector(10, 0, 0).norm();

		expect(v.x).toBe(1);
		expect(v.y).toBe(0);
		expect(v.z).toBe(0);
	});
});	