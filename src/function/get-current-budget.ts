import "server-only"

import { prisma } from "../../prisma/client"
import { getExpireTime } from "./get-preferences";
import minuteToMillisecond from "./minute-to-millisecond";

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
    return {
      value: 0,
      expireTimeEpoch: Date.now(),
    }
  }

  const expireTime = minuteToMillisecond(await getExpireTime());
  const expireTimeEpoch = latestBudget.createdAt.getTime() + expireTime;

  if (expireTimeEpoch >= Date.now()) {
    return {
      value: latestBudget.value,
      expireTimeEpoch,
    }
  }
  else {
    return {
      value: 0,
      expireTimeEpoch: Date.now(),
    }
  }
}
