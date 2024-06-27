// 5-subscriber.js


import redis from "redis";
const client = redis.createClient();


client.on('connect', () => {

	const subscriber = client.duplicate();

	subscriber.on("ready", () => {
		console.log("Redis client connected to the server");
	});

	subscriber.on("error", (err) => {
		console.log("Redis client not connected to the server:", err);
	});

	subscriber.subscribe('holberton school channel', (message) => {
		console.log(message);

		if (message === "KILL_SERVER") {
			subscriber.unsubscribe();
			subscriber.quit();
		}
	});
});

client.connect;
