import { Player } from "../interfaces/Player";
import { RsvpStatus } from "../interfaces/RsvpStatus";
import { Logger } from "./LoggerService";

interface RsvpEntry {
  player: Player;
  status: RsvpStatus;
}

export class RsvpService {
  private rsvps: Map<string, RsvpEntry> = new Map();

  constructor(private logger: Logger) {}

  addOrUpdateRsvp(player: Player, status: RsvpStatus): void {
    this.rsvps.set(player.id, { player, status });
    this.logger.log(`RSVP updated for ${player.name}: ${status}`);
  }

  getConfirmedAttendees(): Player[] {
    return Array.from(this.rsvps.values())
      .filter(entry => entry.status === "Yes")
      .map(entry => entry.player);
  }

  getCounts(): { total: number; confirmed: number; declined: number } {
    let confirmed = 0;
    let declined = 0;

    for (const entry of this.rsvps.values()) {
      if (entry.status === "Yes") confirmed++;
      if (entry.status === "No") declined++;
    }

    return {
      total: this.rsvps.size,
      confirmed,
      declined,
    };
  }
}
