package ru.webserver.vapeshop.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import aj.org.objectweb.asm.commons.ModuleRemapper;
import lombok.RequiredArgsConstructor;
import ru.webserver.vapeshop.dtos.DevicesResponse;
import ru.webserver.vapeshop.models.Device;
import ru.webserver.vapeshop.repository.DeviceRepository;

@Service
@RequiredArgsConstructor  
public class DeviceService {
    private final DeviceRepository deviceRepo;  
    private final ModuleRemapper modelMapper;  
    public List<Device> getDevicesList() {
        // List<Device> devices = new ArrayList<Device>();
        // devices.add(new Device("1", "1"));
        // devices.add(new Device("2", "1"));
        // return new DevicesResponse(devices, null);

        return deviceRepo.getAll();

    }
}
