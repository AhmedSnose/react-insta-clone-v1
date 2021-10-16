import 'tailwindcss/tailwind.css'
import '../styles/globals.css';
import '../styles/post.css'
import {Provider} from 'next-auth/client'
import React from 'react';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  return(
   <Provider session={pageProps.session}>
     <RecoilRoot>
      <Component {...pageProps} />
     </RecoilRoot>
   </Provider>
)
}

export default MyApp
