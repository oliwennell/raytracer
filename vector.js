
Vector = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.add = function(other) {
		return new Vector(this.x+other.x, this.y+other.y, this.z+other.z);
	};

	this.sub = function(other) {
		return new Vector(this.x-other.x, this.y-other.y, this.z-other.z);
	};

	this.mul = function(other) {
		return new Vector(this.x*other.x, this.y*other.y, this.z*other.z);
	};

	this.mulScalar = function(scalar) {
		return new Vector(this.x*scalar, this.y*scalar, this.z*scalar);
	};

	this.dot = function(other) {
		return this.x * other.x + this.y * other.y + this.z * other.z;
	};

	this.cross = function(other) {
		return new Vector(
			this.y * other.z - this.z * other.y,
			this.z * other.x - this.x * other.z,
			this.x * other.y - this.y * other.x
			);
	};

	this.norm = function() {
		return this.mulScalar(1 / Math.sqrt(this.dot(this)));
	};

	this.length = function() {
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	};
};
