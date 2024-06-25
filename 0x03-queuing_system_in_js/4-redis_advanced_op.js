// Coonect redis Server

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

redisclient.hset("HolbertonSchools", "Portland", 50, redis.print);
redisclient.hset("HolbertonSchools", "Seattle", 80, redis.print);
redisclient.hset("HolbertonSchools", "New York", 20, redis.print);
redisclient.hset("HolbertonSchools", "Bogota", 20, redis.print);
redisclient.hset("HolbertonSchools", "Cali", 40, redis.print);
redisclient.hset("HolbertonSchools", "Paris", 2, redis.print);

redisclient.hgetall("HolbertonSchools", (err, value) => {
	if (err) console.log(err);
	else {
		console.log(value);
	}
});
