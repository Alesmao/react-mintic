import React from "react";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";





function LoginPage() {
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: "¡Bienvenido!",
          text: `Sesión iniciada con Google: ${user.email}`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = "/dashboard";
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "No se pudo iniciar sesión con Google.", "error");
      });
  };
    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Iniciar Sesión</h3>
          <form id="loginForm">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="usuario@ejemplo.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
              />
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberCheck"
              />
              <label className="form-check-label" htmlFor="rememberCheck">
                Recuérdame
              </label>
            </div>
            <div>
            <div>
  <button type="button" onClick={handleGoogleLogin}>
    Entrar
  </button>
  <a href="/register">¿No tienes cuenta? Regístrate</a><br />
  <a href="/forgot">¿Olvidaste tu contraseña?</a>
</div>

  <button type="button" onClick={handleGoogleLogin}>
    Iniciar sesión con Google
  </button>
  
</div>

          </form>
        </div>
        <div className="card-footer text-center">
          <small className="text-muted">
            ¿No tienes cuenta? <a href="./html/formulario.html">e</a>
          </small>
          <br />
          <small className="text-muted">
          <a href="./html/recuperar.html"></a>
          </small>
        </div>
      </div>
    </div>
  );
};


export default LoginPage;