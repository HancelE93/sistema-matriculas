import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API = "http://localhost:8080/estudiantes";
  const API_PAGOS = "http://localhost:8080/pagos";

  // ================= LOGIN =================
  const [logeado, setLogeado] = useState(false);

  const [login, setLogin] = useState({
    usuario: "",
    password: ""
  });

  const iniciarSesion = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login)
      });

      if (res.ok) {
        setLogeado(true);
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      alert("Error de conexión con el backend");
    }
  };

  // ================= SISTEMA =================
  const [estudiantes, setEstudiantes] = useState([]);

  const [form, setForm] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    deuda: "",
    pagado: ""
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalPago, setModalPago] = useState(false);
  const [modalHistorial, setModalHistorial] = useState(false);

  const [editForm, setEditForm] = useState({});
  const [pagoData, setPagoData] = useState({ cedula: "", monto: "" });
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    if (logeado) listar();
  }, [logeado]);

  // ================= LISTAR =================
  const listar = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setEstudiantes(data);
  };

  // ================= FORM =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = async () => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({
      cedula: "",
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      deuda: "",
      pagado: ""
    });

    listar();
  };

  // ================= ELIMINAR =================
  const eliminar = async (cedula) => {
    await fetch(`${API}/${cedula}`, { method: "DELETE" });
    listar();
  };

  // ================= EDITAR =================
  const abrirEditar = (e) => {
    setEditForm(e);
    setModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const actualizar = async () => {
    await fetch(`${API}/${editForm.cedula}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm)
    });

    setModalOpen(false);
    listar();
  };

  // ================= PAGOS =================
  const abrirPago = (cedula) => {
    setPagoData({ cedula, monto: "" });
    setModalPago(true);
  };

  const handlePagoChange = (e) => {
    setPagoData({ ...pagoData, [e.target.name]: e.target.value });
  };

  const registrarPago = async () => {
    await fetch(`${API_PAGOS}/${pagoData.cedula}/${pagoData.monto}`, {
      method: "POST"
    });

    setModalPago(false);
    listar();
  };

  // ================= HISTORIAL =================
  const verHistorial = async (cedula) => {
    const res = await fetch(`${API_PAGOS}/${cedula}`);
    const data = await res.json();

    setHistorial(data);
    setModalHistorial(true);
  };

  // ================= LOGIN SCREEN =================
  if (!logeado) {
    return (
      <div className="login">
        <h2>Iniciar Sesión</h2>

        <input
          placeholder="Usuario"
          onChange={(e) =>
            setLogin({ ...login, usuario: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) =>
            setLogin({ ...login, password: e.target.value })
          }
        />

        <button onClick={iniciarSesion}>Entrar</button>
      </div>
    );
  }

  // ================= APP =================
  return (
    <div className="container">
      <h1>Sistema de Matrículas</h1>

      {/* FORM */}
      <div className="form">
        <h2>Registrar Estudiante</h2>

        <input name="cedula" placeholder="Cédula" value={form.cedula} onChange={handleChange} />
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="deuda" placeholder="Deuda" value={form.deuda} onChange={handleChange} />
        <input name="pagado" placeholder="Pagado" value={form.pagado} onChange={handleChange} />

        <button onClick={guardar}>Guardar</button>
      </div>

      {/* LISTA */}
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

      {/* MODAL EDITAR */}
      {modalOpen && (
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
      )}

      {/* MODAL PAGO */}
      {modalPago && (
        <div className="modal">
          <div className="modal-content">
            <h2>Registrar Pago</h2>

            <input name="cedula" value={pagoData.cedula} disabled />
            <input name="monto" placeholder="Monto" value={pagoData.monto} onChange={handlePagoChange} />

            <button onClick={registrarPago}>Pagar</button>
            <button onClick={() => setModalPago(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* MODAL HISTORIAL */}
      {modalHistorial && (
        <div className="modal">
          <div className="modal-content">
            <h2>Historial de Pagos</h2>

            {historial.length === 0 ? (
              <p>No hay pagos</p>
            ) : (
              historial.map((p, i) => (
                <div key={i} className="hist-item">
                  <p>Monto: ${p.monto}</p>
                  <p>Fecha: {p.fecha}</p>
                </div>
              ))
            )}

            <button onClick={() => setModalHistorial(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;