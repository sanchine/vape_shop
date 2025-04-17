export const CatalogDevicesFilterPanel = ({
  name,
  setName,
  setIsShowAddForm,
  setSortingType,
  isShowAddForm,
}) => {
  return (
    <div class="row p-2">
      <input
        class="form-control w-25 border-danger"
        placeholder="Наименование"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        class="form-select w-25 border-warning"
        placeholder="Сортировка"
        onChange={(e) => setSortingType(e.target.value)}
      >
        <option value="default">По умолчанию</option>
        <option value="from-low">Сначала дешевле</option>
        <option value="from-high">Сначала дороже</option>
      </select>
      <button
        class="form-control btn btn-outline-success w-25"
        onClick={() => {
          setIsShowAddForm((prev) => !prev);
        }}
      >
        {isShowAddForm ? "X" : "Добавить товар"}
      </button>
    </div>
  );
};
