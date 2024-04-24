"use client";

import AddExerciseForm from "@/components/add-exercise-form";
import Header from "@/components/header";
import content from "@/content/(main)/add-exercise/content-add-exercise-page";

export default function AddExercisePage() {
  return (
    <div>
      <Header>{content.headerAddExercise}</Header>
      <AddExerciseForm />
    </div>
  );
}
