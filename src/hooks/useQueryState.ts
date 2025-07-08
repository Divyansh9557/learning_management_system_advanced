import {useQueryStates,parseAsInteger,parseAsString,} from "nuqs"



export const useFilterParams = ()=>{
    return  useQueryStates({
        page: parseAsInteger.withDefault(0),
        search: parseAsString.withDefault("").withOptions({clearOnDefault:true}),
        category: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
        status: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    })
}