type DescriptionCardProps = {
    description?: string
}

export const DescriptionCard = ({description}: DescriptionCardProps) => {
    return (
        <>
            <div className="flex flex-col justify-center items-center border-2 p-4 gap-4">
                <p className="text-2xl">Descrição</p>
                <div>
                    <p>{description}</p>
                </div>
            </div>
        </>
    )
}