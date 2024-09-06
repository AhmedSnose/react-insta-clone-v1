import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { db } from "../utils/firebase";
import {
  addDoc,
  collection,
  query,
  where,
  serverTimestamp,
  onSnapshot,
} from "@firebase/firestore";

const ChatPage = ({ session }) => {
  const router = useRouter();
  const { email, receverImg } = router.query;
  const messageRef = useRef();
  const [MSender, setMSender] = useState([]);
  const [MSreceiver, setMSreceiver] = useState([]);

  // Fetch received messages
  useEffect(() => {
    if (session) {
      onSnapshot(
        query(collection(db, "Users", "messges", session.user.email), where("email", "==", email)),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          setMSreceiver(data);
        }
      );
    }
  }, [db, email, session]);

  // Fetch sent messages
  useEffect(() => {
    if (session) {
      onSnapshot(
        query(collection(db, "Users", "messges", email), where("email", "==", session.user.email)),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          setMSender(data);
        }
      );
    }
  }, [db, email, session]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    if (!message.trim()) return;

    await addDoc(collection(db, "Users", "messges", email), {
      email: session.user.email,
      photoUrl: session.user.image,
      timeStamp: serverTimestamp(),
      message,
    });
    messageRef.current.value = ''; // Clear input after sending
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 bg-white">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 border-b bg-gray-50">
          <span className="text-lg font-bold">Chat with {email}</span>
          <img
            src={receverImg || "https://source.unsplash.com/random/50x50"}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </header>

        {/* Chat Messages */}
        <div className="flex flex-col h-full">
          <div className="overflow-y-auto px-4 py-2 flex-grow">
            {/* Receiver's Messages */}
            {MSreceiver.map((msg, index) => (
              <div key={index} className="flex items-center mb-2">
                <img
                  src={msg.photoUrl || "https://source.unsplash.com/random/50x50"}
                  alt="Receiver"
                  className="w-8 h-8 rounded-full"
                />
                <div className="bg-gray-200 p-2 rounded-lg ml-2">
                  {msg.message}
                </div>
              </div>
            ))}

            {/* Sender's Messages */}
            {MSender.map((msg, index) => (
              <div key={index} className="flex items-center justify-end mb-2">
                <div className="bg-blue-500 text-white p-2 rounded-lg mr-2">
                  {msg.message}
                </div>
                <img
                  src={msg.photoUrl || "https://source.unsplash.com/random/50x50"}
                  alt="Sender"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="p-4 border-t flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border p-2 rounded-full"
              ref={messageRef}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-full"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
