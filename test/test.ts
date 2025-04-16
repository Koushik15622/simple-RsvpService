import { RsvpService } from "../src/services/RsvpService";
import { Logger } from "../src/services/LoggerService";

class SilentLogger implements Logger {
  log(_: string): void {}
}

const rsvp = new RsvpService(new SilentLogger());

rsvp.addOrUpdateRsvp({ id: "a", name: "Test User 1" }, "Yes");
rsvp.addOrUpdateRsvp({ id: "b", name: "Test User 2" }, "No");
rsvp.addOrUpdateRsvp({ id: "c", name: "Test User 3" }, "Maybe");

const confirmed = rsvp.getConfirmedAttendees();
const counts = rsvp.getCounts();

console.assert(confirmed.length === 1, "Should have 1 confirmed attendee");
console.assert(counts.total === 3, "Total should be 3");
console.assert(counts.confirmed === 1, "Confirmed should be 1");
console.assert(counts.declined === 1, "Declined should be 1");

console.log("All tests passed!");
