function ListaEstudiantes({
  estudiantes,
  abrirEditar,
  eliminar,
  abrirPago,
  verHistorial
}) {
  return (
    <div className="grid">

      {estudiantes.map((e) => (

        <div className="card" key={e.cedula}>

          <h3>{e.nombre} {e.apellido}</h3>

          <p>Cédula: {e.cedula}</p>
          <p>Teléfono: {e.telefono}</p>
          <p>Email: {e.email}</p>
          <p>Deuda: ${e.deuda}</p>
          <p>Pagado: ${e.pagado}</p>

          <button onClick={() => abrirEditar(e)}>Actualizar</button>
          <button onClick={() => eliminar(e.cedula)}>Eliminar</button>
          <button onClick={() => abrirPago(e.cedula)}>Pagar</button>
          <button onClick={() => verHistorial(e.cedula)}>Historial</button>

        </div>

      ))}

    </div>
  );
}

export default ListaEstudiantes;