import { IFeedbackData } from "../types";

export default class FeedbackApi {
    static async sendFeedback(data: IFeedbackData) {
        try {
            const response = await fetch('/feedback', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response.ok                
        } catch(e) {
            alert(e)
        }
        
    }        
}