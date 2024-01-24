import { Response } from "@/services/yugiohdle-api"
import { ResponseInfo } from "../response-info"
import { Fragment } from "react"
import { ClassicResponsesHeader } from "../classic-responses-header"

type ClassicResponsesProps = {
    responses: Response[]
}

export const ClassicResponses = ({responses}: ClassicResponsesProps)=>{
    return (
        <>
            <div className="grid grid-cols-9 gap-x-2 gap-y-8">
                <ClassicResponsesHeader />
                {
                    responses.map((response, index)=>{
                        const {chosenCard, correctCard} = response
                        return (
                            <Fragment key={index}>
                                <ResponseInfo chosenInfo={chosenCard.name} correctInfo={correctCard.name} />
                                <ResponseInfo chosenInfo={chosenCard.frameType} correctInfo={correctCard.frameType} />
                                <ResponseInfo chosenInfo={chosenCard.type} correctInfo={correctCard.type} />
                                <ResponseInfo chosenInfo={chosenCard.atk} correctInfo={correctCard.atk} />
                                <ResponseInfo chosenInfo={chosenCard.def} correctInfo={correctCard.def} />
                                <ResponseInfo chosenInfo={chosenCard.level} correctInfo={correctCard.level} />
                                <ResponseInfo chosenInfo={chosenCard.race} correctInfo={correctCard.race} />
                                <ResponseInfo chosenInfo={chosenCard.attribute} correctInfo={correctCard.attribute} />
                                <ResponseInfo chosenInfo={chosenCard.archetype} correctInfo={correctCard.archetype} />
                            </Fragment>
                        )
                        
                    })
                }
            </div>
        </>
    )
}