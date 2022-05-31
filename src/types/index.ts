export interface IFeedbackSelectOption {
    id: string
    name: string
}

export interface IFeedbackData {
    name: string
    city: string
    tel?: string
    email?: string
    question: string
    communication: string
    text: string
}