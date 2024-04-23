export type SummaryContent = {
  description: string;
  count: number;
}[];

export default function SummaryListExercise({
  content,
}: {
  content: SummaryContent;
}) {
  return (
    <ul className="mb-10 max-w-md divide-y divide-gray-200 px-6 dark:divide-gray-700">
      {content.map((line) => (
        <li key={line.description} className="pb-0 pt-3 sm:pt-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {line.description}
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {line.count}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
