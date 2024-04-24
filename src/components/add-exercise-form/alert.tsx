export type AlertType = "Success" | "Failure";

export function Alert({
  children,
  type,
}: {
  children: React.ReactNode;
  type: AlertType;
}) {
  const bg = type == "Success" ? "bg-green-200" : "bg-red-200";
  const color = type == "Success" ? "text-green-800" : "text-red-800";

  return (
    <div
      className={`mb-4 rounded-lg p-4 text-sm dark:bg-gray-800 dark:text-red-400 ${bg} ${color}`}
    >
      {children}
    </div>
  );
}
