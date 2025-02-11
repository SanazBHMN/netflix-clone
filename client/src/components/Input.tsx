interface InputProps {
  id: string;
  label: string;
  type?: string;
}

function Input({ id, label, type }: InputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        className="block rounded-md px-6 pt-6 pb-1 w-full text-base"
      />
      <label
        htmlFor=""
        className="absolute text-base text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
