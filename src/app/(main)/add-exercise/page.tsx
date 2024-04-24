"use client";

import AddExerciseForm from "@/components/add-exercise-form";
import content from "@/content/(main)/add-exercise/content-add-exercise-page";

export default function AddExercisePage() {
  return (
    <div>
      <h2 className="mb-11 text-center text-4xl font-bold dark:text-white">
        {content.headerAddExercise}
      </h2>
      <AddExerciseForm />
    </div>
  );
}
