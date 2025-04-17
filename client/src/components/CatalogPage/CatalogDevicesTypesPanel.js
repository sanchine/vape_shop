

export const CatalogDevicesTypesPanel = ({types, selectedType, onSelectType}) => {
    return (
        <div class="d-flex justify-content-around mt-3 border">
            {types.map((d) => {
                const labelString = d !== selectedType ? d : <b>{d}</b>;
                return (
                    <label class="p-2" onClick={() => onSelectType(d)}>
                        {labelString}
                    </label>
                );
            })}
        </div>
    )
}