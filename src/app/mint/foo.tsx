"use client";

import { useXenStatus } from "@/hooks/useXen";

const Foo = () => {
  const { data, isLoading, isError } = useXenStatus()
  console.log("data", data)
  console.log("isLoading", isLoading)
  console.log("isError", isError)
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  // move to global helper
  const replacer = (key: string, value: any) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  };
  return (
    <div> {JSON.stringify(data, replacer, 2)}</div>
  )
}

export default Foo