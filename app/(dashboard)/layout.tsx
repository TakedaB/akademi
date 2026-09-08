import Sidebar from "../components/Layout/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#F5F3FF]">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
