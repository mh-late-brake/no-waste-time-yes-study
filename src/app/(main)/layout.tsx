import SideBar from "@/components/sidebar";
import content from "@/content/(main)/layout-content";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar content={content}>{children}</SideBar>
    </>
  );
}
