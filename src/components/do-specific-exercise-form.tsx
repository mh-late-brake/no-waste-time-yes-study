import content from "@/content/(main)/do-exercise/content-do-specific-exercise-page";
import InputText from "./add-exercise-form/input-text";
import Button from "./general-button";

export default function DoSpecificExerciseForm({
  exerciseId,
  children,
}: {
  exerciseId: number;
  children: React.ReactNode;
}) {
  return (
    <form>
      <input type="hidden" value={exerciseId} name={content.inputIdLabel} />
      <InputText label={content.inputAnswerLabel} />
      <Button type="submit">{content.submitButton}</Button>
      {children}
    </form>
  );
}
