package com.krakedev.matriculas.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.krakedev.matriculas.entidades.Estudiante;

@Service
public class EstudianteService {

	private List<Estudiante> lista = new ArrayList<>();

	public Estudiante crear(Estudiante e) {
		if (e.getCedula() == null || e.getCedula().isEmpty()) {
	        throw new RuntimeException("La cédula no puede estar vacía");
	    }

	    for (Estudiante est : lista) {
	        if (est.getCedula().equals(e.getCedula())) {
	            throw new RuntimeException("La cédula ya existe");
	        }
	    }

	    lista.add(e);
	    return e;
	}
	

	public List<Estudiante> listar() {
		return lista;
	}

	public Estudiante buscar(String cedula) {
		for (Estudiante e : lista) {
			if (e.getCedula().equals(cedula)) {
				return e;
			}
		}
		return null;
	}

	public Estudiante actualizar(String cedula, Estudiante actualizar) {

		Estudiante e = buscar(cedula);

		if (e != null) {
			e.setNombre(actualizar.getNombre());
			e.setApellido(actualizar.getApellido());
			e.setTelefono(actualizar.getTelefono());
			e.setEmail(actualizar.getEmail());
			e.setDeuda(actualizar.getDeuda());
			e.setPagado(actualizar.getPagado());

		}
		return e;

	}

	public boolean eliminar(String cedula) {
		for (Estudiante e : lista) {
			if (e.getCedula().equals(cedula)) {
				lista.remove(e);
				return true;
			}
		}
		return false;
	}
	
	public Estudiante registrarPago(String cedula, double monto) {

	    Estudiante e = buscar(cedula);

	    if (e != null) {
	        e.setPagado(e.getPagado() + monto);
	        e.setDeuda(e.getDeuda() - monto);
	    }

	    return e;
	}
}
