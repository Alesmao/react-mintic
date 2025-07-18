import { useState, useRef } from "react";
import Swal from "sweetalert2";
import { auth, googleProvider, db } from '../../firebase';
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import './LoginPage.css';
//import { useNavigate } from "react-router-dom"; // ⛔ Quitaste "Scripts" que no sirve aquí



function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [soundOn, setSoundOn] = useState(false);
  const videoRef = useRef(null); // 🆕 referencia para controlar el video
  //const navigate = useNavigate();

 // LOGIN CON EMAIL/PASSWORD
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    Swal.fire("Campos vacíos", "Por favor llena todos los campos.", "warning");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Opcional: verificar si existe documento en Firestore
    const userDocRef = doc(db, 'usuarios', user.uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      if (data.estado === "Inactivo") {
        Swal.fire("Acceso denegado", "Tu cuenta está inactiva. Contacta al administrador.", "error");
        return;
      }
    }

    Swal.fire({
      title: "¡Bienvenido!",
      text: `Sesión iniciada como ${user.email}`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "/Dashboardpage";
    });

  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Credenciales incorrectas o usuario no existe.", "error");
  }
};

// LOGIN CON GOOGLE
const handleGoogleLogin = async () => {
  try {
    const googleResult = await signInWithPopup(auth, googleProvider);
    const user = googleResult.user;

    // Verificar si ya existía ese correo con otro método
    const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

    if (signInMethods.includes('password')) {
      // Si existe por password hay que vincularlo
      const password = await solicitarPassword();
      if (!password) {
        Swal.fire("Cancelado", "Operación cancelada.", "info");
        return;
      }

      // Crear credential de email/password
      const credential = EmailAuthProvider.credential(user.email, password);
      await linkWithCredential(user, credential);
    }

    Swal.fire({
      title: "¡Bienvenido!",
      text: `Sesión iniciada con Google: ${user.email}`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "/dashboard";
    });

  } catch (error) {
    console.error(error);
    Swal.fire("Error", "No se pudo iniciar sesión con Google.", "error");
  }
};

const solicitarPassword = async () => {
  const result = await Swal.fire({
    title: "Contraseña requerida",
    input: "password",
    inputLabel: "Introduce tu contraseña para vincular cuentas",
    inputPlaceholder: "Tu contraseña",
    showCancelButton: true,
    confirmButtonText: "Vincular",
    cancelButtonText: "Cancelar"
  });

  if (result.isConfirmed && result.value) {
    return result.value;
  }
  return null;
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
