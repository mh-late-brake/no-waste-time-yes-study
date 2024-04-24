export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-11 text-center text-4xl font-bold dark:text-white">
      {children}
    </h2>
  );
}
