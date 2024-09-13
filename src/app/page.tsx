
import { Component } from "@/components/component";
import { PollProvider } from "@/context/PollContext";

export default function Home() {
  return (
    <PollProvider>
      <Component />
    </PollProvider>
  );
}

