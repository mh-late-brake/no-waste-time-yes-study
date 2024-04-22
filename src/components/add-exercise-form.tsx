import content from "@/content/(main)/add-exercise/content-add-exercise-form";
import addExercise from "@/actions/add-exercise";
import { useFormState } from "react-dom";

const initialFormState = null;

export default function AddExerciseForm({
  resetForm,
}: {
  resetForm: () => void;
}) {
  const [formState, formAction] = useFormState(addExercise, initialFormState);

  return (
    <form className="mx-auto max-w-6xl" action={formAction}>
      <div className="mb-5">
        <label
          htmlFor={content.questionInputLabel}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {content.questionInputLabel}
        </label>
        <textarea
          id={content.questionInputLabel}
          name={content.questionInputLabel}
          rows={10}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={content.questionInputPlaceholder || ""}
          required
          autoComplete="off"
        ></textarea>
      </div>
      <div className="mb-5">
        <label
          htmlFor={content.answerInputLabel}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {content.answerInputLabel}
        </label>
        <input
          type="text"
          id={content.answerInputLabel}
          name={content.answerInputLabel}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={content.answerInputPlaceholder || ""}
          required
          autoComplete="off"
        />
      </div>
      <div className="mb-5">
        <label
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor={content.imageUploadInputLabel}
        >
          {content.imageUploadInputLabel}
        </label>
        <input
          name={content.imageUploadInputLabel}
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          id={content.imageUploadInputLabel}
          type="file"
        />
        <div
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="user_avatar_help"
        >
          {content.imageUploadInputDescription || ""}
        </div>
      </div>
      {!formState?.success && (
        <button
          type="submit"
          className="mb-5 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          {content.submitButtonLabel}
        </button>
      )}
      {formState?.success && (
        <button
          type="button"
          className="mb-5 w-full rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
          onClick={() => resetForm()}
        >
          {content.resetButtonLabel}
        </button>
      )}

      {formState?.success && (
        <div
          className="mb-4 rounded-lg bg-green-100 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          {content.successAlert}
        </div>
      )}
      {formState?.error && (
        <div
          className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {content.failureAlert}
        </div>
      )}
    </form>
  );
}
