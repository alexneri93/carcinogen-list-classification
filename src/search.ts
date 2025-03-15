import carcinogens from './data/carcinogens_list_classification.json';
import { carcinogenListSearchProps } from './types';

export function carcinogenListSearch({
    groups = ["1", "2A", "2B", "3", "4"],
    sortBy = "group",
    sortMethod = "asc",
    keywords = [""]
}: carcinogenListSearchProps) {
    let filteredCarcinogens = carcinogens.filter(carcinogen => groups.includes(carcinogen.group))

    if (keywords.length > 0 && keywords[0] !== "") {
        filteredCarcinogens = filteredCarcinogens.filter(carcinogen => keywords.some(keyword => carcinogen.agent.toLowerCase().includes(keyword.toLowerCase())))
    }

    switch (sortBy) {
        case "agent":
            return sortMethod === "desc" ? filteredCarcinogens.sort((a, b) => b.agent.localeCompare(a.agent)) : filteredCarcinogens.sort((a, b) => a.agent.localeCompare(b.agent))
        case "group":
            return sortMethod === "desc" ? filteredCarcinogens.sort((a, b) => b.group.localeCompare(a.group)) : filteredCarcinogens.sort((a, b) => a.group.localeCompare(b.group))
        case "volume":
            return sortMethod === "desc" ? filteredCarcinogens.sort((a, b) => b.volume.localeCompare(a.volume)) : filteredCarcinogens.sort((a, b) => a.volume.localeCompare(b.volume))
        case "additionalInformation":
            return sortMethod === "desc" ? filteredCarcinogens.sort((a, b) => b.additionalInformation.localeCompare(a.additionalInformation)) : filteredCarcinogens.sort((a, b) => a.additionalInformation.localeCompare(b.additionalInformation))
        case "volumePublicationYear":
            return sortMethod === "desc" ? filteredCarcinogens.sort((a, b) => b.volumePublicationYear.localeCompare(a.volumePublicationYear)) : filteredCarcinogens.sort((a, b) => a.volumePublicationYear.localeCompare(b.volumePublicationYear))
        case "evaluationYear":
            return sortMethod === "desc" ? filteredCarcinogens.sort((a, b) => b.evaluationYear.localeCompare(a.evaluationYear)) : filteredCarcinogens.sort((a, b) => a.evaluationYear.localeCompare(b.evaluationYear))
        default:
            return []
    }
}