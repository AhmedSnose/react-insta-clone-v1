import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import {connectToDataBase} from '../../../utils/db'
import {verifyPassword} from '../../../utils/auth'
import {useSession ,signOut} from 'next-auth/client'



export default NextAuth({
  session: {
      jwt: true,
    },
    providers: [
      Providers.Credentials({
        async authorize(credentials) {

          const client = await connectToDataBase();
          const usersCollection = client.db().collection('USERS');

          // login with email/username monogoDB
          // https://www.google.com/search?q=login+with+email%2Fusername+monogoDB&rlz=1C1CHZN_enEG966EG966&sxsrf=AOaemvJIp6JJOh1z4qfjWubPy6EYArb85A%3A1634022854099&ei=xjVlYbjIBZKqa7mKqegP&ved=0ahUKEwi4w5e-qcTzAhUS1RoKHTlFCv0Q4dUDCA4&uact=5&oq=login+with+email%2Fusername+monogoDB&gs_lcp=Cgdnd3Mtd2l6EAMyBwghEAoQoAE6BwgAEEcQsAM6BggAEBYQHjoICCEQFhAdEB46BQghEKABSgQIQRgAUNlMWIOWAmCylwJoAXACeACAAcgBiAHqCpIBBTAuNy4xmAEAoAEByAEIwAEB&sclient=gws-wiz

          const user = await usersCollection.findOne({
            email: credentials.email
          });

          // console.log(user, "name");

          if (!user) {
            client.close();
            throw new Error('Email Error');
          }
  
          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );
  
          if (!isValid) {
            client.close();
            throw new Error('Password Error');
          }
  
          client.close();
          return { email: user.email , name:user.name , image:user.imgUrl , any:user.any};
          
        },
      }),
    ]
  });
