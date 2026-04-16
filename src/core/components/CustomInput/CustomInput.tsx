import { FC } from "react";
interface CustomInputProps {
  name: string;
  defaultValue?: string;
  placeholder: string;
  type?: string;
  error?: string | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CustomInput: FC<CustomInputProps> = ({
  name,
  defaultValue,
  placeholder,
  type = "text",
  error = null,
  onChange,
}) => {
  return (
    <div className=" flex flex-col mb-4  h-16 ">
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        className="text-black rounded-xl border border-cyan-600 p-2 px-6"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
export default CustomInput;
