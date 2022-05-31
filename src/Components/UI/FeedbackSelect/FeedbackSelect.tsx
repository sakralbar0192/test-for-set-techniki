import React, { FC } from 'react';
import cl from './feedbackSelect.module.scss';
import { IFeedbackSelectOption } from './../../../types/index';

interface IFeedbackSelectProps {
    options: IFeedbackSelectOption[]
    selectedOption: IFeedbackSelectOption
    selectTitle: string
    onChangeHandler: (e:React.ChangeEvent<HTMLSelectElement>) => void
}

const FeedbackSelect:FC<IFeedbackSelectProps> = ({options, selectedOption, selectTitle, onChangeHandler}) => {
    return (
        <label className={cl.feedbackSelect}> 
            <span>{selectTitle}</span>
            <select onChange={onChangeHandler} value={selectedOption.id}>
                {options.map(option => {
                    return (
                        <option value={option.id} key={option.id}>{option.name}</option>
                    )
                })}
            </select>
        </label>
    );
};

export default FeedbackSelect; 