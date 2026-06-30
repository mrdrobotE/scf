import { getCurrentYear } from '@/lib/utils';
import Link from 'next/link';

export default function SidebarWidget() {
  return (
    <div>
      {/* <!-- User profile --> */}
      <div className="pt-5 pb-3 px-3 rounded-2xl widget-bg">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Guest User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Sign in to access your account
              </p>
            </div>

            <Link
              href="/signin"
              className="shrink-0 bg-white dark:bg-white/10 text-[#344054] dark:text-white/70 px-3 py-1.5 text-xs font-medium rounded-full hover:bg-gray-100 dark:hover:bg-white/20 transition border border-gray-200 dark:border-gray-700"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <Link
            href="/signup"
            className="rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-semibold w-full px-4 py-2.5 hover:bg-primary-600 transition"
          >
            Get Started Free
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 mt-4">
        <div className="px-3 py-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {getCurrentYear()} SCF AI Documentation
          </p>
        </div>
      </div>
    </div>
  );
}