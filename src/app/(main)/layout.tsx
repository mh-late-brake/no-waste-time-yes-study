import SideBar from "@/components/sidebar";
import StatusBar from "@/components/status-bar";
import content from "@/content/(main)/layout-content";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar content={content} />
      <StatusBar />
      <div className="mt-11 p-4 sm:ml-64">{children}</div>
    </>
  );
}
