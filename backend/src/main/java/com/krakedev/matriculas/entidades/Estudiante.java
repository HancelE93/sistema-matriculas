package com.krakedev.matriculas.entidades;

public class Estudiante {

	private String cedula;
	private String nombre;
	private String apellido;
	private String telefono;
	private String email;
	private double deuda;
	private double pagado;

	public Estudiante() {
	}

	public Estudiante(String cedula, String nombre, String apellido, String telefono, String email, double deuda,
			double pagado) {
		this.cedula = cedula;
		this.nombre = nombre;
		this.apellido = apellido;
		this.telefono = telefono;
		this.email = email;
		this.deuda = deuda;
		this.pagado = pagado;
	}

	@Override
	public String toString() {
		return "Estudiante [cedula=" + cedula + ", nombre=" + nombre + ", apellido=" + apellido + ", telefono="
				+ telefono + ", email=" + email + ", deuda=" + deuda + ", pagado=" + pagado + "]";
	}

	// getters y setters

	public String getCedula() {
		return cedula;
	}

	public void setCedula(String cedula) {
		this.cedula = cedula;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public double getDeuda() {
		return deuda;
	}

	public void setDeuda(double deuda) {
		this.deuda = deuda;
	}

	public double getPagado() {
		return pagado;
	}

	public void setPagado(double pagado) {
		this.pagado = pagado;
	}
}