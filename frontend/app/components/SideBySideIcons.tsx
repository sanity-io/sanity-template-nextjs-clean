export default function SideBySideIcons() {
  return (
    <div className="relative flex gap-[0] -mt-16 group">
      <div className="z-10 aspect-square w-32 h-32 flex justify-center items-center rounded-full border-white border-4 bg-white transform translate-x-2 group-hover:scale-110 group-hover:-translate-x-5 transition-all duration-300">
        <svg
          className="w-full duration-300 transition"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="200" fill="currentColor" className="text-brand" />
          <g clipPath="url(#a)">
            <path
              d="m309.057 231.286-8.581-14.931-41.503 25.277 46.098-58.689 6.969-4.09-1.725-2.59 3.167-4.046-14.546-12.107-6.659 8.484-134.391 78.626 49.688-59.752 92.549-50.729-8.793-16.997-50.409 27.62 24.823-29.832L251.523 105l-55.866 67.174-55.484 30.429 42.479-56.158 26.618-13.854-8.453-17.186-77.551 40.368 21.148-27.984-14.772-11.831L85 175.041l.693.553 8.34 16.982 49.49-25.772-45.108 59.621 7.393 5.923 4.397 8.498 52.105-28.566-57.378 69.008 14.221 12.529 2.855-3.434 138.421-81.246-45.957 58.53.75.625-.071.044 9.528 16.575 61.124-37.239-23.536 37.981L278.042 296l37.475-60.465-6.46-4.249Z"
              fill="currentColor"
              className="text-black"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" transform="translate(85 105)" d="M0 0h230.517v191H0z" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="text-black opacity-0 text-4xl scale-50 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
        +
      </div>
      <div className="aspect-square w-32 h-32 border-white border-4 flex justify-center items-center rounded-full transform -translate-x-2 group-hover:scale-110 group-hover:translate-x-5 transition-all duration-300">
        <svg
          className="w-full duration-300 transition"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_408_139"
            style={{maskType: 'alpha'}}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="180"
            height="180"
          >
            <circle cx="90" cy="90" r="90" fill="black" />
          </mask>
          <g mask="url(#mask0_408_139)">
            <circle cx="90" cy="90" r="90" fill="black" strokeWidth="6" />
            <path
              d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
              fill="url(#paint0_linear_408_139)"
            />
            <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_139)" />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_408_139"
              x1="109"
              y1="116.5"
              x2="144.5"
              y2="160.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_408_139"
              x1="121"
              y1="54"
              x2="120.799"
              y2="106.875"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
