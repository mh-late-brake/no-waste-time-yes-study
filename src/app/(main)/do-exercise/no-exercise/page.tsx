import { Alert } from "@/components/add-exercise-form/alert";

export default async function Page() {
  return (
    <Alert type="Failure">
      {" You don't have any exercise. Please add more exercise. "}
    </Alert>
  );
}
