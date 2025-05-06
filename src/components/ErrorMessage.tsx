import { PropsWithChildren } from "react";

export default function ErrorMessage({children} : PropsWithChildren) {
  return (
    <div className=" text-center bg-red-600 text-white font-medium p-1 ">{children}</div>
  )
}
