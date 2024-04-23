"use client";

import AddExerciseForm from "@/components/add-exercise-form";
import { useEffect, useRef, useState } from "react";
import content from "@/content/(main)/add-exercise/content-add-exercise-page";
import constant from "@/constant/constant";
import { Exercise } from "@prisma/client";

export default function AddExercisePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const exerciseId = searchParams[constant.searchParamAddExerciseRoute];
  const fetchUrl = !!exerciseId
    ? `/api/get-exercise-info?${constant.queryParamGetExerciseInfo}=${exerciseId}`
    : null;
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetcher = async () => {
      if (!fetchUrl) {
        return null;
      }
      const res = await fetch(fetchUrl);
      const data = await res.json();
      return data;
    };

    setData(null);
    fetcher().then((result) => {
      if (!ignore) {
        setData(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, [fetchUrl]);

  const [key, setKey] = useState<number>(0);
  const resetForm = () => setKey(key + 1);

  const exerciseInfo: Exercise | null = data;

  if (!data) {
    return <div>Loading ...</div>;
  }

  return (
    <div key={exerciseId?.toString() || -1}>
      <h2 className="mb-11 text-center text-4xl font-bold dark:text-white">
        {exerciseId ? content.headerModifyExercise : content.headerAddExercise}
      </h2>
      <AddExerciseForm
        exerciseInfo={exerciseInfo}
        resetForm={resetForm}
        key={key}
      />
    </div>
  );
}
