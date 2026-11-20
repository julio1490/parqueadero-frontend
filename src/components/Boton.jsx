export default function Boton({ texto, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {texto}
    </button>
  );
}
