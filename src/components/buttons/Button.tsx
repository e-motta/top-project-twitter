import { useState } from "react";

const Button = ({
  children,
  form,
  outlined,
  type,
  disabled,
  className,
  hoverText,
  onClick,
}: {
  children: React.ReactNode;
  form?: string;
  outlined?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  hoverText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const outlinedClass =
    outlined !== undefined ? "border border-neutral-300" : "";

  const [isHover, setIsHover] = useState(false);
  const content = isHover && hoverText !== undefined ? hoverText : children;

  return (
    <button
      className={`py-2 px-4 text-sm rounded-full transition-all
        hover:bg-opacity-90 active:bg-opacity-80 disabled:opacity-50
        ${className ?? ""} ${outlinedClass}`}
      type={type ?? "button"}
      form={form ?? ""}
      disabled={disabled}
      onClick={onClick}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
    >
      <div className="flex gap-2 justify-center">{content}</div>
    </button>
  );
};

export default Button;
