import { ResponseHeader } from "../response-header"

export const ClassicResponsesHeader = ()=>{
    return (
        <>
           <ResponseHeader title={"Name"} />
           <ResponseHeader title={"FrameType"} />
           <ResponseHeader title={"Type"} />
           <ResponseHeader title={"Atk"} />
           <ResponseHeader title={"Def"} />
           <ResponseHeader title={"Level"} />
           <ResponseHeader title={"Race"} />
           <ResponseHeader title={"Attribute"} />
           <ResponseHeader title={"Archetype"} />
        </>
    )
}