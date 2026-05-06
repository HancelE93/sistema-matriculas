package com.krakedev.matriculas.entidades;

import java.time.LocalDate;

public class Pago {


    private String cedula;
    private double monto;
    private LocalDate fecha;

    public Pago() {}

    public Pago(String cedula, double monto, LocalDate fecha) {
        this.cedula = cedula;
        this.monto = monto;
        this.fecha = fecha;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
}

