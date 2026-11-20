
import { describe, test, expect, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import Boton from './Boton';

describe('Pruebas unitarias del componente Boton', () => {
  test('1. Muestra el texto correctamente', () => {
    render(<Boton texto="Registrar vehículo" />);

    expect(
      screen.getByText('Registrar vehículo')
    ).toBeInTheDocument();
  });

  test('2. Ejecuta la acción al hacer clic', () => {
    const accion = jest.fn();

    render(
      <Boton texto="Ingresar" onClick={accion} />
    );

    fireEvent.click(screen.getByText('Ingresar'));

    expect(accion).toHaveBeenCalledTimes(1);
  });

  test('3. El botón es accesible', () => {
    render(<Boton texto="Guardar" />);

    expect(
      screen.getByRole('button', { name: 'Guardar' })
    ).toBeInTheDocument();
  });
});

