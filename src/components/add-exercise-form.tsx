import content from "@/content/(main)/add-exercise/content-add-exercise-form";
import addExercise from "@/actions/add-exercise";
import { useFormState } from "react-dom";
import TextArea from "./add-exercise-form/text-area";
import InputText from "./add-exercise-form/input-text";
import InputImage from "./add-exercise-form/input-image";
import { Alert } from "./add-exercise-form/alert";
import Button from "./general-button";

const initialFormState = null;

export default function AddExerciseForm({
  resetForm,
}: {
  resetForm: () => void;
}) {
  const [formState, formAction] = useFormState(addExercise, initialFormState);

  const alert = formState?.success ? (
    <Alert type="Success">{content.successAlert}</Alert>
  ) : (
    <Alert type="Failure">{content.failureAlert}</Alert>
  );

  const button = formState?.success ? (
    <Button onClick={() => resetForm()}>{content.resetButtonLabel}</Button>
  ) : (
    <Button type="submit">{content.submitButtonLabel}</Button>
  );

  return (
    <form className="mx-auto max-w-6xl" action={formAction}>
      <TextArea label={content.questionInputLabel} />
      <InputText label={content.answerInputLabel} />
      <InputImage label={content.imageUploadInputLabel} />
      {button}
      {formState && alert}
    </form>
  );
}
