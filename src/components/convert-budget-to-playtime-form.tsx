"use client";

import convertBudgetToPlaytime from "@/actions/convert-budget-to-playtime";
import Button from "./general-button";
import { Alert } from "./add-exercise-form/alert";
import { useFormState } from "react-dom";

const initialState = null;

export default function ConvertBudgetToPlaytimeForm() {
  const [formStatus, formAction] = useFormState(
    convertBudgetToPlaytime,
    initialState,
  );

  let alert;
  if (formStatus === "success") {
    alert = <Alert type="Success">Success. Converted Budget to Playtime</Alert>;
  }
  if (formStatus === "failed") {
    alert = <Alert type="Failure">Something failed</Alert>;
  }
  if (formStatus === "no budget") {
    alert = <Alert type="Failure">{"You don't have any budget left"}</Alert>;
  }

  return (
    <form action={formAction}>
      <Button type="submit">Convert Budget to Playtime</Button>
      {alert}
    </form>
  );
}
