import { FC } from 'react';
import cl from './modal.module.scss'

interface modalProps {
    isModalActive: boolean
    setModalActive: (b:boolean)=>void
    modalTitle: string
    children: React.ReactNode
}

const Modal:FC<modalProps> = ({isModalActive, setModalActive, modalTitle, children}) => {   

    return (
        <div 
            className={isModalActive ? [cl.modal, cl.open].join(' ') : cl.modal} 
            onClick={()=> {setModalActive(false);}}
        >            
            <div 
                className={isModalActive ? [cl.modal__content, cl.open].join(' ')  : cl.modal__content}  
                onClick={e => e.stopPropagation()} 
            >
                <h2>{modalTitle}</h2>
                {children}            
            </div>            
        </div>
    )
}

export default Modal;