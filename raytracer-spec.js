
describe("Raytracer", function() {

	var tolerance = 0.001;

	describe("When ray intersects a sphere", function() {

		var sphere = 
		{ 
			centre: new Vector(0,0,0),
			radius: 5 
		};
		var ray = 
		{
			origin: new Vector(0,10,0),
			direction: new Vector(0,-1,0)
		};

		var result = traceRay(ray, sphere);

		it("hit is reported", function() {
			expect(result.intersection).not.toBe(undefined);
			expect(result.intersection).not.toBe(null);
		});

		it("the closest intersection is calculated", function() {
			expect(result.intersection.x).toBeCloseTo(0, tolerance);
			expect(result.intersection.y).toBeCloseTo(5, tolerance);
			expect(result.intersection.z).toBeCloseTo(0, tolerance);
		});
	});

	describe("When ray does not intersect a sphere", function() {

		var sphere = 
		{ 
			centre: new Vector(0,20,0),
			radius: 5 
		};
		var ray = 
		{
			origin: new Vector(0,0,10),
			direction: new Vector(0,0,-1)
		};

		var result = traceRay(ray, sphere);

		it("miss is reported", function() {
			expect(result.intersection).toBe(null);
		});
	});

});