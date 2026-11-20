import assert from 'node:assert/strict';
import { Builder } from 'selenium-webdriver';

import LoginPage from './pages/LoginPage.js';
import DashboardPage from './pages/DashboardPage.js';

const driver = await new Builder()
  .forBrowser('chrome')
  .build();

const login = new LoginPage(driver);
const dashboard = new DashboardPage(driver);

let aprobadas = 0;
let fallidas = 0;

async function probar(nombre, funcion) {
  try {
    await funcion();
    aprobadas++;
    console.log(`APROBADA: ${nombre}`);
  } catch (error) {
    fallidas++;
    console.error(`FALLIDA: ${nombre}`);
    console.error(error.message);
  }
}

try {
  await probar('1. Abre la pantalla Login', async () => {
    await login.abrir();
    const titulo = await login.obtenerTitulo();

    assert.match(titulo, /Sistema de Gestión de Parqueadero/i);
  });

  await probar('2. Muestra el correo electrónico', async () => {
    await login.abrir();
    const campo = await login.obtenerCorreo();

    assert.equal(await campo.isDisplayed(), true);
  });

  await probar('3. Muestra la contraseña', async () => {
    await login.abrir();
    const campo = await login.obtenerPassword();

    assert.equal(await campo.isDisplayed(), true);
  });

  await probar('4. Muestra el botón Ingresar', async () => {
    await login.abrir();
    const boton = await login.obtenerBotonIngresar();

    assert.equal(await boton.isDisplayed(), true);
  });

  await probar('5. Protege Dashboard sin token', async () => {
    await login.abrir();

    await driver.executeScript(
      "window.localStorage.removeItem('token')"
    );

    await dashboard.abrir();

    const url = await driver.getCurrentUrl();

    assert.match(url, /\/login/);
  });
} finally {
  await driver.quit();
}

console.log('\nRESULTADOS SELENIUM');
console.log(`Aprobadas: ${aprobadas}`);
console.log(`Fallidas: ${fallidas}`);

if (fallidas > 0) {
  process.exitCode = 1;
}