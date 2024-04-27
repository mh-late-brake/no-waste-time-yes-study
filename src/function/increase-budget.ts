import "server-only"
import getCurrentBudget from "./get-current-budget"
import { getBudgetIncrement } from "./get-preferences"
import { prisma } from "../../prisma/client";

export default async function increaseBudget() {
  const currentBudget = await getCurrentBudget();
  const budgetIncrement = await getBudgetIncrement();
  const newBudget = currentBudget.value + budgetIncrement;
  await prisma.budget.create({
    data: {
      value: newBudget,
    }
  });
}
