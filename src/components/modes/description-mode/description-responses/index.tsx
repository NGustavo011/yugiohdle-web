import { Response } from "@/services/yugiohdle-api"
import { Fragment } from "react"
import { DescriptionResponsesHeader } from "../description-responses-header"
import { ResponseInfo } from "@/components/response/response-info"
import { ResponseInfoNumber } from "@/components/response/response-info-number"

type DescriptionResponsesProps = {
    responses: Response[]
}

export const DescriptionResponses = ({responses}: DescriptionResponsesProps)=>{
    return (
        <>
            <div className="grid grid-cols-4 gap-x-2 gap-y-8">
                <DescriptionResponsesHeader />
                {
                    responses.map((response, index)=>{
                        const {chosenCard, correctCard} = response
                        return (
                            <Fragment key={index}>
                                <ResponseInfo chosenInfo={chosenCard.name} correctInfo={correctCard.name} />
                                <ResponseInfo chosenInfo={chosenCard.type} correctInfo={correctCard.type} />
                                <ResponseInfo chosenInfo={chosenCard.race} correctInfo={correctCard.race} />
                                <ResponseInfo chosenInfo={chosenCard.attribute} correctInfo={correctCard.attribute} />
                            </Fragment>
                        )
                        
                    })
                }
            </div>
        </>
    )
}