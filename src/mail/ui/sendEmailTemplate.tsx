interface VerifyEmailPageProps {
  name: string;
  url:string
}

export default function VerifyEmailPage({ name,url }: VerifyEmailPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 sm:p-12 w-full max-w-md text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mx-auto">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12H8m8 0l-4-4m4 4l-4 4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Verify your email, {name}
          </h1>
          <p className="text-gray-500 mt-2">
            Click the button below to confirm your email address and continue learning.
          </p>
        </div>

       <a href={url}>

        <button
          className="mt-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition duration-300"
          >
          Verify Email
        </button>
            </a>

        <p className="text-sm text-gray-400 mt-6">
          Didn’t get the email? <span className="text-indigo-600 hover:underline cursor-pointer">Resend</span>
        </p>
      </div>
    </div>
  );
}
