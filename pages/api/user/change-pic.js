import { getSession } from 'next-auth/client';
import { connectToDataBase } from '../../../utils/db';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

   // getSession loking in request and see  if a session token cokie
   // is part of that req if its true , then will  extract that data from cokie
   // and then return it in const session
   
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user.email;
  const newimgUrl = req.body;

  console.log(newimgUrl , "___________");

  const client = await connectToDataBase();
  const usersCollection = client.db().collection('USERS');
  
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

//   const currentPassword = user.password;

//   const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

//   if (!passwordsAreEqual) {
//     res.status(403).json({ message: 'Invalid password.' });
//     client.close();
//     return;
//   }

//   const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { imgUrl: newimgUrl } }
  );

  client.close();
  res.status(200).json({ message: 'imgUrl updated!' });
}

export default handler;
