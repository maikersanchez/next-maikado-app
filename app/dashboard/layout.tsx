"use client";

import { Card } from "@heroui/card";

import { ThemeSwitch } from "@/components/theme-switch";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <ThemeSwitch />
        </div>
        <Card className="p-4">{children}</Card>
      </div>
    </section>
  );
}
