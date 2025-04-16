import express from "express";
import type { Request, Response } from "express";
import { RsvpService } from "./services/RsvpService";
import { ConsoleLogger } from "./services/LoggerService";
import { Player } from "./interfaces/Player";
import { RsvpStatus } from "./interfaces/RsvpStatus";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const logger = new ConsoleLogger();
const rsvpService = new RsvpService(logger);

app.get("/", (req: Request, res: Response): any => {
  return res.send("RSVP API is running"); 
});

app.post("/rsvp", (req: Request, res: Response): any => {
  const { player, status }: { player: Player; status: RsvpStatus } = req.body;

  if (!player || !status || !["Yes", "No", "Maybe"].includes(status)) {
    return res.status(400).json({ error: "Invalid request" });
  }

  rsvpService.addOrUpdateRsvp(player, status);
  return res.status(200).json({ message: "RSVP recorded" });
});

app.get("/rsvp/confirmed", (req: Request, res: Response): any => {
  const confirmed = rsvpService.getConfirmedAttendees();
  return res.json(confirmed);
});

app.get("/rsvp/counts", (req: Request, res: Response): any => {
  const counts = rsvpService.getCounts();
  return res.json(counts);
});

app.listen(port, () => {
  console.log(`RSVP API running at http://localhost:${port}`);
});
