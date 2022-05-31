import React, { FC } from 'react';
import cl from './feedbackInputField.module.scss';

interface IFeedbackInputFieldProps {
    value: string
    id: string
    type: string
    placeholder: string
    labelText: string
    errorText?: string
    onChangeHandler?: (e:React.ChangeEvent<HTMLInputElement>) => void
    onPasteHandler?: (e:React.ClipboardEvent<HTMLInputElement>) => void
    onKeyDownHandler?: (e:React.KeyboardEvent<HTMLInputElement>) => void
    isRequired?: boolean
    isValid?: boolean
}

const FeedbackInputField:FC<IFeedbackInputFieldProps> = ({value, id, type, placeholder, labelText, errorText='', isRequired=false, isValid=true, onChangeHandler, onPasteHandler, onKeyDownHandler}) => {
    return (
        <div className={isValid ? cl.feedbackInputField : [cl.feedbackInputField, cl.invalidField].join(' ') }>
            <label htmlFor={id}>{labelText}{isRequired && '*'}</label>
            <input
                value={value}
                id={id} 
                type={type} 
                placeholder={placeholder} 
                onChange={onChangeHandler} 
                onPaste={onPasteHandler}
                onKeyDown={onKeyDownHandler}
                required={isRequired}
                autoComplete='off'
            />
            <p>{errorText}</p>
        </div>
    );
};

export default FeedbackInputField; 