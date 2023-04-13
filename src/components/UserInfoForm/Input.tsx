const Input = ({
  value,
  setValue,
  label,
  validationMessage,
}: {
  value: string;
  setValue: (value: React.SetStateAction<string>) => void;
  label: string;
  validationMessage?: string;
}) => {
  const filledInputClass = value !== "" ? "text-[.8rem]" : "";
  const filledInput = Boolean(value);

  return (
    <div className="flex flex-col relative group">
      <label
        htmlFor="name"
        className={`absolute top-4 left-2 transition-all
          group-focus-within:text-[.8rem] group-focus-within:top-[8px]
          ${filledInputClass} ${
          validationMessage !== "" ? "text-red-500" : "text-gray-500"
        }`}
        style={filledInput ? { top: "8px" } : {}}
      >
        {label}
      </label>
      <input
        type="text"
        id="name"
        className={`border rounded-md p-2 pt-6 outline-none focus:outline-sky-500 -outline-offset-1 ${
          validationMessage !== "" ? "border-red-200" : "border-gray-200"
        }`}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {validationMessage !== undefined && (
        <span className="ml-1 text-red-500">{validationMessage}</span>
      )}
    </div>
  );
};

export default Input;
