// 1-redis_op.js

import redis from "redis";
const redisclient = redis.createClient();


(async () => {
	await redisclient.connect;
})();

redisclient.on("ready", () => {
	console.log("Redis client connected to the server");
});

redisclient.on("error", (err) => {
	console.log("Redis client not connected to the server:", err)
});

function setNewSchool(schoolName, value) {
	redisclient.set(schoolName, value, redis.print);
};

const displaySchoolValue = async (schoolName) => {
	redisclient.get(schoolName, (err, value) => {
		if (err) console.log(err);
		else console.log(value);
	})
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
