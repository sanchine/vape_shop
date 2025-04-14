import axios from "axios";
import { useState } from "react";
import { BACKEND_IP } from "../../apiConfig";

const CatalogItemPagePresentation = ({
  itemDataForm,
  setItemDataForm,
  onSubmit,
  onExit,
  isEditMode,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <button onClick={onExit}>Back</button>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>

      <div class="container-fluid">
        <div class="row d-flex">
          <img
            alt={itemDataForm.model}
            src={itemDataForm.image}
            style={{ width: "25%" }}
          />{" "}
          <br></br>
          <div class="col">
            <b>
              <label>{itemDataForm.name} </label>
            </b>
            <label>{itemDataForm.model}</label>
            <p>{itemDataForm.price + " руб."}</p>
            <p>{itemDataForm.description}</p>

            {isEditMode ? (
              <div class="row">
                <div class="col-4">
                  <input
                    class="form-control"
                    placeholder="Тип"
                    value={itemDataForm.type}
                    onChange={(e) =>
                      setItemDataForm((prev) => {
                        return { ...prev, type: e.target.value };
                      })
                    }
                  />
                  <input
                  class="form-control"
                    placeholder="Наименование"
                    value={itemDataForm.name}
                    onChange={(e) =>
                      setItemDataForm((prev) => {
                        return { ...prev, name: e.target.value };
                      })
                    }
                  />
                </div>

                <div class="col-4">
                  <input
                  class="form-control"
                    placeholder="Цена"
                    value={itemDataForm.price}
                    onChange={(e) =>
                      setItemDataForm((prev) => {
                        return { ...prev, price: e.target.value };
                      })
                    }
                  />
                  <input
                  class="form-control"
                    placeholder="URL изображения"
                    value={itemDataForm.image}
                    onChange={(e) =>
                      setItemDataForm((prev) => {
                        return { ...prev, image: e.target.value };
                      })
                    }
                  />
                </div>

                <div class="col-4">
                  <textarea
                    class="form-control"
                    placeholder="Описание"
                    multiple
                    value={itemDataForm.description}
                    onChange={(e) =>
                      setItemDataForm((prev) => {
                        return { ...prev, description: e.target.value };
                      })
                    }
                  />
                </div>

                <button class="form-control btn-outline-primary" type="submit" value="Edit" onClick={onSubmit}>Изменить</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CatalogItemPage = ({
  onExit,
  info,
  onItemDataChanged,
  onDeleteItem,
}) => {
  const [isEditingModeEnabled, setIsEditingModeEnabled] = useState(false);
  const [itemDataForm, setItemDataForm] = useState({
    name: info.name,
    type: info.type,
    price: info.price,
    description: info.description,
    image: info.image,
  });

  const handleEditSubmit = () => {
    const callToEdit = async (payload) => {
      try {
        const res = await axios.put(`http://${BACKEND_IP}:3001/devices`, {
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ ...payload }),
        });
        if (res) {
          if (res.status === 200) {
            onItemDataChanged({ ...payload });
            setIsEditingModeEnabled(false);
          } else {
            new Error("Not Edit");
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    const editedDeviceFields = {};
    for (const prop in itemDataForm) {
      if (itemDataForm[prop] !== info[prop])
        editedDeviceFields[prop] = itemDataForm[prop];
    }

    if (Object.keys(editedDeviceFields).length === 0) return;

    callToEdit({ id: info.id, ...editedDeviceFields });
    // console.log({id: info.id, ...editedDeviceFields})
  };

  const handleDelete = () => {
    onDeleteItem(info.id);
    onExit();
  };

  return (
    <CatalogItemPagePresentation
      itemDataForm={itemDataForm}
      setItemDataForm={setItemDataForm}
      onSubmit={handleEditSubmit}
      onExit={onExit}
      isEditMode={isEditingModeEnabled}
      onEdit={() => setIsEditingModeEnabled((prev) => !prev)}
      onDelete={handleDelete}
    />
  );
};
