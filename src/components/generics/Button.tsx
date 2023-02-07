const Button = ({
  children,
  form,
  outlined,
  type,
  disabled,
  className,
  onClick,
}: {
  children: React.ReactNode;
  form?: string;
  outlined?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <button
      className={`py-2 px-4 text-sm rounded-full transition-all
        hover:bg-opacity-90 active:bg-opacity-80 disabled:opacity-50
         ${className} ${outlined && "border border-neutral-300"}`}
      type={type ?? "button"}
      form={form ?? ""}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="flex gap-2 justify-center">{children}</div>
    </button>
  );
};

export default Button;
