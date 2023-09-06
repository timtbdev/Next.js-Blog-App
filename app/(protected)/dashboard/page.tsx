import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { dashBoardConfig, dashBoardMenus } from "@/config/dashboard";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { v4 } from "uuid";

export const metadata: Metadata = {
  title: dashBoardConfig.title,
  description: dashBoardConfig.description,
};

const DashBoard = () => {
  return (
    <div
      key={v4()}
      className="mx-auto grid max-w-5xl grid-cols-1 justify-center gap-4 px-10 py-10 md:grid-cols-2 md:px-2"
    >
      {dashBoardMenus.map(
        (menu, idx) =>
          idx !== 0 &&
          idx != dashBoardMenus.length - 1 && (
            <>
              <Link href={`/${menu.slug}`}>
                <Card className="hover:bg-gray-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                    <menu.icon className="h-8 w-8 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-md font-semibold">{menu.title}</div>
                  </CardContent>
                </Card>
              </Link>
            </>
          ),
      )}
    </div>
  );
};

export default DashBoard;
