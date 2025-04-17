import React, { useState } from "react";

export const CatalogDevicesList = ({
  list,
  filter,
  handleDeleteItem,
  setSelectedItem,
}) => {
  const DeviceListItem = React.memo(
    ({ info, onDelete, onSetSelectedItem }) => {
      const [isMouseOverItem, setIsMouseOverItem] = useState(false);

      const handleDelete = () => {
        onDelete(info.id);
      };

      return (
        <div
          key={info.id}
          class="col-sm-6 col-md-4 col-lg-3 mb-4"
          onMouseOver={() => setIsMouseOverItem(true)}
          onMouseLeave={() => setIsMouseOverItem(false)}
        >
          {isMouseOverItem ? (
              <label onClick={handleDelete}>X</label>
            ) : (
              <br></br>
            )}
          <div class="card" onClick={() => onSetSelectedItem(info)}>
            <img
              style={{ width: "100%" }}
              class="card-img-top"
              alt={info.model}
              src={info.image}
            />
            <div class="card-body">
              <b>
                <label class="card-title">{info.name}</label>
              </b>
              <p class="card-text">{info.price + " руб."}</p>
            </div>
          </div>
        </div>
      );
    },
    [list]
  );

  if (list.length === 0) {
    return <label class="h6">No list data</label>;
  }

  return (
    <div class="container-fluid bg-light">
      <div class="row">
        {list
          .filter((d) =>
            d.name.toLowerCase().includes(filter.name.toLowerCase())
          )
          .map((d) => (
            <DeviceListItem
              onSetSelectedItem={setSelectedItem}
              info={d}
              onDelete={handleDeleteItem}
            />
          ))}
      </div>
    </div>
  );
};
