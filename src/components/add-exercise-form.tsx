import content from "@/content/(main)/add-exercise/content-add-exercise-form";
import addExercise from "@/actions/add-exercise";
import { useFormState } from "react-dom";
import TextArea from "./add-exercise-form/text-area";
import InputText from "./add-exercise-form/input-text";
import InputImage from "./add-exercise-form/input-image";
import { Alert } from "./add-exercise-form/alert";
import Button from "./general-button";
import { useState } from "react";

const initialFormState = null;

export default function AddExerciseForm() {
  const [receivedFormState, formAction] = useFormState(
    addExercise,
    initialFormState,
  );
  const [isNewForm, setIsNewForm] = useState(true);

  const myFormState = isNewForm ? null : receivedFormState;

  const resetForm = () => setIsNewForm(true);

  const alert = myFormState?.success ? (
    <Alert type="Success">{content.successAlert}</Alert>
  ) : (
    <Alert type="Failure">{content.failureAlert}</Alert>
  );

  const button = myFormState?.success ? (
    <Button onClick={() => resetForm()}>{content.resetButtonLabel}</Button>
  ) : (
    <Button type="submit" onClick={() => setIsNewForm(false)}>
      {content.submitButtonLabel}
    </Button>
  );

  return (
    <form className="mx-auto max-w-6xl" action={formAction}>
      <TextArea label={content.questionInputLabel} />
      <InputText label={content.answerInputLabel} />
      <InputImage label={content.imageUploadInputLabel} />
      {button}
      {myFormState && alert}
    </form>
  );
}
