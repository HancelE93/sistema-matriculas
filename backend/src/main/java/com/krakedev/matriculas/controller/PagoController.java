package com.krakedev.matriculas.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krakedev.matriculas.entidades.Pago;
import com.krakedev.matriculas.services.PagoService;


@RestController
@RequestMapping("/pagos")
@CrossOrigin(origins = "*")
public class PagoController {

	private final PagoService service;

    public PagoController(PagoService service) {
        this.service = service;
    }

    @PostMapping("/{cedula}/{monto}")
    public Pago registrar(@PathVariable String cedula, @PathVariable double monto) {
        return service.registrarPago(cedula, monto);
    }

    @GetMapping("/{cedula}")
    public List<Pago> historial(@PathVariable String cedula) {
        return service.historialPorCedula(cedula);
    }
}