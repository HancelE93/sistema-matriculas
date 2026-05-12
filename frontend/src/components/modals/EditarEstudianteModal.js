function EditarEstudianteModal({
  modalOpen,
  setModalOpen,
  editForm,
  handleEditChange,
  actualizar
}) {
  if (!modalOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">

        <h2>Editar Estudiante</h2>

        <input name="nombre" value={editForm.nombre} onChange={handleEditChange} />
        <input name="apellido" value={editForm.apellido} onChange={handleEditChange} />
        <input name="telefono" value={editForm.telefono} onChange={handleEditChange} />
        <input name="email" value={editForm.email} onChange={handleEditChange} />
        <input name="deuda" value={editForm.deuda} onChange={handleEditChange} />
        <input name="pagado" value={editForm.pagado} onChange={handleEditChange} />

        <button onClick={actualizar}>Guardar</button>
        <button onClick={() => setModalOpen(false)}>Cancelar</button>

      </div>
    </div>
  );
}

export default EditarEstudianteModal;