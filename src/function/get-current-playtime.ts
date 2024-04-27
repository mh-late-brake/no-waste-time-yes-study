import "server-only"

import { prisma } from "../../prisma/client"
import { getExpireTime } from "./get-preferences";

export default async function getCurrentPlayTime() {
  let latestPlayTime;
  try {
    latestPlayTime = await prisma.budget.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    })
  }
  catch (e) {
    throw new Error("Error when fetching playtime in database");
  }

  // There is no record in the database => the user currently has 0 minute playtime
  if (!latestPlayTime) {
    return 0;
  }

  const timeFromLastRecordTillNow = msToMinute(Date.now() - latestPlayTime.createdAt.getTime());
  const expireTime = await getExpireTime();

  if (timeFromLastRecordTillNow <= expireTime) {
    return latestPlayTime.value;
  }
  else {
    return 0;
  }
}

function msToMinute(ms: number): number {
  return ms / (1000 * 60);
}
