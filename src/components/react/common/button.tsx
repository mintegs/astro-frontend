/** @jsxImportSource react */
interface Button {
  children: string;
  type?: "submit" | "reset" | "button" | undefined;
  color?:
    | "bg-blue-600"
    | "bg-red-600"
    | "bg-green-600"
    | "bg-gray-600"
    | "bg-[#556ee6]";
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  type = undefined,
  color = "bg-blue-600",
  disabled = false,
  block = true,
  loading = false,
}: Button) {
  return (
    <button
      className={`${disabled ? "cursor-not-allowed bg-gray-600" : ""} ${
        block ? "w-full" : ""
      } ${color} text-center py-2 px-4 text-white rounded-lg`}
      type={type}
      disabled={disabled}
    >
      <div className="inline-flex items-center">
        {loading && (
          <svg
            className="animate-spin ml-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </div>
    </button>
  );
}
