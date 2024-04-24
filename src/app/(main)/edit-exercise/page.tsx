"use client";

import { useEffect, useState } from "react";
import content from "@/content/(main)/add-exercise/content-add-exercise-page";
import constant from "@/constant/constant";
import { Exercise } from "@prisma/client";
import EditExerciseForm from "@/components/edit-exercise-form";

export default function EditExercisePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const exerciseId = searchParams[constant.searchParamAddExerciseRoute];
  if (!exerciseId) {
    throw new Error("Cannot get exercise id from search params");
  }
  const fetchUrl = `/api/get-exercise-info?${constant.queryParamGetExerciseInfo}=${exerciseId}`;

  const [data, setData] = useState<Exercise | undefined>(undefined);

  useEffect(() => {
    let ignore = false;

    const fetcher = async () => {
      const res = await fetch(fetchUrl);
      const data: Exercise = await res.json();
      return data;
    };

    setData(undefined);
    fetcher().then((result) => {
      if (!ignore) {
        setData(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, [fetchUrl]);

  if (data == undefined) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h2 className="mb-11 text-center text-4xl font-bold dark:text-white">
        {content.headerModifyExercise}
      </h2>
      <EditExerciseForm
        question={data.question}
        id={data.id}
        correctAnswer={data.correctAnswer}
        imageUrl={data.imageUrl}
      />
    </div>
  );
}
