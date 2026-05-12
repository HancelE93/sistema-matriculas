function HistorialModal({
  modalHistorial,
  setModalHistorial,
  historial
}) {
  if (!modalHistorial) return null;

  return (
    <div className="modal">
      <div className="modal-content">

        <h2>Historial de Pagos</h2>

        {historial.length === 0 ? (
          <p>No hay pagos</p>
        ) : (
          historial.map((p, i) => (
            <div key={i}>
              <p>Monto: ${p.monto}</p>
              <p>Fecha: {p.fecha}</p>
            </div>
          ))
        )}

        <button onClick={() => setModalHistorial(false)}>
          Cerrar
        </button>

      </div>
    </div>
  );
}

export default HistorialModal;