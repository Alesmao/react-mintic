import { useState, useRef } from "react";
import Swal from "sweetalert2";
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from "firebase/auth";
import './LoginPage.css';
import { useNavigate } from "react-router-dom"; // ⛔ Quitaste "Scripts" que no sirve aquí

const usuarios = [
  { email: "alesmao@gmail.com", password: "1234" },
  { email: "maria@correo.com", password: "mar123" },
  { email: "carlos@correo.com", password: "car123" },
  { email: "laura@correo.com", password: "lau123" },
  { email: "andres@correo.com", password: "and123" },
  { email: "camila@correo.com", password: "cam123" },
  { email: "david@correo.com", password: "dav123" },
  { email: "paula@correo.com", password: "Pau123" },
  { email: "jose@correo.com", password: "jos123" },
  { email: "valentina@correo.com", password: "val123" }
];

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [soundOn, setSoundOn] = useState(false);
  const videoRef = useRef(null); // 🆕 referencia para controlar el video
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Campos vacíos", "Por favor llena todos los campos.", "warning");
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(email)) {
      Swal.fire("Correo inválido", "Por favor escribe un correo válido.", "error");
      return;
    }

    const usuarioValido = usuarios.find(u => u.email === email && u.password === password);

    if (usuarioValido) {
      Swal.fire({
        title: "¡Bienvenido!",
        text: "Inicio de sesión exitoso.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate("/dashboardpage");
      });
    } else {
      Swal.fire("Error", "Correo o contraseña incorrectos.", "error");
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        Swal.fire({
          title: "¡Bienvenido!",
          text: `Sesión iniciada con Google: ${result.user.email}`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = "/dashboardpage";
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "No se pudo iniciar sesión con Google.", "error");
      });
  };

  // 🔊 Toggle para activar/desactivar sonido
  const toggleSound = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setSoundOn(!video.muted);
      video.play(); // asegura que el video siga corriendo
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Video de fondo */}
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted
        className="bg-video"
      >
        <source src="/videos/video1.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      {/* Botón para activar/desactivar sonido */}
      <button
        onClick={toggleSound}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 3,
          padding: '10px 15px',
          backgroundColor: '#ffffffcc',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {soundOn ? '🔊 Sonido activado' : '🔇 Activar sonido'}
      </button>

      {/* Contenido del login */}
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="card-login" style={{ maxWidth: '400px', width: '100%', zIndex: 2 }}>
          <div className="card-body">
            <h3 className="card-title text-center mb-3">Iniciar Sesión</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  required
                />
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="rememberCheck" />
                <label className="form-check-label" htmlFor="rememberCheck">
                  Recuérdame
                </label>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary w-100 mb-2">Entrar</button>
              </div>
              <div className="text-center">
                <button type="button" onClick={handleGoogleLogin} className="btn btn-danger w-100">
                  Iniciar sesión con Google
                </button>
              </div>
              <br />
              <div className="text-center">
                <small className="text-muted">
                  ¿No tienes cuenta? <a href="/register">Regístrate</a>
                </small>
                <br />
                <a href="/forgot" className="fs-6">¿Olvidaste tu contraseña?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
