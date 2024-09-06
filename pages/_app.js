import 'tailwindcss/tailwind.css'
import '../styles/globals.css';
import {Provider} from 'next-auth/client'
import React from 'react';
import { RecoilRoot } from 'recoil';
import MainLayout from '../components/MainLayout';

function MyApp({ Component, pageProps }) {
  return(
   <Provider session={pageProps.session}>
     <RecoilRoot>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
     </RecoilRoot>
   </Provider>
)
}

export default MyApp
