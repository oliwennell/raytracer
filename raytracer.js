
var traceRay = function(ray, sphere) {

	var projectPointOntoRay = function(point, ray) {
		// projection = point + point * (point - ray.origin) * ray.direction
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
			return { intersection: ray.origin };
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
	{ centre: new Vector(-10,0,-10), radius: 5 },
	{ centre: new Vector(10,0,-10), radius: 5 },
	{ centre: new Vector(-10,10,-10), radius: 5 },
	{ centre: new Vector(10,10,-10), radius: 5 },
	{ centre: new Vector(-10,-10,-10), radius: 5 },
	{ centre: new Vector(10,-10,-10), radius: 5 },
	{ centre: new Vector(0,-10,-10), radius: 5 },
	{ centre: new Vector(0,0,-10), radius: 5 },
	{ centre: new Vector(0,10,-10), radius: 5 },
];

var light = {
	centre: new Vector(0,0,20),
	radius: 50
};

var sample = function(ray) {
	for (var sphereIndex = 0; sphereIndex < spheres.length; ++sphereIndex) {
		var sphere = spheres[sphereIndex];

		var traceResult = traceRay(ray, sphere);
		if (traceResult.intersection) {
			
			var brightness = 0;
			
			var lightDist = light.centre.sub(traceResult.intersection).length();
			if (lightDist <= light.radius) {

				var lightDir = light.centre.sub(traceResult.intersection).norm();
				var surfaceNorm = traceResult.intersection.sub(sphere.centre).norm();
				brightness += lightDir.dot(surfaceNorm);	

				brightness *= 1 - (lightDist / light.radius);
			}

			return new Vector(brightness,0,0);
		}
	}
	return new Vector(0,0,0);
}