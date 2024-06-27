import kue from "kue"
import { expect } from "chai"
import createPushNotificationsJobs from "./8-job.js";
const queue = kue.createQueue();

describe("Test Kue", () => {

	before(() => {
		queue.testMode.enter();
	});

	afterEach(() => {
		queue.testMode.clear();
	});

	after(() => {
		queue.testMode.exit()
	});

	it('display a error message if jobs is not array', () => {
		expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
	});

	it('creates jobs if jobs is an array', () => {
		const jobs = [
			{
				phoneNumber: "4153518780",
				message: "new message"
			},
			{
				phoneNumber: "41999",
				message: "criminal"
			}
		];

		createPushNotificationsJobs(jobs, queue);

		expect(queue.testMode.jobs.length).to.equal(jobs.length);
		expect(queue.testMode.jobs[0].type).to.equal("push_notification_code_3");
		expect(queue.testMode.jobs[0].data).to.eql(jobs[0])
	})
});
