'use client';

import { cn } from '@/lib/utils';

type PropsType = {
  message: string;
};

export default function UserMessage({ message }: PropsType) {
  return (
    <div>
      <div
        className={cn(
          'shadow-theme-xs bg-primary-100 dark:bg-white/10 rounded-3xl rounded-tr-lg py-4 px-5 max-w-md ml-auto w-fit'
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message}</p>
      </div>
    </div>
  );
}