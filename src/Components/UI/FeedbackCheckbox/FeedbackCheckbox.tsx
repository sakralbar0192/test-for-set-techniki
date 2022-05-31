import React, { FC } from 'react';
import cl from './feedbackCheckbox.module.scss'

interface IFeedbackCheckboxProps {
    value: boolean
    id: string
    labelText: string
    isRequired?: boolean
    onChangeHandler: (e:React.ChangeEvent<HTMLInputElement>) => void
}

const FeedbackCheckbox:FC<IFeedbackCheckboxProps> = ({value, id, labelText, isRequired=false, onChangeHandler}) => {
    return (
       <div className={cl.feedbackCheckbox}>
           <input type="checkbox" id={id} onChange={onChangeHandler} required={isRequired} checked={value} />
           <label htmlFor={id}>{labelText}</label>
       </div>
    );
};

export default FeedbackCheckbox; 