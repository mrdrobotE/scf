import Link from 'next/link';
import GeneratorSidebarNav from './generator-sidebar-nav';
import SidebarWidget from './sidebar-widget';

export default function GeneratorSidebar({
  sidebarOpen,
}: {
  sidebarOpen: boolean;
}) {
  return (
    <aside
      className={`max-lg:absolute inset-y-0 left-0 z-40 w-[288px] bg-white dark:bg-dark-primary border-r border-gray-100 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-[1_1_0] flex flex-col justify-between overflow-y-auto custom-scrollbar">
          <GeneratorSidebarNav />

          <div className="px-3 space-y-7 pb-6">
            <div className="px-2">
              <h2 className="text-xs font-medium text-gray-400 dark:text-gray-400 capitalize tracking-wider">
                Important links
              </h2>
              <nav className="mt-5 space-y-1">
                <Link
                  href="/faq"
                  className="flex items-center gap-2 px-3 py-2 hover:text-gray-800 dark:hover:text-white/90 text-sm font-medium rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.45827 10.0798C3.45827 6.46689 6.38708 3.53809 9.99994 3.53809C13.6128 3.53809 16.5416 6.46689 16.5416 10.0798C16.5416 13.6926 13.6128 16.6214 9.99994 16.6214H4.51893L5.37428 15.7661C5.51494 15.6254 5.59395 15.4347 5.59395 15.2357C5.59395 15.0368 5.51494 14.8461 5.37428 14.7054C4.18965 13.5208 3.45827 11.8864 3.45827 10.0798ZM9.99994 2.03809C5.55865 2.03809 1.95827 5.63846 1.95827 10.0798C1.95827 12.03 2.6533 13.8191 3.80795 15.2111L2.17794 16.8411C1.96345 17.0556 1.89928 17.3782 2.01536 17.6584C2.13145 17.9387 2.40493 18.1214 2.70827 18.1214H9.99994C14.4412 18.1214 18.0416 14.521 18.0416 10.0798C18.0416 5.63846 14.4412 2.03809 9.99994 2.03809ZM6.35411 8.83057C5.66375 8.83057 5.10411 9.39021 5.10411 10.0806C5.10411 10.7709 5.66375 11.3306 6.35411 11.3306H6.35421C7.04456 11.3306 7.60421 10.7709 7.60421 10.0806C7.60421 9.39021 7.04456 8.83057 6.35421 8.83057H6.35411ZM8.74994 10.0806C8.74994 9.39021 9.30959 8.83057 9.99994 8.83057H10C10.6904 8.83057 11.25 9.39021 11.25 10.0806C11.25 10.7709 10.6904 11.3306 10 11.3306H9.99994C9.30959 11.3306 8.74994 10.7709 8.74994 10.0806ZM13.6458 8.83057C12.9554 8.83057 12.3958 9.39021 12.3958 10.0806C12.3958 10.7709 12.9554 11.3306 13.6458 11.3306H13.6459C14.3362 11.3306 14.8959 10.7709 14.8959 10.0806C14.8959 9.39021 14.3362 8.83057 13.6459 8.83057H13.6458Z"
                      fill="currentColor"
                    />
                  </svg>
                  Help & FAQ
                </Link>
              </nav>
            </div>
            <SidebarWidget />
          </div>
        </div>
      </div>
    </aside>
  );
}