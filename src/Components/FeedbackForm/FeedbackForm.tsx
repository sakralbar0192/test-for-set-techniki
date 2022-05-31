import React, { FC, useState } from 'react';
import * as EmailValidator from 'email-validator';
import cl from './feedbackForm.module.scss'
import FeedbackInputField from '../UI/FeedbackInputField/FeedbackInputField';
import FeedbackSelect from '../UI/FeedbackSelect/FeedbackSelect';
import { IFeedbackData, IFeedbackSelectOption } from './../../types/index';
import FeedbackTextarea from '../UI/FeedbackTextarea/FeedbackTextarea';
import FeedbackButton from '../UI/FeedbackButton/FeedbackButton';
import FeedbackCheckbox from '../UI/FeedbackCheckbox/FeedbackCheckbox';

interface IFeedbackFormProps {
    citiesOptions: IFeedbackSelectOption[]
    questionsOptions: IFeedbackSelectOption[]
    communicationsOptions: IFeedbackSelectOption[]
    onSubmitHandler: (data:IFeedbackData) => void
}

const FeedbackForm:FC<IFeedbackFormProps> = ({citiesOptions, questionsOptions, communicationsOptions, onSubmitHandler}) => {

    const [name, setName] = useState('');
    const [city, setCity] = useState(citiesOptions[0]);
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [isEmailValid, setEmailValid] = useState(true);
    const [feedback, setFeedback] = useState('');
    const [question, setQuestion] = useState(questionsOptions[0]);
    const [comunication, setComunication] = useState(communicationsOptions[0]);
    const [approval, setApproval] = useState(false);

    function getInputNumbersValue(value:string):string {
        return value.replace(/\D/g, '');
    };

    function onNameChangeHandler(e:React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setName(value);
    }

    function onCityChangeHandler(e:React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        const cityName = citiesOptions.find(city => city.id === value);
        cityName ? setCity(cityName) : setCity(citiesOptions[0]);        
    }

    function formatTelValue(input:HTMLInputElement, inputNumbersValue:string) {
        let formatedInputValue = '';
        const selectionStart = input.selectionStart;        

        if (input.value.length !== selectionStart) {
            return;
        }

        if (['7', '8'].includes(inputNumbersValue[0])) {
            const firstSimbols = inputNumbersValue[0] === '8' ? '8' : '+7';
            formatedInputValue = firstSimbols + ' ';

            if (inputNumbersValue.length > 1) {
                formatedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }

            if (inputNumbersValue.length >= 5) {
                formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }

            if (inputNumbersValue.length >= 8) {
                formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }

            if (inputNumbersValue.length >= 10) {
                formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formatedInputValue = '+7' + inputNumbersValue;
        }

        setTel(formatedInputValue);
    }

    function onTelChangeHandler(e:React.ChangeEvent<HTMLInputElement>) {
        const input = e.target;
        let inputNumbersValue = getInputNumbersValue(input.value);
        if (!inputNumbersValue) {
            return setTel('');
        }
        formatTelValue(input, inputNumbersValue)        
    }
     
    function onTelPasteHandler(e:React.ClipboardEvent<HTMLInputElement>) {
        const pasted = e.clipboardData,
        inputNumbersValue = getInputNumbersValue(tel);

        if (pasted) {
            const pastedText = pasted.getData('Text');

            if (/\D/g.test(pastedText)) {
                setTel(inputNumbersValue);
            }
        }
    }

    function onTelKeyDownHandler(e:React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Backspace' && tel.length <= 3) {
            setTel('');
        }
    }

    function onEmailChangeHandler(e:React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;        
        setEmail(value);
    }

    function onQuestionChangeHandler(e:React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        const currentQuestion = questionsOptions.find(question => question.id === value);
        currentQuestion ? setQuestion(currentQuestion) : setQuestion(questionsOptions[0]); 
    }

    function onComunicationChangeHandler(e:React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        const currentComunucation = communicationsOptions.find(communucation => communucation.id === value);
        currentComunucation ? setComunication(currentComunucation) : setComunication(communicationsOptions[0]); 
    }

    function onFeedbackChangeHandler(e:React.ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value;
        setFeedback(value);
    }

    function onApprovalChangeHandler(e:React.ChangeEvent<HTMLInputElement>) {
        setApproval(!approval);
    }

    function validateForm(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const isEmailValid = EmailValidator.validate(email);
        if (isEmailValid || !email) {
            setEmailValid(true);
            const data = {
                name: name,
                city: city.name,
                tel: tel,
                email: email,
                question: question.name,
                communication: comunication.name,
                text: feedback
            }
            onSubmitHandler(data);
        } else {            
            setEmailValid(false);
        }    
    }

    return (
       <form className={cl.feedbackForm} onSubmit={validateForm}>
           <FeedbackInputField
                value={name}
                id='name' 
                type='text' 
                placeholder='Введите имя' 
                labelText='Ваше имя'
                isRequired={true}
                onChangeHandler={onNameChangeHandler}
            />
            <FeedbackSelect 
                options={citiesOptions}
                onChangeHandler={onCityChangeHandler}
                selectTitle='Город'
                selectedOption={city}
            />
            <FeedbackInputField
                value={tel}
                id='tel' 
                type='tel' 
                placeholder='+7 ( ___ ) ___ - __ - __' 
                labelText='Телефон'                
                onChangeHandler={onTelChangeHandler}
                onPasteHandler={onTelPasteHandler}
                onKeyDownHandler={onTelKeyDownHandler}
            />
            <FeedbackInputField
                value={email}
                id='email' 
                type='email' 
                placeholder='Введите email' 
                labelText='Почта'
                errorText='Email не является правильным E-Mail адресом.'
                isValid={isEmailValid}               
                onChangeHandler={onEmailChangeHandler}
            />
            <FeedbackSelect
                options={questionsOptions}
                onChangeHandler={onQuestionChangeHandler}
                selectTitle='Тема вопроса'
                selectedOption={question}
            />
            <FeedbackSelect 
                options={communicationsOptions}
                onChangeHandler={onComunicationChangeHandler}
                selectTitle='Способ связи'
                selectedOption={comunication}
            />
            <FeedbackTextarea value={feedback} label='Текст' isRequired={true} onChangeHandler={onFeedbackChangeHandler}/>
            <FeedbackCheckbox id='Approval' labelText='Нажимая на кнопку "отправить", я даю согласие на обработку персональных данных' isRequired={true} value={approval} onChangeHandler={onApprovalChangeHandler} />
            <FeedbackButton type='submit' text='Send' />
       </form>
    );
};

export default FeedbackForm; 