export default function Card({
  header,
  body,
}: {
  header?: string;
  body?: string;
}) {
  return (
    <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {header}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{body}</p>
    </div>
  );
}
