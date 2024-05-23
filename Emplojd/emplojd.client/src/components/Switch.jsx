/*  toggle lamp knapp  */
function Switch() {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" class="sr-only peer" />
      <div className="relative w-11 h-6 bg-stone-300-200 bg-stone-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-stone-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stone-700"></div>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-300"></span>
    </label>
  );
}

export default Switch;
