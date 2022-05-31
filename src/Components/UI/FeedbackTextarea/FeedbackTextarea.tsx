import React, { FC } from 'react';
import cl from './feedbackTextarea.module.scss'

interface IFeedbackTextareaProps {
    value: string
    label: string
    isRequired?: boolean
    onChangeHandler: (e:React.ChangeEvent<HTMLTextAreaElement>) => void
}

const FeedbackTextarea:FC<IFeedbackTextareaProps> = ({value, label, isRequired=false, onChangeHandler}) => {
    return (
        <label className={cl.feedbackTextarea}>
            <span>{label}{isRequired && '*'}</span>
            <textarea onChange={onChangeHandler} value={value} required={isRequired} rows={6}></textarea>
        </label>
    );
};

export default FeedbackTextarea; 