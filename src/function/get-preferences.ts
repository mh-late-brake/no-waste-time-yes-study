import defaultValues from "@/constant/defaultValues";
import { prisma } from "../../prisma/client";

export async function getExpireTime() {
  let expireTime;
  expireTime = await prisma.expireTime.findFirst();
  if (!expireTime) {
    expireTime = await prisma.expireTime.create({
      data: {
        value: defaultValues.expireTime,
      }
    })
  }
  return expireTime.value;
}

export async function getBudgetIncrement() {
  let budgetIncrement;
  budgetIncrement = await prisma.budgetIncrement.findFirst();
  if (!budgetIncrement) {
    budgetIncrement = await prisma.budgetIncrement.create({
      data: {
        value: defaultValues.budgetIncrement,
      }
    })
  }
  return budgetIncrement.value;
}

export async function getControlledUrls() {
  let controlledUrls;
  controlledUrls = (await prisma.controlledUrl.findMany()).map(row => row.value);
  if (controlledUrls.length == 0) {
    const urls = await prisma.controlledUrl.createMany({
      data: defaultValues.controlledUrls.map(url => ({ value: url })),
    })
    return urls;
  }
  return controlledUrls;
}
