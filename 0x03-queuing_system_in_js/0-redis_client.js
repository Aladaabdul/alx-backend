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
