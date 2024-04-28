"use server"

// TODO: Right now, when user convert while they still have playtime left, they will lost up to 1 minute
// I suspect that it is because of converting between minute and millisecond

type ReturnType = "failed" | "success" | "no budget"

import getCurrentBudget from "@/function/get-current-budget"
import getLatestPlaytime from "@/function/get-latest-playtime";
import millisecondToMinute from "@/function/millisecond-to-minute";
import minuteToMillisecond from "@/function/minute-to-millisecond";
import { prisma } from "../../prisma/client";
import { revalidatePath } from "next/cache";

export default async function convertBudgetToPlaytime(_prevFormState: any, _formData: FormData): Promise<ReturnType> {
  const currentBudget = await getCurrentBudget();

  if (currentBudget.value === 0) {
    return "no budget";
  }

  const latestPlaytime = await getLatestPlaytime();

  let newStartTime = Date.now();
  if (latestPlaytime && latestPlaytime.endTime > newStartTime) {
    newStartTime = latestPlaytime.endTime;
  }

  const newEndTime = newStartTime + minuteToMillisecond(currentBudget.value);
  const newValue = millisecondToMinute(newEndTime - Date.now());

  try {
    const [_newBudget, _newPlaytime] = await prisma.$transaction([
      prisma.budget.create({
        data: {
          value: 0,
        }
      }),
      prisma.playTime.create({
        data: {
          value: newValue,
        }
      })
    ])
  }
  catch (e) {
    return "failed"
  }

  revalidatePath("/");
  return "success"
}
