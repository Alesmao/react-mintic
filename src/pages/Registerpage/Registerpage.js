import React, { useState } from 'react';

function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha: '',
    correo: '',
    telefono: '',
    nacionalidad: '',
    password: '',
    confirmar_password: '',
    sexo: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí puedes agregar la lógica para enviar los datos
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm" style={{ maxWidth: '900px', width: '100%', padding: '2rem' }}>
        <div className="container mt-5">
          <h2 className="mb-4">Formulario de Registro</h2>
          <form className="row g-3" onSubmit={handleSubmit}>
            {/* Nombres y Apellidos */}
            <div className="col-md-6">
              <label className="form-label">Nombres</label>
              <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Apellidos</label>
              <input type="text" name="apellido" className="form-control" value={formData.apellido} onChange={handleChange} required />
            </div>

            {/* Fecha y Correo */}
            <div className="col-md-6">
              <label className="form-label">Fecha de nacimiento</label>
              <input type="date" name="fecha" className="form-control" value={formData.fecha} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Correo electrónico</label>
              <input type="email" name="correo" className="form-control" value={formData.correo} onChange={handleChange} required />
            </div>

            {/* Teléfono y Nacionalidad */}
            <div className="col-md-6">
              <label className="form-label">Teléfono</label>
              <input type="tel" name="telefono" className="form-control" value={formData.telefono} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="nacionalidad" className="form-label">Nacionalidad:</label>
              <select id="nacionalidad" name="nacionalidad" className="form-control" value={formData.nacionalidad} onChange={handleChange} required>
                <option value="">Seleccione un país</option>
                <option value="CO">Colombia</option>
                <option value="MX">México</option>
                <option value="AR">Argentina</option>
                <option value="PE">Perú</option>
                <option value="US">Estados Unidos</option>
                {/* Agrega más países si deseas */}
              </select>
            </div>

            {/* Contraseñas */}
            <div className="col-md-6">
              <label className="form-label">Contraseña</label>
              <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Repetir contraseña</label>
              <input type="password" name="confirmar_password" className="form-control" value={formData.confirmar_password} onChange={handleChange} required />
            </div>

            {/* Sexo */}
            <div className="col-md-6">
              <label className="form-label">Sexo</label>
              <select name="sexo" className="form-select" value={formData.sexo} onChange={handleChange} required>
                <option value="">Seleccione</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Botón */}
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;