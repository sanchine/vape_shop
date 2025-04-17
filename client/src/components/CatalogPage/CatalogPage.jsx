import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_IP } from "../../apiConfig";
import { CatalogItemPage } from "./CatalogItemPage";
import { CatalogDevicesAddPanel } from "./CatalogDevicesAddPanel";
import { CatalogDevicesFilterPanel } from "./CatalogDevicesFilterPanel";
import { CatalogDevicesTypesPanel } from "./CatalogDevicesTypesPanel";
import { CatalogDevicesList } from "./CatalogDevicesList";

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

  const sendItem = async (data) => {
    try {
      const res = await axios.post(`http://${BACKEND_IP}:3001/devices/add`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ data }),
      });

      if (res) {
        addOneToDevicesData(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
      <CatalogDevicesFilterPanel
        name={nameFilter}
        setName={setNameFilter}
        setSortingType={setSortingType}
        isShowAddForm={isShowAddForm}
        setIsShowAddForm={setIsShowAddForm}
      />

      <CatalogDevicesAddPanel
        onAdd={sendItem}
        isShow={isShowAddForm}
      />

      <CatalogDevicesTypesPanel
        types={filterDevicesType(devicesData)}
        selectedType={selectedDeviceType}
        onSelectType={onSelectDeviceTypeHandler}
      />

      <CatalogDevicesList
        list={devicesList}
        filter={{ type: selectedDeviceType, name: nameFilter }}
        handleDeleteItem={handleDeleteItem}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
};


