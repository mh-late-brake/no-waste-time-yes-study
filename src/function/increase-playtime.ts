import "server-only"
import getCurrentPlayTime from "./get-current-playtime"
import { getPlaytimeIncrement } from "./get-preferences"
import { prisma } from "../../prisma/client";

export default async function increasePlaytime() {
  const currentPlaytime = await getCurrentPlayTime();
  const playtimeIncrement = await getPlaytimeIncrement();
  const newPlaytime = currentPlaytime + playtimeIncrement;
  await prisma.budget.create({
    data: {
      value: newPlaytime,
    }
  });
}
