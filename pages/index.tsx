import { MainContainer } from "@/components";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-row relative ${inter.className}`}>
      <MainContainer />
    </main>
  );
}
