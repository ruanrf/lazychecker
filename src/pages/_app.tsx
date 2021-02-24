import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

// no arquivo "_app", de modo geral,
// ficam componentes presentes em todas páginas da aplicação