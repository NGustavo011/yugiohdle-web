import { Response } from "@/services/yugiohdle-api"
import { Fragment } from "react"
import { ArtResponsesHeader } from "../art-responses-header"
import { ResponseInfo } from "@/components/response/response-info"
import { ResponseInfoNumber } from "@/components/response/response-info-number"
import { ResponseInfoImage } from "@/components/response/response-info-image"

type ArtResponsesProps = {
    responses: Response[]
}

export const ArtResponses = ({responses}: ArtResponsesProps)=>{
    return (
        <>
            <div className="grid grid-cols-2 gap-x-2 gap-y-8">
                <ArtResponsesHeader />
                {
                    responses.map((response, index)=>{
                        const {chosenCard, correctCard} = response
                        return (
                            <Fragment key={index}>
                                <ResponseInfo chosenInfo={chosenCard.name} correctInfo={correctCard.name} />
                                <ResponseInfoImage chosenInfoImage={chosenCard.imageUrlCropped} />
                            </Fragment>
                        )
                        
                    })
                }
            </div>
        </>
    )
}