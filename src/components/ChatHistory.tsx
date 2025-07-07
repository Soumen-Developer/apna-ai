import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useUser } from '@clerk/clerk-react';

interface Chat {
  id: string;
  created_at: string;
  title: string;
}

const ChatHistory = () => {
  const { user } = useUser();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      if (!user) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('chats')
        .select('id, created_at, title')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching chats:', error);
      } else {
        setChats(data as Chat[]);
      }
      setLoading(false);
    };

    fetchChats();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 p-4">
      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} className="mb-2">
            <a href={`/chat/${chat.id}`} className="text-blue-600 dark:text-blue-400">
              {chat.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;
