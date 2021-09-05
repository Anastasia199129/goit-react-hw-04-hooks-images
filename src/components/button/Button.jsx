import React from 'react';
import s from './button.module.css';

const Button =({onClick, text})=> {
    return (
      <button className={s.button} type="button" onClick={onClick}>
        {text}
      </button>
    );
  }

export default Button;
