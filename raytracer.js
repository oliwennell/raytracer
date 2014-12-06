
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