import React, { FC } from 'react';
import cl from './feedbackButton.module.scss';

interface IFeedbackButtonProps {
    type: "button" | "submit" | "reset"
    text: string
    onClickHandler?: () => void
}

const FeedbackButton:FC<IFeedbackButtonProps> = ({type, text, onClickHandler}) => {
    return (
       <button className={cl.feedbackButton} type={type} onClick={onClickHandler}>
           {text}
       </button>
    );
};

export default FeedbackButton; 