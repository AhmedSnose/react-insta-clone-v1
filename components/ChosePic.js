import { Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession, signOut } from 'next-auth/client';

const img1 = 'https://www.kindpng.com/picc/m/699-6997553_wealtg-manager-avatar-illustration-hd-png-download.png';
const img2 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0hdrY8JPa6KVVvEo0uKO68yOoVt_-xBzsw&usqp=CAU';

async function CreateUser(dataUser) {
  const result = await fetch('/api/user/change-pic', {
    method: "PATCH",
    body: JSON.stringify({ imgUrl: dataUser }),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await result.json();
  if (!result.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
}

function ChosePic() {
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        router.replace('/');
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (imgUrl === '') {
      alert('ImgUrl is empty');
      return;
    }
    try {
      await CreateUser(imgUrl);
      signOut();
      router.replace('/');
      console.log("Uploaded new image");
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return <p className='text-5xl text-center'>Loading... <br /> <span className='font-bold'>[Add an Instagram logo here]</span></p>;
  }

  return (
    <div className='flex flex-col items-center justify-center  bg-gray-100 p-6'>
      <h2 className=' mb-5 text-gray-800 text-1xl font-semibold'>Choose an Image URL for Your Profile</h2>
      <form onSubmit={submitHandler} className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4'>
        {/* <h5 className='font-semibold'>Enter URL</h5> */}
        <input
          className='outline-none border border-gray-400 rounded-lg p-2 w-64'
          onChange={(e) => setImgUrl(e.target.value)}
          type='url'
          placeholder='Image URL'
        />
        <Button variant='contained' color='default' type='submit'>OK</Button>
      </form>

      <hr className='w-full my-10' />

      <h2 className='text-center mb-5 text-gray-800 text-1xl'>Or Choose a Default Avatar Below ⬇</h2>
      <div className='flex justify-center items-center space-x-6'>
        <div
          className={`rounded-full cursor-pointer p-2 ${imgUrl.includes(img1) ? 'ring-4 ring-green-400' : ''}`}
          onClick={() => setImgUrl(img1)}
        >
          <img src={img1} alt='Avatar 1' className='w-36 h-36 rounded-full object-cover' />
        </div>
        <div
          className={`rounded-full cursor-pointer p-2 ${imgUrl.includes(img2) ? 'ring-4 ring-green-400' : ''}`}
          onClick={() => setImgUrl(img2)}
        >
          <img src={img2} alt='Avatar 2' className='w-36 h-36 rounded-full object-cover' />
        </div>
      </div>

      <button
        onClick={submitHandler}
        className='bg-gray-800 text-white mt-10 p-2 w-full uppercase rounded-lg hover:bg-gray-600 transition-all text-lg active:bg-green-500'
      >
        Submit
      </button>
    </div>
  );
}

export default ChosePic;
