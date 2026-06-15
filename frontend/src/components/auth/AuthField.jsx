function AuthField({
  autoComplete,
  error,
  label,
  name,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  value,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <input
        autoComplete={autoComplete}
        className={`input-shell ${error ? 'border-rose-300 focus:border-rose-300 focus:ring-rose-100' : ''}`}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {error ? <span className="mt-2 block text-sm text-rose-600">{error}</span> : null}
    </label>
  )
}

export default AuthField
