export type Carcinogen = {
    agent: string;
    group: string;
    volume: string;
    additionalInformation: string;
    volumePublicationYear: string;
    evaluationYear: string;
}

export type SortKey = 'agent' | 'group' | 'volume' | 'additionalInformation' | 'volumePublicationYear' | 'evaluationYear';
export type SortMethod = 'asc' | 'desc';

export interface CarcinogenListSearchProps {
    groups?: string[];
    sortBy?: SortKey;
    sortMethod?: SortMethod;
    keywords?: string[];
}