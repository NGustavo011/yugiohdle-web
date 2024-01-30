import { ClassicDailyModeGame } from "@/components/modes/classic-mode/classic-daily-mode-game";
import { ClassicUnlimitedModeGame } from "@/components/modes/classic-mode/classic-unlimited-mode-game";
import { Card, yugiohdleApiService } from "@/services/yugiohdle-api"

const getDailyCard = (async () => {
  const responseCards = await yugiohdleApiService.get('get-cards');
  if(responseCards.status !==200 || !responseCards.data)
      throw Error(responseCards.data.message)
  const cards: Card[] = await responseCards.data
  const responseDailyCard = await yugiohdleApiService.get('get-daily-card');
  if(responseDailyCard.status !==200 || !responseDailyCard.data)
      throw Error(responseDailyCard.data.message)
  const dailyCard: Card = await responseDailyCard.data
  return {
    cards,
    dailyCard
  }
})

export default async function ClassicUnlimitedMode() {
  const {cards, dailyCard} = await getDailyCard()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <ClassicDailyModeGame cards={cards} dailyCard={dailyCard} />
      </div>
    </main>
  );
}
