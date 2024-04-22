"use client";

import AddExerciseForm from "@/components/add-exercise-form";
import { useState } from "react";
import content from "@/content/(main)/add-exercise/content-add-exercise-page";

export default function AddExercise() {
  const [key, setKey] = useState<number>(0);
  const resetForm = () => setKey(key + 1);
  return (
    <div>
      <h2 className="mb-11 text-center text-4xl font-bold dark:text-white">
        {content.header}
      </h2>
      <AddExerciseForm resetForm={resetForm} key={key} />
    </div>
  );
}
