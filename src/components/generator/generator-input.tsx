import { AttachmentIcon, LongArrowUpIcon } from '@/icons/icons';
import { useEffect, useRef, useState } from 'react';

type PropsType = {
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  value?: string;
  disabled?: boolean;
  onSubmit?: (message: string) => void;
  isLoading?: boolean;
};

export default function GeneratorInput({
  onChange,
  value,
  disabled,
  onSubmit,
  isLoading = false,
}: PropsType) {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isAttaching, setIsAttaching] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleSubmit = () => {
    if (value?.trim() && !isLoading && onSubmit) {
      onSubmit(value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAttaching(true);
      // Handle file upload logic here
      console.log('File selected:', file.name);
      // You can add file upload logic here
      setTimeout(() => setIsAttaching(false), 1000);
    }
  };

  return (
    <div className="sticky bottom-0 inset-x-0 z-30 mt-auto">
      <div className="h-4" />

      <div
        className="bg-white/15 dark:bg-white/5 border border-[#E4E7EC] dark:border-white/10 rounded-3xl backdrop-blur-[10px] shadow-theme-md overflow-hidden aria-disabled:opacity-70 aria-disabled:pointer-events-none"
        aria-disabled={disabled || isLoading}
      >
        <div className="p-5 pb-0 pr-[calc((var(--spacing)*5)-10px)]">
          <textarea
            ref={textareaRef}
            placeholder="Ask about SCF AI documentation..."
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="dark:text-white/90 focus:outline-0 placeholder:text-sm dark:placeholder:text-white/50 resize-none max-h-44 leading-5 w-full custom-scrollbar pb-8"
            required
            rows={1}
            disabled={disabled || isLoading}
          />
        </div>
        <div className="flex justify-between items-center gap-2 p-3 pt-0">
          <label htmlFor="attach-file" className="flex items-center gap-1.5 cursor-pointer group">
            <input
              type="file"
              accept=".pdf, .doc, .docx, .txt, .md"
              name="attachFile"
              id="attach-file"
              className="sr-only"
              onChange={handleFileChange}
              disabled={disabled || isLoading}
            />
            <AttachmentIcon className="group-hover:text-primary-500 transition" />
            <span className="text-[#98A2B3] text-sm group-hover:text-gray-600 dark:group-hover:text-gray-300 transition">
              {isAttaching ? 'Uploading...' : 'Attach file'}
            </span>
          </label>

          <button
            type="submit"
            ref={submitButtonRef}
            onClick={handleSubmit}
            className={`size-10 flex transition items-center justify-center rounded-full text-white ${
              value?.trim() && !isLoading
                ? 'bg-[#1D2939] dark:bg-primary-500 hover:bg-primary-600'
                : 'bg-gray-300 dark:bg-white/20 cursor-not-allowed'
            }`}
            disabled={!value?.trim() || isLoading}
          >
            <span className="sr-only">Submit</span>
            <LongArrowUpIcon />
          </button>
        </div>
      </div>

      <div className="h-5" />
    </div>
  );
}