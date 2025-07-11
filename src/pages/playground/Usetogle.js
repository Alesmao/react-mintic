import React from 'react';
import useToggle from 'react';

function MostrarOcultar() {
  const { estado: visible, toggle } = useToggle();

  return (
    <div>
      <button onClick={toggle}>{visible ? 'Ocultar' : 'Mostrar'}</button>
      {visible && <p>¡Hola! Este es un mensaje visible.</p>}
    </div>
  );
}
export default MostrarOcultar;