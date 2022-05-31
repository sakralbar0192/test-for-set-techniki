import React, { useState } from 'react';
import cl from './app.module.scss'
import FeedbackForm from './Components/FeedbackForm/FeedbackForm';
import FeedbackButton from './Components/UI/FeedbackButton/FeedbackButton';
import {citiesOptions, questionsOptions, communicationsOptions} from './mock/index';
import Modal from './Components/Modal/Modal';
import { IFeedbackData } from './types';
import FeedbackApi from './Api/index';
import Loader from './Components/Loader/Loader';

function App() {
  const [isModalActive, setModalActive] = useState(false);
  const [isLoading, setLoading] = useState(false);

  function showModal() {
    setModalActive(true);
  }

  async function onSubmitHandler(data:IFeedbackData) {
    setLoading(true);
    const isSuccessSend = await FeedbackApi.sendFeedback(data);
    if (isSuccessSend) {
      setModalActive(false)
      alert('Обращение успешно отправлено')
    } else {
      alert('Не удалось отправить обращение, попробуйте еще раз позже')
    }
    setLoading(false);
  }

  return (
    <div className={cl.app}>
      <Modal 
        isModalActive={isModalActive} 
        setModalActive={setModalActive}
        modalTitle='Обратная связь'
      > 
        <FeedbackForm 
          citiesOptions={citiesOptions}
          questionsOptions={questionsOptions}
          communicationsOptions={communicationsOptions}
          onSubmitHandler={onSubmitHandler}
        />
      </Modal>
      <FeedbackButton type='button' text='Задать вопрос' onClickHandler={showModal}/>  
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
