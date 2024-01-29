import { Option } from "../list-cards-filter"

type ListCardsFilterSelectProps = {
    id: string,
    title: string,
    options: Option[]
}

export const ListCardsFilterSelect = ({id, title, options}: ListCardsFilterSelectProps) => {
    return (
        <>
            <div>
                <p className="text-black">{title}</p>
                <select id={id} name={id} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    {
                        options.map((option)=>{
                            return (
                                <option key={`${option.value}-filter-select`} value={option.value}>{option.label}</option>
                            )
                        })
                    }
                </select>
            </div>
        </>
    )
}