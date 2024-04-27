import { prisma } from "../../prisma/client";
import minuteToMillisecond from "./minute-to-millisecond";

export default async function getLatestPlaytime() {
  const latestPlaytime = await prisma.playTime.findFirst({
    orderBy: {
      createdAt: "desc",
    }
  })

  if (!latestPlaytime) {
    return null;
  }

  const startTime = latestPlaytime.createdAt.getTime();
  const endTime = startTime + minuteToMillisecond(latestPlaytime.value);

  return {
    startTime,
    endTime,
  }
}
