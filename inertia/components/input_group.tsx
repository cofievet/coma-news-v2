export interface IinputGroup {
  id: string
  name: string
  label: string
  value: string
  field: string
  type: string
  error: string | undefined
  placeholder: string
  onChange: any
}

export default function InputGroup({
  id,
  name,
  value,
  label,
  field,
  type,
  error,
  placeholder,
  onChange,
}: IinputGroup) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={name}>{label}</label>
      <input
        required
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className="p-3 border-2 rounded"
        autoComplete="off"
        data-lpignore="true"
        data-form-type="other"
        onChange={(event) => onChange(`${field}`, event.target.value)}
      />
      {error && <span className="text-red-500 font-bold">{error}</span>}
    </div>
  )
}
