import { FC, ReactNode } from "react";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

interface ShaerdOgImageWrapperProps {
  children: ReactNode;
}

export const SharedOgImageWrapper: FC<ShaerdOgImageWrapperProps> = ({
  children,
}) => (
  <div tw="flex w-full h-full bg-gray-100" style={{ display: "flex" }}>
    <div
      tw="flex flex-col w-full h-full px-[80px] py-[40px] items-center justify-center"
      style={{ display: "flex" }}
    >
      {children}
    </div>
  </div>
);
