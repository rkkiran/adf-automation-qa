import { LoginPage } from "Pages/Login/loginPage";
import { ElementsClass } from "ProtractorElements/elementClass";


export class HomePage extends LoginPage{
  public static element = new ElementsClass();
  /**
   * @function bellow will navigate from home page to files page or Content Services page
   */
    public async selectContentServices(){
      return await HomePage.element.cssContainingText('.mat-line','Content Services');
    }
}