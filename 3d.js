var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
c.lineWidth = 1;

var angles = [0, 0, 0];
var point = [0, 0, 0];
var FOV = 91;
var multiplier = 0;

var offset = 400;
var speed = 5;

var distanceI = 0;
var distanceC = 0;
var animate = true;

console.log("Set `animate = false` to use arrow keys")

setInterval(function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Draw first box
	show3D(-1, -1, -1, 1, -1, -1, angles[0], angles[1], angles[2], distanceC);
	show3D(-1, 1, -1, 1, 1, -1, angles[0], angles[1], angles[2], distanceC);
	show3D(-1, -1, -1, -1, 1, -1, angles[0], angles[1], angles[2], distanceC);
	show3D(1, -1, -1, 1, 1, -1, angles[0], angles[1], angles[2], distanceC);

	// Draw Inner box
	show3D(-1, 1, 1, 1, 1, 1, angles[0], angles[1], angles[2], distanceC);
	show3D(-1, -1, 1, 1, -1, 1, angles[0], angles[1], angles[2], distanceC);
	show3D(-1, -1, 1, -1, 1, 1, angles[0], angles[1], angles[2], distanceC);
	show3D(1, -1, 1, 1, 1, 1, angles[0], angles[1], angles[2], distanceC);

	// Draw
	show3D(-1, -1, -1, -1, -1, 1, angles[0], angles[1], angles[2], distanceC);
	show3D(1, -1, -1, 1, -1, 1, angles[0], angles[1], angles[2], distanceC);
	show3D(1, -1, -1, 1, -1, 1, angles[0], angles[1], angles[2], distanceC);
	show3D(1, 1, -1, 1, 1, 1, angles[0], angles[1], angles[2], distanceC);
	show3D(-1, 1, -1, -1, 1, 1, angles[0], angles[1], angles[2], distanceC);

	if (animate) {
		angles[0] += .1;
		angles[1] += .1;

		distanceC = Math.sin(distanceI) + 4;
		distanceI += .01;
	}
}, 1);

document.onkeydown = function(event) {
	if (event.key == "ArrowUp") {
		angles[0] += speed;
	} else if (event.key == "ArrowDown") {
		angles[0] -= speed;
	} else if (event.key == "ArrowRight") {
		angles[1] += speed;
	} else if (event.key == "ArrowLeft") {
		angles[1] -= speed;
	}
}

document.getElementById("test").innerHTML = rotateCube(1, 1, 1, toRad(1), toRad(1), toRad(1));

function show3D(x1, y1, z1, x2, y2, z2, angleX, angleY, angleZ, distance) {

	angleX = toRad(angleX);
	angleY = toRad(angleY);
	angleZ = toRad(angleZ);

	var points = [0, 0, 0, 0];

	rotateCube(x1, y1, z1, angleX, angleY, angleZ);
	multiplier = 240 / ((point[2] + distance) * Math.tan(toRad(FOV) / 2));
	points[0] = point[0] * multiplier;
	points[1] = point[1] * multiplier;

	rotateCube(x2, y2, z2, angleX, angleY, angleZ);
	multiplier = 240 / ((point[2] + distance) * Math.tan(toRad(FOV) / 2));
	points[2] = point[0] * multiplier;
	points[3] = point[1] * multiplier;

	line(
		points[0] + offset,
		points[1] + offset,
		points[2] + offset,
		points[3] + offset
	);
}

function rotate(x, y, angle) {
	var rotatedX = (x * Math.cos(angle)) + (y * Math.sin(angle));
	var rotatedY = (y * Math.cos(angle)) - (x * Math.sin(angle));
	return [rotatedX, rotatedY];
}

function rotateCube(x, y, z, angleX, angleY, angleZ) {
	var return2;
	return2 = rotate(x, y, angleZ);
	point[0] = return2[0];
	point[1] = return2[1];
	return2 = rotate(point[0], z, angleY);
	point[0] = return2[0];
	point[2] = return2[1];
	return2 = rotate(point[2], point[1], angleX);
	point[2] = return2[0];
	point[1] = return2[1];
	return point
}

function toRad(angle) {
	return angle * (Math.PI / 180);
}

function line(x, y, x1, y2) {
	c.beginPath();
	c.moveTo(x, y);
	c.lineTo(x1, y2);
	c.stroke();
}
