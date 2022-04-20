import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <><Navbar/><Component {...pageProps} /><Footer></Footer> </>
}

export default MyApp
