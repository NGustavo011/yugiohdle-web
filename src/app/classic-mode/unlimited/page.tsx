import { ClassicUnlimitedModeGame } from "@/components/classic-unlimited-mode-game";
import { Card, yugiohdleApiService } from "@/services/yugiohdle-api"

const getCards = (async () => {
  const response = await yugiohdleApiService.get('get-cards');
  if(response.status !==200 || !response.data)
      throw Error(response.data.message)
  const cards: Card[] = await response.data
  const cardsRandomOrder = [...cards].sort( () => .5 - Math.random() );
  return {
    cards,
    cardsRandomOrder
  }
})

export default async function ClassicUnlimitedMode() {
  const {cards, cardsRandomOrder} = await getCards()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <ClassicUnlimitedModeGame cards={cards} cardsRandomOrder={cardsRandomOrder} />
      </div>
    </main>
  );
}
