import { ButtonMode } from "@/components/button-mode";
import { CardMode } from "@/components/card-mode";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="grid grid-cols-2 gap-y-20 gap-x-4 w-full">
          <CardMode title="Modos diários">
            <ButtonMode title="Classic" href="/classic-mode/daily" />
            <ButtonMode title="Classic" href="/classic-mode/daily" />
          </CardMode>
          <CardMode title="Modos ilimitados">
            <ButtonMode title="Classic" href="/classic-mode/unlimited" />
            <ButtonMode title="Classic" href="/classic-mode/unlimited" />
          </CardMode>
        </div>
      </div>
    </main>
  );
}
