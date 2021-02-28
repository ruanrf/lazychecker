/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-new */
import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

import { LevelUpModal } from '../components/LevelUpModal';

import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  nextLevelExp: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
  resetUserData: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0,
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0,
  );

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [levelUpModalOpen, setLevelUpModalOpen] = useState(null);

  const nextLevelExp = ((level + 1) * 4) ** 2;

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeNumber = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeNumber];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio! (ɔ◔‿◔)ɔ ♥', {
        body: `Valendo ${challenge.amount} de exp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExp = currentExperience + amount;

    if (finalExp >= nextLevelExp) {
      finalExp -= nextLevelExp;
      levelUp();
    }

    setCurrentExperience(finalExp);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  function resetUserData() {
    setChallengesCompleted(0);
    setCurrentExperience(0);
    setLevel(1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        nextLevelExp,
        completeChallenge,
        closeLevelUpModal,
        resetUserData,
      }}
    >
      {children}

      {levelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
