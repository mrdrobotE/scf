import Image from 'next/image';
import Link from 'next/link';
import HeroLogos from '../hero-logos';
import { Subheading } from './subheading';
import { IntroVideo } from './intro-video';

export default function HeroSection() {
  return (
    <section className="pt-16 relative overflow-hidden dark:bg-[#171F2E]">
      <div className="max-w-[120rem] mx-auto relative">
        <div className="wrapper">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center pb-16">
              <Subheading text="AI-Powered Supply Chain Financing" />

              <h1 className="text-gray-700 mx-auto font-bold mb-4 text-4xl sm:text-[50px] dark:text-white/90 sm:leading-[64px] max-w-[700px]">
                Smart Credit Financing <br />
                <span className="text-primary-500">Intelligence</span>
              </h1>
              <p className="max-w-[537px] text-center mx-auto dark:text-gray-400 text-gray-500 text-base">
                Federated learning and explainable AI for privacy-preserving credit scoring, real-time risk intelligence, and automated supply chain financing.
              </p>

              <div className="mt-9 flex sm:flex-row flex-col gap-3 relative z-30 items-center justify-center">
                <Link
                  href="/contact"
                  className="bg-primary-500 transition h-12 inline-flex items-center justify-center hover:bg-primary-600 px-6 py-3 rounded-full text-white text-sm"
                >
                  Get Started
                </Link>

                <IntroVideo />
              </div>
            </div>
          </div>
          <div className="max-w-[1000px] mx-auto relative">
            <div className="p-3 sm:p-[18px] relative z-30 rounded-[32px] border border-white/30 dark:border-white/10 bg-white/20">
              <Image
                src="/images/hero/hero-img.jpg"
                alt="SCF AI Platform Dashboard"
                className="w-full rounded-2xl block dark:hidden"
                width={966}
                height={552}
              />
              <Image
                src="/images/hero/hero-img-dark.png"
                alt="SCF AI Platform Dashboard"
                className="w-full rounded-2xl hidden dark:block"
                width={966}
                height={552}
              />
            </div>
            <div className="absolute hidden lg:block z-10 -top-20 -translate-y-20 left-1/2 -translate-x-1/2">
              <svg
                width="1300"
                height="1001"
                viewBox="0 0 1300 1001"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.7" filter="url(#filter0_f_9279_7148)">
                  <circle cx="800" cy="500.03" r="300" fill="#4E6EFF" />
                </g>
                <g opacity="0.3" filter="url(#filter1_f_9279_7148)">
                  <circle cx="500" cy="500.03" r="300" fill="#FF58D5" />
                </g>
                <defs>
                  <filter
                    id="filter0_f_9279_7148"
                    x="300"
                    y="0.029541"
                    width="1000"
                    height="1000"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="100"
                      result="effect1_foregroundBlur_9279_7148"
                    />
                  </filter>
                  <filter
                    id="filter1_f_9279_7148"
                    x="0"
                    y="0.029541"
                    width="1000"
                    height="1000"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="100"
                      result="effect1_foregroundBlur_9279_7148"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* --- FLOATING HIGH-VISIBILITY VIBRANT BADGES --- */}
        <div className="max-[1100px]:hidden select-none">
          
          {/* Shape Left 1: Text Generator */}
          <div className="absolute top-14 left-16 floating-1 flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-100/90 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-500/30 backdrop-blur-md shadow-[0_8px_32px_rgba(147,51,234,0.25)]">
            <span className="text-purple-600 dark:text-purple-300 text-sm drop-shadow-sm">💬</span>
            <span className="text-xs font-bold text-purple-700 dark:text-purple-200 tracking-wide">SCF Credit AI Engine</span>
            {/* Detached Triangle */}
            <div className="absolute bottom-1 -right-4 w-0 h-0 border-t-[5px] border-t-transparent border-l-[7px] border-l-purple-600 dark:border-l-purple-400 border-b-[5px] border-b-transparent rotate-[15deg] opacity-90"></div>
          </div>

          {/* Shape Left 2: Code Generator */}
          <div className="absolute left-[145px] top-[298px] floating-2 max-[1240px]:left-[80px] flex items-center gap-2 px-4 py-2.5 rounded-full bg-sky-100/90 dark:bg-sky-900/40 border border-sky-300 dark:border-sky-500/30 backdrop-blur-md shadow-[0_8px_32px_rgba(3,105,161,0.25)]">
            <span className="text-sky-600 dark:text-sky-300 text-xs drop-shadow-sm">💻</span>
            <span className="text-xs font-bold text-sky-700 dark:text-sky-200 tracking-wide">Supply Chain Financing</span>
            {/* Detached Triangle */}
            <div className="absolute -top-3 -right-3 w-0 h-0 border-t-[5px] border-t-transparent border-l-[7px] border-l-sky-600 dark:border-l-sky-400 border-b-[5px] border-b-transparent -rotate-[35deg] opacity-90"></div>
          </div>

          {/* Shape Right 1: Image Generator */}
          <div className="absolute right-16 top-[108px] floating-3 flex items-center gap-2 px-4 py-2.5 rounded-full bg-orange-100/90 dark:bg-orange-900/40 border border-orange-300 dark:border-orange-500/30 backdrop-blur-md shadow-[0_8px_32px_rgba(234,88,12,0.25)]">
            <span className="text-orange-600 dark:text-orange-300 text-xs drop-shadow-sm">🖼️</span>
            <span className="text-xs font-bold text-orange-700 dark:text-orange-200 tracking-wide">AI Credit Scoring</span>
            {/* Detached Triangle */}
            <div className="absolute bottom-1 -left-4 w-0 h-0 border-t-[5px] border-t-transparent border-r-[7px] border-r-orange-600 dark:border-r-orange-400 border-b-[5px] border-b-transparent -rotate-[15deg] opacity-90"></div>
          </div>

          {/* Shape Right 2: Video Generator */}
          <div className="absolute top-[316px] right-[200px] floating-4 max-[1240px]:right-[80px] max-[1350px]:right-[150px] max-[1500px]:right-[200px] flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-100/90 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-500/30 backdrop-blur-md shadow-[0_8px_32px_rgba(217,119,6,0.25)]">
            <span className="text-amber-600 dark:text-amber-300 text-xs drop-shadow-sm">▶️</span>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-200 tracking-wide">Predictive Analytics Suite</span>
            {/* Detached Triangle */}
            <div className="absolute -top-3 -left-3 w-0 h-0 border-t-[5px] border-t-transparent border-r-[7px] border-r-amber-600 dark:border-r-amber-400 border-b-[5px] border-b-transparent rotate-[35deg] opacity-90"></div>
          </div>

        </div>
      </div>
      <div className="hero-glow-bg pointer-events-none w-full h-167.5 absolute z-10 bottom-0"></div>
      <HeroLogos />
    </section>
  );
}