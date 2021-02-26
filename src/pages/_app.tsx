/* eslint-disable react/jsx-props-no-spreading */
import { ChallengesProvider } from '../contexts/ChallengesContext';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />;
    </ChallengesProvider>
  );
}

export default MyApp;

// no arquivo "_app", de modo geral,
// ficam componentes presentes em todas páginas da aplicação
