function FormEstudiante({ form, setForm, handleChange, guardar }) {
  return (
    <div className="form">
      <h2>Registrar Estudiante</h2>

      <input
        name="cedula"
        placeholder="Cédula"
        value={form.cedula}
        onChange={handleChange}
      />

      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
      />

      <input
        name="apellido"
        placeholder="Apellido"
        value={form.apellido}
        onChange={handleChange}
      />

      <input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="deuda"
        placeholder="Deuda"
        value={form.deuda}
        onChange={handleChange}
      />

      <input
        name="pagado"
        placeholder="Pagado"
        value={form.pagado}
        onChange={handleChange}
      />

      <button onClick={guardar}>
        Guardar
      </button>
    </div>
  );
}

export default FormEstudiante;