import { GlobalHeader } from "@/components/global-header";
import { DescriptionDailyModeGame } from "@/components/modes/description-mode/description-daily-mode-game";
import { Card, yugiohdleApiService } from "@/services/yugiohdle-api"

const getDailyCard = (async () => {
  const responseCards = await yugiohdleApiService.get('get-cards');
  if(responseCards.status !==200 || !responseCards.data)
      throw Error(responseCards.data.message)
  const cards: Card[] = await responseCards.data
  const responseDailyCard = await yugiohdleApiService.get('get-daily-card');
  if(responseDailyCard.status !==200 || !responseDailyCard.data)
      throw Error(responseDailyCard.data.message)
  const dailyCard: Card = await responseDailyCard.data.description
  return {
    cards,
    dailyCard
  }
})

export default async function DescriptionUnlimitedMode() {
  const {cards, dailyCard} = await getDailyCard()
  return (
    <main className="flex min-h-screen flex-col items-center">
      <GlobalHeader />
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <DescriptionDailyModeGame cards={cards} dailyCard={dailyCard} />
      </div>
    </main>
  );
}
