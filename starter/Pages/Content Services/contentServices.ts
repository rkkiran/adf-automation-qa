import { expect } from "chai";
import { HomePage } from "../HomePage/homePage";
import { ElementsClass } from "ProtractorElements/elementClass";

export class FilesPage extends HomePage { 
    public static element = new ElementsClass();

    /**
     * 
     * @param folderName - to create the folder using the given name
     * @param folderType - in this function if folderType value is new then it will create new folder
     *                     if folderType value is !== new then will test duplicate spec
     */
    public async createNewFolder(folderName: string, folderType: string){
        await new HomePage().selectContentServices();
        await FilesPage.element.xpath('.//*[@data-automation-id="create-new-folder"]', 'click');
        const newFolderText =  await FilesPage.element.xpath("//h2[@id='mat-dialog-title-0']", 'getText');
        if(newFolderText !== 'New folder') {
            await new HomePage().selectContentServices();
            await FilesPage.element.xpath('.//*[@data-automation-id="create-new-folder"]', 'click');
            const newFolderText =  await FilesPage.element.xpath("//h2[@id='mat-dialog-title-0']", 'getText');
        }
        expect(newFolderText).to.equal('New folder')
        await FilesPage.element.id('adf-folder-name-input', 'sendKeys', folderName);
        await FilesPage.element.id('adf-folder-create-button', 'click');
        if (folderType === 'NewFolder') {      
            return await FilesPage.element.xpath(`.//*[@data-automation-id="text_${folderName}"]`, 'getText');      
        } else {
            const errorMessage = await FilesPage.element.css('.mat-simple-snackbar', 'getText');     
            await FilesPage.element.id('adf-folder-cancel-button', 'click');
            return errorMessage;            
        }        
    }
    /**
     * 
     * @param folderName     - to delete the given folder name
     * @param attributeValue - to find unique value I am using the getAttribute function and passing the attribute value
     * @param textContains   - with given text I am returning the string based on the textContains value
     */
    public async deleteFolder(folderName: string, attributeValue:string, textContains: string){
        await new HomePage().selectContentServices();
        const stringValue = await FilesPage.element.returnStringValue(`(.//*[@aria-label="${folderName}"])[1]`, attributeValue, textContains);
        await FilesPage.element.elementAllXpath(`.//*[@title="${folderName}"]`);
        await FilesPage.element.xpath(`.//*[@${stringValue}]`, 'click');
        await FilesPage.element.xpath('.//*[@aria-label="Delete"]', 'click');
        return await FilesPage.element.xpath(`.//*[@title="${folderName}"]`, 'isPresent');
    }
}