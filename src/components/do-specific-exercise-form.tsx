"use client";

import content from "@/content/(main)/do-exercise/content-do-specific-exercise-page";
import InputText from "./add-exercise-form/input-text";
import Button from "./general-button";
import { useFormState } from "react-dom";
import submitExercise from "@/actions/submit-exercise";
import { Alert } from "./add-exercise-form/alert";

const initialFormState = null;

export default function DoSpecificExerciseForm({
  exerciseId,
  children,
}: {
  exerciseId: number;
  children: React.ReactNode;
}) {
  const [formState, formAction] = useFormState(
    submitExercise,
    initialFormState,
  );

  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} `;

  let alert;
  if (formState?.error) {
    alert = <Alert type="Failure">{currentTime + content.alertError}</Alert>;
  }
  if (formState?.status === "Correct") {
    alert = (
      <Alert type="Success">{currentTime + content.alertCorrectAnswer}</Alert>
    );
  }
  if (formState?.status === "Incorrect") {
    alert = (
      <Alert type="Failure">{currentTime + content.alertIncorrectAnswer}</Alert>
    );
  }
  if (
    formState?.status === "No correct answer in DB so Correct no matter what"
  ) {
    alert = (
      <Alert type="Success">{currentTime + content.correctNoMatterWhat}</Alert>
    );
  }

  return (
    <form action={formAction}>
      <input type="hidden" value={exerciseId} name={content.inputIdLabel} />
      <InputText required={true} label={content.inputAnswerLabel} />

      {(formState?.status === undefined ||
        formState.status === "Incorrect") && (
        <Button type="submit">{content.submitButton}</Button>
      )}

      {children}

      {alert}
    </form>
  );
}
