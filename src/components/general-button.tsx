import { ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  type = "button",
  onClick,
}: {
  children: React.ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type={type}
      className="mb-5 w-full rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 dark:bg-white sm:w-auto"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
