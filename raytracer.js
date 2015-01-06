
// todo: depth sorting

var traceRay = function(ray, sphere) {

	var projectPointOntoRay = function(point, ray) {
		var u = point.sub(ray.origin);	
		var rdl = ray.direction.length();
		var puv = ray.direction.mulScalar(ray.direction.dot(u) / rdl);
		return ray.origin.add(puv);
	};

	var raySphereDist = -1;
	var vpc = sphere.centre.sub(ray.origin);
	if (vpc.dot(ray.direction) < 0) {
		// point is behind ray
		raySphereDist = sphere.centre.sub(ray.origin).length();

		var vpcLen = vpc.length();
		if (vpcLen > sphere.radius) {
			return { intersection: null };
		}
		else if (vpcLen == sphere.radius) {
			// ray origin is on sphere
			return { intersection: ray.origin };
			//return { intersection: null };
		}
		else {
			// ray origin is inside sphere. TODO:
			return { intersection: null };
		}
	}
	else {
		var projection = projectPointOntoRay(sphere.centre, ray);
		if (sphere.centre.sub(projection).length() > sphere.radius) {
			return { intersection: null };
		}

		var projectionIntersectionDist = Math.sqrt(
			Math.pow(sphere.radius,2)
			- Math.pow(projection.sub(sphere.centre).length(), 2));

		var vpcLen = vpc.length();
		var distToIntersection = -1;
		if (vpcLen > sphere.radius) {
			// ray origin outside sphere
			distToIntersection = projection.sub(ray.origin).length() - projectionIntersectionDist;
		}
		else {
			// ray origin inside sphere
			distToIntersection = projection.sub(ray.origin).length() + projectionIntersectionDist;
		}
 
		var intersection = ray.origin.add(ray.direction.mulScalar(distToIntersection));
		return { intersection: intersection };
	}
};

var spheres = [
/*	{ centre: new Vector(-10,0,-10), radius: 5 },
	{ centre: new Vector(10,0,-11), radius: 5 },
	{ centre: new Vector(-10,10,-12), radius: 5 },
	{ centre: new Vector(10,10,-13), radius: 5 },
	{ centre: new Vector(-10,-10,-14), radius: 5 },
	{ centre: new Vector(10,-10,-15), radius: 5 },
	{ centre: new Vector(0,-10,-16), radius: 5 },
	{ centre: new Vector(0,0,-17), radius: 5 },
	{ centre: new Vector(0,10,-18), radius: 5 },
	*/

	{ centre: new Vector(-80,0,-40), radius: 40, color: new Vector(1,0,0), isReflective: false },
	{ centre: new Vector(0,0,0), radius: 40, color: new Vector(0.2,0.2,0.2), isReflective: true },
	{ centre: new Vector(80,0,-20), radius: 40, color: new Vector(0,0,1), isReflective: false },

];

var lights = [
	{ centre: new Vector(-20,-80,-30), radius: 220 },
	{ centre: new Vector(40,80,20), radius: 200 }
];

var reflectionCount = 0;

var sample = function(ray) {
	
	for (var sphereIndex = 0; sphereIndex < spheres.length; ++sphereIndex) {
		var sphere = spheres[sphereIndex];

		var traceResult = traceRay(ray, sphere);
		if (traceResult.intersection) {
			
			var reflection = null;
			if (sphere.isReflective && reflectionCount < 5) {
				reflectionCount++;

				var surfaceNorm = traceResult.intersection.sub(sphere.centre).norm();					
				reflection = sample({ origin: traceResult.intersection.add(surfaceNorm), direction: surfaceNorm });

				reflectionCount--;
			}
			
			var brightness = 0;
			
			for (var lightIndex = 0; lightIndex < lights.length; ++lightIndex) {
				var light = lights[lightIndex];
				var lightDist = light.centre.sub(traceResult.intersection).length();
				if (lightDist <= light.radius) {

					var surfaceNorm = traceResult.intersection.sub(sphere.centre).norm();
			
					var lightDir = light.centre.sub(traceResult.intersection).norm();
					var b = lightDir.dot(surfaceNorm);	
					b *= 1 - (lightDist / light.radius);

					brightness += b;
				}
			}

			if (brightness > 1)
				brightness = 1;

			var result = sphere.color.mulScalar(brightness);

			if (reflection)
				result = result.add(reflection);

			return result;
		}
	}

	return ray.direction.y > 0 ? 
		new Vector(0,105/255,14/255).mulScalar(ray.direction.y) : 
		new Vector(42/255,76/255,81/255).mulScalar(ray.direction.y*-1);
}