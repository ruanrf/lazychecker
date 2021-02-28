/* eslint-disable import/prefer-default-export */
import { useContext } from 'react';
import { BiReset } from 'react-icons/bi';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
  const { challengesCompleted, resetUserData } = useContext(ChallengesContext);

  return (
    <>
      <div className={styles.completedChallengesContainer}>
        <span>Desafios completos</span>
        <span>{String(challengesCompleted).padStart(2, '0')}</span>
      </div>
      <div className={styles.resetUserData}>
        <p>
          <button
            type="button"
            className={styles.resetUserData}
            onClick={resetUserData}
          >
            resetar dados
            <BiReset className={styles.biReset} />
          </button>
        </p>
      </div>
    </>
  );
}
