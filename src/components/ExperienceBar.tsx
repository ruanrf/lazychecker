/* eslint-disable import/prefer-default-export */
import { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, nextLevelExp } = useContext(ChallengesContext);

  const nextLevelExpPercentage = Math.round(
    (currentExperience * 100) / nextLevelExp,
  );

  return (
    <header className={styles.experienceBar}>
      <span>0</span>
      <div>
        <div style={{ width: `${nextLevelExpPercentage}%` }}>
          <span
            className={styles.currentExperience}
            style={{ left: `${nextLevelExpPercentage}%` }}
          >
            {' '}
            {currentExperience > 0
              ? `${currentExperience} exp (${nextLevelExpPercentage}%)`
              : ''}
          </span>
        </div>
      </div>
      <span>{nextLevelExp}</span>
    </header>
  );
}
