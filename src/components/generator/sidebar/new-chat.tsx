'use client';

import { useRouter } from 'next/navigation';

type PropsType = {
  toggleSidebar: () => void;
};

export function NewChat({ toggleSidebar }: PropsType) {
  const router = useRouter();

  const handleNewChat = () => {
    // Refresh the page to start a new chat
    window.location.reload();
    // Close the sidebar on mobile
    toggleSidebar();
  };

  return (
    <button
      onClick={handleNewChat}
      className="w-full bg-gray-700 dark:bg-white/15 dark:hover:bg-white/25 font-medium text-sm hover:bg-gray-800 transition text-white py-3 px-5 rounded-full flex items-center justify-center disabled:pointer-events-none disabled:opacity-80"
    >
      New Chat
    </button>
  );
}