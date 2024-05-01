function FormRow({ type, name, value, handleChange, labelText, placeholder }) {
  return (
    <div className="flex flex-col pb-6">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        className="  h-12 bg-stone-400 text-black placeholder-black pl-3"
      />
    </div>
  );
}

export default FormRow;
