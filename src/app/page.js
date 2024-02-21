"use client";
import dynamic from "next/dynamic";

const NoSSRMain = dynamic(() => import("../view/Main"), { ssr: false });

export default function Home(props) {
  return (
    <div>
      <NoSSRMain />
    </div>
  );
}
