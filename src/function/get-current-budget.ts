import "server-only"

import { prisma } from "../../prisma/client"
import { getExpireTime } from "./get-preferences";

export default async function getCurrentBudget() {
  let latestBudget;
  try {
    latestBudget = await prisma.budget.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    })
  }
  catch (e) {
    throw new Error("Error when fetching budget in database");
  }

  // There is no record in the database => the user currently has 0 budget
  if (!latestBudget) {
    return 0;
  }

  const timeFromLastRecordTillNow = msToMinute(Date.now() - latestBudget.createdAt.getTime());
  const expireTime = await getExpireTime();

  if (timeFromLastRecordTillNow <= expireTime) {
    return latestBudget.value;
  }
  else {
    return 0;
  }
}

function msToMinute(ms: number): number {
  return ms / (1000 * 60);
}
