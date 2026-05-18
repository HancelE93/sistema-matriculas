import Login from "./components/Login";
import ListaEstudiantes from "./components/ListaEstudiantes";
import FormEstudiante from "./components/FormEstudiante";
import EditarEstudianteModal from "./components/modals/EditarEstudianteModal";
import PagoModal from "./components/modals/PagoModal";
import HistorialModal from "./components/modals/HistorialModal";
import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const API = "https://sistema-matriculas-vp2m.onrender.com/estudiantes";
  const API_PAGOS = "https://sistema-matriculas-vp2m.onrender.com/pagos";

  // ================= LOGIN =================
  const [logeado, setLogeado] = useState(false);

  const [login, setLogin] = useState({
    usuario: "",
    password: ""
  });

  const iniciarSesion = async () => {
    try {
      const res = await fetch("https://sistema-matriculas-vp2m.onrender.com/auth/login", {
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

  const [loading, setLoading] = useState(false);
  const [loadingPago, setLoadingPago] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalPago, setModalPago] = useState(false);
  const [modalHistorial, setModalHistorial] = useState(false);

  const [editForm, setEditForm] = useState({});

  const [pagoData, setPagoData] = useState({
    cedula: "",
    monto: ""
  });

  const [historial, setHistorial] = useState([]);

  // ================= AUTO REFRESH (AQUÍ ESTÁ LO NUEVO) =================
  useEffect(() => {
    if (!logeado) return;

    listar(); // carga inicial

    const intervalo = setInterval(() => {
      listar(); // refresca cada 5 segundos
    }, 5000);

    return () => clearInterval(intervalo);
  }, [logeado]);

  // ================= LISTAR =================
  const listar = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setEstudiantes(data);
  };

  // ================= FORM =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= GUARDAR =================
  const guardar = async () => {
    if (loading) return;

    if (!form.cedula || !form.nombre || !form.apellido) {
      alert("❌ Completa los campos obligatorios");
      return;
    }

    setLoading(true);

    try {
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

    } finally {
      setLoading(false);
    }
  };

  // ================= ELIMINAR =================
  const eliminar = async (cedula) => {
    await fetch(`${API}/${cedula}`, {
      method: "DELETE"
    });

    listar();
  };

  // ================= EDITAR =================
  const abrirEditar = (e) => {
    setEditForm(e);
    setModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
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
    setPagoData({
      cedula,
      monto: ""
    });

    setModalPago(true);
  };

  const handlePagoChange = (e) => {
    setPagoData({
      ...pagoData,
      [e.target.name]: e.target.value
    });
  };

  const registrarPago = async () => {
    if (loadingPago) return;

    setLoadingPago(true);

    try {
      await fetch(`${API_PAGOS}/${pagoData.cedula}/${pagoData.monto}`, {
        method: "POST"
      });

      setModalPago(false);

      // 🔥 actualización inmediata
      await listar();

    } finally {
      setLoadingPago(false);
    }
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
      <Login
        login={login}
        setLogin={setLogin}
        iniciarSesion={iniciarSesion}
      />
    );
  }

  // ================= UI =================
  return (
    <div className="container">

      <h1>Sistema de Matrículas</h1>

      <FormEstudiante
        form={form}
        handleChange={handleChange}
        guardar={guardar}
        loading={loading}
      />

      <ListaEstudiantes
        estudiantes={estudiantes}
        abrirEditar={abrirEditar}
        eliminar={eliminar}
        abrirPago={abrirPago}
        verHistorial={verHistorial}
      />

      <EditarEstudianteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        editForm={editForm}
        handleEditChange={handleEditChange}
        actualizar={actualizar}
      />

      <PagoModal
        modalPago={modalPago}
        setModalPago={setModalPago}
        pagoData={pagoData}
        handlePagoChange={handlePagoChange}
        registrarPago={registrarPago}
        loadingPago={loadingPago}
      />

      <HistorialModal
        modalHistorial={modalHistorial}
        setModalHistorial={setModalHistorial}
        historial={historial}
      />

    </div>
  );
}

export default App;