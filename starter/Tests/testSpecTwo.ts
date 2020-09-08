import{expect} from "chai"
import { FilesPage } from "Pages/Content Services/contentServices";

describe('ADF Demo app',  function() {
    const adf = new FilesPage();
    it('Go to settings page select ECM provider and create a folder', async function() {
        await adf.selectECM_OnSettingPage("http://qaexercise.envalfresco.com/settings");
        await adf.login('guest@example.com', 'Password');
        const newCreatedFolder =  await adf.createNewFolder('RaviKiran', 'NewFolder');
        expect(newCreatedFolder).to.equal('RaviKiran')
     });
    it('Go to settings page select ECM provider and create a folder with already existing folder name', async () => {
        await adf.selectECM_OnSettingPage("http://qaexercise.envalfresco.com/settings");
        await adf.login('guest@example.com', 'Password');
        const duplicate =  await adf.createNewFolder('RaviKiran', 'duplicateFolder');    
        expect(duplicate).to.equal("There's already a folder with this name. Try a different name.");
    });
    it('Go to settings page select ECM provider and delete the created folder', async () => {
        await adf.selectECM_OnSettingPage("http://qaexercise.envalfresco.com/settings");
        await adf.login('guest@example.com', 'Password');
        const isFolderDeleted = await adf.deleteFolder('RaviKiran', 'innerHTML', 'id="action_menu_right_');
         expect(isFolderDeleted).to.equal(false);
    });
   });