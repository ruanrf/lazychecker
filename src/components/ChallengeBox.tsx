/* eslint-disable import/prefer-default-export */
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const isChallengeActive = true;

  return (
    <div className={styles.challengeBoxContainer}>
      {isChallengeActive ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 exp</header>

          <main>
            <img src="icons/body.svg" alt="Challenge" />
            <strong>Novo desafio!</strong>
            <p>Do something</p>
          </main>

          <footer>
            <button type="button" className={styles.challengeFailedButton}>
              Falhei
            </button>
            <button type="button" className={styles.challengeSucceededButton}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Conclua um ciclo para ser desafiado!</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
