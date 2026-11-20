import { By, until } from 'selenium-webdriver';

export default class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async abrir() {
    await this.driver.get('http://localhost:5173/login');
  }

  async obtenerTitulo() {
    const elemento = await this.driver.wait(
      until.elementLocated(By.css('h1')),
      10000
    );

    return elemento.getText();
  }

  async obtenerCorreo() {
    return this.driver.findElement(By.css('input[type="email"]'));
  }

  async obtenerPassword() {
    return this.driver.findElement(By.css('input[type="password"]'));
  }

  async obtenerBotonIngresar() {
    return this.driver.findElement(By.css('button[type="submit"]'));
  }
}