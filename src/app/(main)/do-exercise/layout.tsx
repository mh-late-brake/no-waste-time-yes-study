import Header from "@/components/header";
import content from "@/content/(main)/do-exercise/content-do-exercise-page";

export default function DoExerciseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header>{content.heading}</Header>
      {children}
    </>
  );
}
