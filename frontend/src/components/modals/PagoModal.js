function PagoModal({
  modalPago,
  setModalPago,
  pagoData,
  handlePagoChange,
  registrarPago,
  loadingPago
}) {
  if (!modalPago) return null;

  return (
    <div className="modal">
      <div className="modal-content">

        <h2>Registrar Pago</h2>

        <input
          name="cedula"
          value={pagoData.cedula}
          disabled
        />

        <input
          name="monto"
          placeholder="Monto"
          value={pagoData.monto}
          onChange={handlePagoChange}
        />

        <button
          onClick={registrarPago}
          disabled={loadingPago}
        >
          {loadingPago ? "Procesando..." : "Pagar"}
        </button>

        <button
          onClick={() => setModalPago(false)}
          disabled={loadingPago}
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}

export default PagoModal;