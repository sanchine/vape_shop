package ru.webserver.vapeshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ru.webserver.vapeshop.models.Device;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> getAll();    
}
