import { GlobalHeader } from "@/components/global-header";
import { DescriptionUnlimitedModeGame } from "@/components/modes/description-mode/description-unlimited-mode-game";
import { Card, yugiohdleApiService } from "@/services/yugiohdle-api"

const getCards = (async () => {
  const response = await yugiohdleApiService.get('get-cards');
  if(response.status !==200 || !response.data)
      throw Error(response.data.message)
  const cards: Card[] = await response.data
  return {
    cards,
  }
})

export default async function DescriptionUnlimitedMode() {
  const {cards} = await getCards()

  return (
    <main className="flex min-h-screen flex-col items-center">
      <GlobalHeader />
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <DescriptionUnlimitedModeGame cards={cards} />
      </div>
    </main>
  );
}
