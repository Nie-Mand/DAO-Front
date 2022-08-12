interface InputProps {
  label: string
  type: string
  name: string
  placeholder: string
  suffix?: string
  className?: string
  disabled?: boolean
}

export default function Input(props: InputProps) {
  return (
    <div className={`grid gap-2 ${props.className}`}>
      <label htmlFor={props.name} className="font-bold capitalize text-sm">
        {props.label} :
      </label>
      <div className="flex items-center border rounded p-2 text-sm focus-within:ring focus-within:ring-primary focus-within:ring-opacity-50 duration-200">
        <input
          type={props.type}
          id={props.name}
          name={props.name}
          placeholder={props.placeholder}
          className="focus:outline-none flex-1 disabled:opacity-40"
          required
          step="0.0000001"
          disabled={props.disabled}
        />
        {props.suffix && (
          <span className="text-xs font-bold text-primary/70">
            {props.suffix}
          </span>
        )}
      </div>
    </div>
  )
}
