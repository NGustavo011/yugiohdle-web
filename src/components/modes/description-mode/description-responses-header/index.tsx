import { ResponseHeader } from "@/components/response/response-header"

export const DescriptionResponsesHeader = ()=>{
    return (
        <>
           <ResponseHeader title={"Name"} />
           <ResponseHeader title={"Type"} />
           <ResponseHeader title={"Race"} />
           <ResponseHeader title={"Attribute"} />
        </>
    )
}