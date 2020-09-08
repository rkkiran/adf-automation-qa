import { ElementsClass } from "ProtractorElements/elementClass";


export class SettingsPage {
    public static element = new ElementsClass();
    /**
     * 
     * @param url - url link
     */
    public async selectECM_OnSettingPage(url: string){
        await SettingsPage.element.getBrowser(url);
        await SettingsPage.element.id('adf-provider-selector', 'click');
        await SettingsPage.element.id('mat-option-1', 'click');
       return  await SettingsPage.element.id('host-button', 'click'); 
    }

}