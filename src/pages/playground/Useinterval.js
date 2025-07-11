
import useinterval from 'react';

function Temporizador() {
  const [segundos, setSegundos] =useinterval(0);

  Temporizador(() => {
    setSegundos(s => s + 1);
  }, 1000); // cada 1000 ms = 1 segundo

  return <h1>Segundos: {segundos}</h1>;
}
export default Temporizador;