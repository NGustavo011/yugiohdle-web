import { ResponseHeader } from "@/components/response/response-header"

export const ArtResponsesHeader = ()=>{
    return (
        <>
           <ResponseHeader title={"Name"} />
           <ResponseHeader title={"Image"} />
        </>
    )
}