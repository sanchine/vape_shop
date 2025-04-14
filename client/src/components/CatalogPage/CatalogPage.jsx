import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_IP } from "../../apiConfig";
import { CatalogItemPage } from "./CatalogItemPage";
import { CatalogDevicesEditPanel } from "./CatalogDevicesEditPanel";

export const CatalogPage = () => {
  const [devicesData, setDevicesData] = useState([]);
  const [devicesList, setDevicesList] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [sortingType, setSortingType] = useState("default");
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isShowAddForm, setIsShowAddForm] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await axios.get(`http://${BACKEND_IP}:3001/devices`);
        if (res) {
          setDevicesData(res.data);
          // setDevicesList(devicesData)
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchDevices();
  }, []);

  useEffect(() => {
    const sortDataByType = (type) => {
      console.log("sorting");
      switch (type) {
        case "from-low": {
          setDevicesList([...devicesData].sort((a, b) => a.price - b.price));
          return;
        }
        case "from-high": {
          setDevicesList([...devicesData].sort((a, b) => b.price - a.price));
          return;
        }
        case "default": {
          setDevicesList([...devicesData]);
          return;
        }
      }
    };

    sortDataByType(sortingType);
    console.log(devicesList[0]);
  }, [devicesData, sortingType]);

  const deleteOneFromDevicesData = (id) => {
    setDevicesData((prev) => [...prev.filter((d) => d.id !== id)]);
  };

  const editOneFromDevicesData = (payload) => {
    setDevicesData((prev) => [
      ...prev.map((item) => {
        if (item.id !== payload.id) return item;

        return { ...item, ...payload };
      }),
    ]);
  };

  const addOneToDevicesData = (payload) => {
    setDevicesData((prev) => [payload, ...prev]);
  };

  const handleDeleteItem = (id) => {
    const callToDelete = async (id) => {
      try {
        const res = await axios.delete(`http://localhost:3001/devices`, {
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ id }),
        });
        if (res) {
          if (res.status == 200) {
            deleteOneFromDevicesData(id);

            if (selectedItem) setSelectedItem(null);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    callToDelete(id);
  };

  const filterDevicesType = (src) => {
    const dest = [];
    src.map((el) => {
      if (dest.indexOf(el.type) !== -1) return;
      dest.push(el.type);
    });
    return dest;
  };

  const cleanUpSelectedItem = () => {
    setSelectedItem(null);
  };

  const onSelectDeviceTypeHandler = (deviceType) => {
    setSelectedDeviceType(deviceType === selectedDeviceType ? "" : deviceType);
  };

  const onClickAddForm = () => {
    // setIsShowAddForm()
  };

  const DeviceListItem = React.memo(
    ({ info, onDelete }) => {
      const [isMouseOverItem, setIsMouseOverItem] = useState(false);

      const handleDelete = () => {
        onDelete(info.id);
      };

      return (
        <div
          onMouseEnter={() => setIsMouseOverItem(true)}
          onMouseLeave={() => setIsMouseOverItem(false)}
          class="col-sm-6 col-md-4 col-lg-3 mb-4"
          key={info.id}
        >
          {isMouseOverItem ? (
            <div>
              <label onClick={handleDelete}>X</label>
              <br></br>
            </div>
          ) : (
            <div>
              <br></br>
            </div>
          )}

          <div class="card" onClick={() => setSelectedItem(info)}>
            <img
              style={{ width: "100%" }}
              class="card-img-top"
              alt={info.model}
              src={info.image}
            />{" "}
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
    [devicesList]
  );

  const devicesTypes = filterDevicesType(devicesData);

  if (selectedItem) {
    return (
      <CatalogItemPage
        onExit={cleanUpSelectedItem}
        info={selectedItem}
        onItemDataChanged={editOneFromDevicesData}
        onDeleteItem={handleDeleteItem}
      />
    );
  }

  return (
    <div class="col p-3 container-fluid">
      

      <div class="row p-2">
        <input
          class="form-control w-25 border-danger"
          placeholder="Наименование"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
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

      {isShowAddForm ? (
        <CatalogDevicesEditPanel onAddOne={addOneToDevicesData} />
      ) : null}

      <div class="d-flex justify-content-around mt-3 border">
        {devicesTypes.map((d) => {
          const labelString = d !== selectedDeviceType ? d : <b>{d}</b>;
          return (
            <label class="p-2" onClick={() => onSelectDeviceTypeHandler(d)}>
              {labelString}
            </label>
          );
        })}
      </div>

      {/* // TODO: <DevicesList /> */}

      <div class="container-fluid bg-light">
        {devicesList.length !== 0 ? (
          <div class="row">
            {devicesList
              .filter(
                (d) =>
                  d.type === selectedDeviceType || selectedDeviceType === ""
              )
              .map((d) => {
                if (nameFilter !== "") {
                  return d.name
                    .toLowerCase()
                    .includes(nameFilter.toLowerCase()) ? (
                    <DeviceListItem info={d} onDelete={handleDeleteItem} />
                  ) : null;
                }
                return <DeviceListItem info={d} onDelete={handleDeleteItem} />;
              })}
          </div>
        ) : null}
      </div>
    </div>
  );
};
