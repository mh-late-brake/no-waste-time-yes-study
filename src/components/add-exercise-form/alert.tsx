export type AlertType = "Success" | "Failure";

export function Alert({
  children,
  type,
}: {
  children: React.ReactNode;
  type: AlertType;
}) {
  const color = type == "Success" ? "green" : "red";
  return (
    <div
      className={`mb-4 rounded-lg bg-${color}-100 p-4 text-sm text-${color}-800 dark:bg-gray-800 dark:text-red-400`}
      role="alert"
    >
      {children}
    </div>
  );
}
