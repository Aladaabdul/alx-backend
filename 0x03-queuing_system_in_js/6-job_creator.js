// 6-job_creator.js

import kue from "kue";
const queue = kue.createQueue();

const user = {
	phoneNumber: "string",
	message: "string",
};


let job;

job = queue.create("push_notification_code", {
	user
}).save( (err) => {
	if (err) console.log("Notification job failed");
	else console.log(`Notification job created: ${job.id}`);
});
