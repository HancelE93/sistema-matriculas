package com.krakedev.matriculas.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krakedev.matriculas.entidades.Estudiante;
import com.krakedev.matriculas.services.EstudianteService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/estudiantes")
public class EstudianteController {

	private final EstudianteService service;

	public EstudianteController(EstudianteService service) {
		this.service = service;
	}

	@PostMapping
	public String crear(@RequestBody Estudiante e) {
		service.crear(e);
	    return "Estudiante creado correctamente";
	}

	@GetMapping
	public List<Estudiante> listar() {
		return service.listar();
	}

	@GetMapping("/{cedula}")
	public Estudiante buscar(@PathVariable String cedula) {

	    Estudiante e = service.buscar(cedula);

	    if (e == null) {
	        throw new RuntimeException("Estudiante no encontrado");
	    }

	    return e;
	}

	@PutMapping("/{cedula}")
	public Estudiante actualizar(@PathVariable String cedula, @RequestBody Estudiante actualizar) {
		Estudiante e = service.actualizar(cedula, actualizar);

		if (e == null) {
			throw new RuntimeException("Estudiante no encontrado");
		}

		return e;

	}

	@DeleteMapping("/{cedula}")
	public String eliminar(@PathVariable String cedula) {
		boolean eliminado = service.eliminar(cedula);

		if (!eliminado) {
			return "No se encontró el estudiante";
		}

		return "Estudiante eliminado correctamente";
	}
	
	@PutMapping("/pago/{cedula}/{monto}")
	public Estudiante pago(@PathVariable String cedula, @PathVariable double monto) {
	    return service.registrarPago(cedula, monto);
	}
}
