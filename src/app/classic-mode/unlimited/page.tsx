import { ClassicUnlimitedModeGame } from "@/components/modes/classic-mode/classic-unlimited-mode-game";
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

export default async function ClassicUnlimitedMode() {
  const {cards} = await getCards()
  const t = [
    {
      id: "any_id_1",
      name: "any_name1",
      race: "any_race",
      type: "any_type",
      archetype: "any_archetype",
      attribute: "any_attribute",
      description: "any_description",
      frameType: "any_frame_type",
      imageUrl: "any_image_url",
      imageUrlSmall: "any_image_url_small",
      imageUrlCropped: "any_image_url_cropped",
      atk: 10,
      def: 10,
      level: 10,
      available: true,
    },
    {
      id: "any_id_2",
      name: "any_name2",
      race: "any_race",
      type: "any_type",
      archetype: "any_archetype",
      attribute: "any_attribute",
      description: "any_description",
      frameType: "any_frame_type",
      imageUrl: "any_image_url",
      imageUrlSmall: "any_image_url_small",
      imageUrlCropped: "any_image_url_cropped",
      atk: 10,
      def: 10,
      level: 10,
      available: true,
    },
    {
      id: "any_id_3",
      name: "any_name3",
      race: "any_race",
      type: "any_type",
      archetype: "any_archetype",
      attribute: "any_attribute",
      description: "any_description",
      frameType: "any_frame_type",
      imageUrl: "any_image_url",
      imageUrlSmall: "any_image_url_small",
      imageUrlCropped: "any_image_url_cropped",
      atk: 10,
      def: 10,
      level: 10,
      available: true,
    },
  ]
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <ClassicUnlimitedModeGame cards={cards} />
      </div>
    </main>
  );
}
