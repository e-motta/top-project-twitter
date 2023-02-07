const Input = ({
  value,
  setValue,
  label,
}: {
  value: string;
  setValue: (value: React.SetStateAction<string>) => void;
  label: string;
}) => {
  const filledInputClass = value !== "" ? "top-[8px] text-[.8rem]" : "";

  return (
    <div className="flex flex-col relative group">
      <label
        htmlFor="name"
        className={`text-gray-500 absolute top-4 left-2 transition-all
          group-focus-within:top-2 group-focus-within:text-[.8rem]
          ${filledInputClass}`}
      >
        {label}
      </label>
      <input
        type="text"
        id="name"
        className="border border-gray-200 rounded-md p-2 pt-6"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
