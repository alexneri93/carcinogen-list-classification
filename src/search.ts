import carcinogens from './data/carcinogens_list_classification.json';
import { Carcinogen, CarcinogenListSearchProps, SortKey } from './types';

export function carcinogenListSearch({
    groups = ["1", "2A", "2B", "3", "4"],
    sortBy = "group",
    sortMethod = "asc",
    keywords = [""]
}: CarcinogenListSearchProps): Carcinogen[] {
    const sortCarcinogens = (a: Carcinogen, b: Carcinogen, key: SortKey): number => {
        const multiplier = sortMethod === "desc" ? -1 : 1;
        return multiplier * a[key].localeCompare(b[key]);
    };

    let filteredCarcinogens = carcinogens
        .filter(carcinogen => groups.includes(carcinogen.group));

    if (keywords.length > 0 && keywords[0] !== "") {
        filteredCarcinogens = filteredCarcinogens.filter(carcinogen =>
            keywords.some(keyword => 
                carcinogen.agent.toLowerCase().includes(keyword.toLowerCase())
            )
        );
    }

    if (!(sortBy in filteredCarcinogens[0])) {
        return filteredCarcinogens;
    }

    return filteredCarcinogens.sort((a, b) => sortCarcinogens(a, b, sortBy as SortKey));
}