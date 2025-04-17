import { useState } from "react";
import axios from "axios";
import { BACKEND_IP } from "../../apiConfig";

export const CatalogDevicesEditPanel = ({ onAddOne }) => {
  const [addFormData, setAddFormData] = useState({
    type: "",
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const onSubmitHandler = async () => {
    try {
      const data = { ...addFormData };
      console.log(data);
      const res = await axios.post(`http://${BACKEND_IP}:3001/devices/add`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ data }),
      });

      if (res) {
        console.log(res.statusText);
        onAddOne(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div class="col mt-3 bg-light">
      <div class="row form p-2 m-1">
        <h4>Добавление товара</h4>

        <div class="col">
          <input
            class="form-control m-1"
            id="type"
            name="type"
            placeholder="Тип"
            value={addFormData["type"]}
            onChange={(event) => {
              setAddFormData((prev) => ({ ...prev, type: event.target.value }));
            }}
          />
          <input
            class="form-control m-1"
            id="image"
            name="image"
            placeholder="URL изображения"
            value={addFormData["image"]}
            onChange={(event) => {
              setAddFormData((prev) => ({
                ...prev,
                image: event.target.value,
              }));
            }}
          />
        </div>

        <div class="col">
          <input
            class="form-control m-1"
            id="name"
            name="name"
            placeholder="Наименование"
            value={addFormData["name"]}
            onChange={(event) => {
              setAddFormData((prev) => ({ ...prev, name: event.target.value }));
            }}
          />
          <input
            class="form-control m-1"
            id="price"
            name="price"
            placeholder="Цена"
            value={addFormData["price"]}
            onChange={(event) => {
              setAddFormData((prev) => ({
                ...prev,
                price: event.target.value,
              }));
            }}
          />
        </div>

        <div class="col">
          <textarea
            class="form-control m-1"
            multiple
            id="description"
            name="description"
            placeholder="Описание"
            value={addFormData["description"]}
            onChange={(event) => {
              setAddFormData((prev) => ({
                ...prev,
                description: event.target.value,
              }));
            }}
          />
        </div>

        <div class="row">
          <input
            class="form-control btn btn-outline-dark m-2"
            type="submit"
            value="Add"
            onClick={onSubmitHandler}
          />
        </div>
      </div>
    </div>
  );
};
