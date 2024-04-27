import SideBar from "@/components/sidebar";
import StatusBar from "@/components/status-bar";
import content from "@/content/(main)/layout-content";
import getCurrentBudget from "@/function/get-current-budget";
import getLatestPlaytime from "@/function/get-latest-playtime";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentBudget = await getCurrentBudget();

  const latestPlaytime = await getLatestPlaytime();

  return (
    <>
      <SideBar content={content} />
      <StatusBar
        budgetInfo={{
          budget: currentBudget.value,
          expireTimeEpoch: currentBudget.expireTimeEpoch,
        }}
        playtimeEndTimeEpoch={latestPlaytime?.endTime || 0}
      />
      <div className="mt-11 p-4 sm:ml-64">{children}</div>
    </>
  );
}
