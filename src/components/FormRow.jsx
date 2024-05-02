function FormRow({ type, name, value, handleChange, labelText, placeholder }) {
  return (
    <div className="flex flex-col pb-6">
      <label htmlFor={name} className="form-label p-2 text-lg">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        className="  h-12 text-black placeholder-black pl-3 shadow-lg shadow-opacity-25 rounded-xl shadow-black/10"
      />
    </div>
  );
}

export default FormRow;
