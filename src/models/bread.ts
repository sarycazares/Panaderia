export interface Bread {
    id?: string
    type: string
    expirationMonth: MONTH
}

export enum MONTH {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    Octuber,
    November,
    December
}