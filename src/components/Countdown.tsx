/* eslint-disable import/prefer-default-export */
import { AiFillCaretRight, AiFillCheckCircle } from 'react-icons/ai';
import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const {
    minutes,
    seconds,
    isFinished,
    isActive,
    resetCountdown,
    startCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); // padStart: se a string não possui 2 espaços, preenche com '0'
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split(''); // padStart: se a string não possui 2 espaços, preenche com '0'

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {isFinished ? (
        <button disabled type="button" className={styles.countdownButton}>
          Ciclo encerrado&nbsp;&nbsp;
          <AiFillCheckCircle className={styles.checkCircle} />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
              <img src="icons/close.svg" alt="Stop" />
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo&nbsp;
              <AiFillCaretRight />
            </button>
          )}
        </>
      )}
    </div>
  );
}
