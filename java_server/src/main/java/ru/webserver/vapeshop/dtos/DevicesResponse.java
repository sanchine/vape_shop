package ru.webserver.vapeshop.dtos;

import java.util.List;

import ru.webserver.vapeshop.models.Device;

public record DevicesResponse(List<Device> result, String error) {
}
