// Presentational on/off switch. Controlled — the parent owns `checked` and handles `onChange`.
// role="switch" + aria-checked so screen readers announce it as a toggle, not a plain button.
// onChange is called with the *next* value, so a flip-only handler (like our theme Toggle) works too.
export default function Switch({ checked = false, onChange, ...rest }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        checked ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
      }`}
      {...rest}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-150 ${
          checked ? 'translate-x-[18px]' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}