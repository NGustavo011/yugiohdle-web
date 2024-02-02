import { ArtUnlimitedModeGame } from "@/components/modes/art-mode/art-unlimited-mode-game";
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

export default async function ArtUnlimitedMode() {
  const {cards} = await getCards()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <ArtUnlimitedModeGame cards={cards} />
      </div>
    </main>
  );
}
