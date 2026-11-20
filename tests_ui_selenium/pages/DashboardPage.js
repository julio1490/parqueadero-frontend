import { By, until } from 'selenium-webdriver';

export default class DashboardPage {
  constructor(driver) {
    this.driver = driver;
  }

  async abrir() {
    await this.driver.get('http://localhost:5173/dashboard');
  }

  async obtenerTitulo() {
    const elemento = await this.driver.wait(
      until.elementLocated(By.css('h1')),
      10000
    );

    return elemento.getText();
  }

  async obtenerBotonCerrarSesion() {
    return this.driver.findElement(
      By.xpath("//button[contains(., 'Cerrar sesión')]")
    );
  }
}