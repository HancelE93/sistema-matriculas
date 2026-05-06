package com.krakedev.matriculas.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.krakedev.matriculas.entidades.Estudiante;
import com.krakedev.matriculas.entidades.Pago;

@Service
public class PagoService {

	private List<Pago> pagos = new ArrayList<>();
    private final EstudianteService estudianteService;

    public PagoService(EstudianteService estudianteService) {
        this.estudianteService = estudianteService;
    }

    public Pago registrarPago(String cedula, double monto) {

        Estudiante e = estudianteService.buscar(cedula);

        if (e == null) {
            throw new RuntimeException("Estudiante no encontrado");
        }

        // actualizar estudiante
        e.setPagado(e.getPagado() + monto);
        e.setDeuda(e.getDeuda() - monto);

        // guardar historial
        Pago pago = new Pago(cedula, monto, LocalDate.now());
        pagos.add(pago);

        return pago;
    }

    public List<Pago> historialPorCedula(String cedula) {
        List<Pago> resultado = new ArrayList<>();

        for (Pago p : pagos) {
            if (p.getCedula().equals(cedula)) {
                resultado.add(p);
            }
        }

        return resultado;
    }
}