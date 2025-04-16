import { RsvpService } from "./services/RsvpService";
import { ConsoleLogger } from "./services/LoggerService";

const logger = new ConsoleLogger();
const rsvpService = new RsvpService(logger);

// Simulate adding/updating RSVPs
rsvpService.addOrUpdateRsvp({ id: "1", name: "Koushik" }, "Yes");
rsvpService.addOrUpdateRsvp({ id: "2", name: "Polukonda" }, "No");
rsvpService.addOrUpdateRsvp({ id: "3", name: "Alice" }, "Yes");
rsvpService.addOrUpdateRsvp({ id: "2", name: "Bob" }, "Maybe"); 

console.log("Confirmed Attendees:", rsvpService.getConfirmedAttendees());
console.log("Counts:", rsvpService.getCounts());
