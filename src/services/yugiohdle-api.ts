import axios from 'axios';

axios.defaults.validateStatus = function(){
    return true;
}

export const yugiohdleApiService = axios.create({
    baseURL: process.env.API_BASE_URL,
});

export type Card = {
    name: string,
    type: string,
    frameType: string,
    description: string,
    atk: number | null,
    def: number | null,
    level: number | null,
    race: string,
    attribute: string | null,
    archetype: string | null,
    imageUrl: string,
    imageUrlSmall: string,
    imageUrlCropped: string,
    id: string,
    available: boolean
}

export type Response = {
    chosenCard: Card,
    correctCard: Card
}