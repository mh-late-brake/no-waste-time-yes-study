import constant from "@/constant/constant";
import content from "@/content/(main)/list-exercise/content-list-exercise-table";
import { Exercise } from "@prisma/client";
import Link from "next/link";

export default async function ListExerciseTable({
  exercises,
}: {
  exercises: Exercise[];
}) {
  return (
    <div className="relative table-auto overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-100 text-base uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {content.tableHead.map((tableHead) => (
              <th key={tableHead} scope="col" className="px-6 py-3">
                {tableHead}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr
              key={exercise.id}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <th
                scope="row"
                className="max-w-3xl whitespace-nowrap text-wrap px-6 py-4 font-light text-gray-900 dark:text-white"
              >
                <span>{exercise.question}</span>
                <div className="flex">
                  <Link
                    href={`/edit-exercise?${constant.searchParamAddExerciseRoute}=${exercise.id}`}
                    className="ml-auto mr-10 font-medium text-red-600"
                  >
                    {content.editButton}
                  </Link>
                  <button className="mr-5 font-medium text-green-700">
                    {content.doThisExerciseButton}
                  </button>
                </div>
              </th>
              <td className="px-6 py-4">
                <span className="bg-gray-500 p-1 hover:bg-transparent dark:bg-gray-400">
                  {exercise.correctAnswer}
                </span>
              </td>
              <td className="px-6 py-4">{exercise.numOfTimesCompleted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
