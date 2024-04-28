import content from "@/content/(main)/add-exercise/content-add-exercise-form";
import TextArea from "./add-exercise-form/text-area";
import InputText from "./add-exercise-form/input-text";
import InputImage from "./add-exercise-form/input-image";
import Button from "./general-button";
import Link from "next/link";
import { useFormState } from "react-dom";
import editExercise from "@/actions/edit-exercise";
import { Alert } from "./add-exercise-form/alert";

const initialFormState = null;

export default function EditExerciseForm({
  question,
  correctAnswer,
  imageUrl,
  id,
}: {
  question: string;
  correctAnswer: string | null;
  imageUrl: string | null;
  id: number;
}) {
  const [formState, formAction] = useFormState(editExercise, initialFormState);

  const alert = formState?.success ? (
    <Alert type="Success">{content.successModify}</Alert>
  ) : (
    <Alert type="Failure">{content.failureAlert}</Alert>
  );

  return (
    <form className="mx-auto max-w-6xl" action={formAction}>
      <input type="hidden" name={content.idInputLabel} value={id} />
      <TextArea label={content.questionInputLabel} initialValue={question} />
      <InputText
        label={content.answerInputLabel}
        initialValue={correctAnswer || undefined}
      />
      <InputImage
        label={content.imageUploadInputLabel}
        initialImageUrl={imageUrl}
      />
      <Button type="submit">{content.editButtonLabel}</Button>
      <Link href="/list-exercise">
        <Button>{content.linkBackToListExercise}</Button>
      </Link>
      {formState && alert}
    </form>
  );
}
