import { SettingsPage } from "Pages/Settings/settingsPage";
import { ElementsClass } from "ProtractorElements/elementClass";

export class LoginPage extends SettingsPage {
   public static element = new ElementsClass();
   /**
    * 
    * @param userName - login user name
    * @param password - login password
    */
    public async login(userName: string, password: string){
        await LoginPage.element.id('username', 'sendKeys', userName);
        await LoginPage.element.id('password', 'sendKeys', password);
        return await LoginPage.element.id('login-button', 'click');
    }
}