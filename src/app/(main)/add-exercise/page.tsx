"use client";

import AddExerciseForm from "@/components/add-exercise-form";
import { useRef, useState } from "react";
import content from "@/content/(main)/add-exercise/content-add-exercise-page";
import constant from "@/constant/constant";
import useSWR from "swr";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function AddExercisePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const exerciseId = searchParams[constant.searchParamAddExerciseRoute];
  const fetchUrl = !!exerciseId
    ? `/api/get-exercise-info?${constant.queryParamGetExerciseInfo}=${exerciseId}`
    : null;
  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

  const [key, setKey] = useState<number>(0);
  const resetForm = () => setKey(key + 1);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div key={exerciseId?.toString() || -1}>
      <h2 className="mb-11 text-center text-4xl font-bold dark:text-white">
        {exerciseId ? content.headerModifyExercise : content.headerAddExercise}
      </h2>
      <AddExerciseForm exerciseInfo={data} resetForm={resetForm} key={key} />
    </div>
  );
}
