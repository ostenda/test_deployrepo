import '../styles/globals.css'
import Header from  '../components/Header'
import {QueryClient, QueryClientProvider} from "react-query"
import Script from "next/script"

const queryClient = new QueryClient();
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (<div className='bg-slate-900 min-h-screen w-screen overflow-x-auto'>
    <Script src='https://upload-widget.cloudinary.com/global/all.js' type='text/javascript'/>
    <SessionProvider session={session}>
      <Header/>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
    
    </div>)
}

export default MyApp
