/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';
import { AiFillCaretRight, AiFillCheckCircle } from 'react-icons/ai';

import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const [time, setTime] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); // padStart: se a string não possui 2 espaços, preenche com '0'
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split(''); // padStart: se a string não possui 2 espaços, preenche com '0'

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(4);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setIsFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

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
