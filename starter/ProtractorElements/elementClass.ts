import { element, by, browser } from "protractor";

export class ElementsClass {
    /**
     * 
     * @param url - url value or link
     */
    public async getBrowser(url: string) {
       return await browser.get(url);
    }
    /**
     * 
     * @param value          - xapth value
     * @param actionType     - protractor action type like to click() or getText() and more
     * @param attributeValue - to find unique value I am using the getAttribute function and passing the attribute value
     */
    public async xpath(value: string, actionType: string, attributeValue?: string) {
        let returnValue = null;
        switch (actionType) {
            case 'click':
                returnValue = await element(by.xpath(value)).click();                             
               break;
            case 'isPresent':
                returnValue = await element(by.xpath(value)).isPresent();
                break; 
            case 'getAttribute':
                returnValue = await element(by.xpath(value)).getAttribute(attributeValue);
                break;    
            default:
                returnValue = await element(by.xpath(value)).getText();
                break;
        }
        return returnValue;
    }
    /**
     * 
     * @param value       - css value
     * @param actionType  - protractor action type like to click() or getText() and more
     * @param sendKeys    - to send the values in the text box element for example to login 
     */
    public async css(value: string, actionType: string, sendKeys?: string) { 
        let returnValue = null;
        switch (actionType) {
            case 'click':
               returnValue = await element(by.css(value)).click();                             
               break;
            case 'sendKeys':
                returnValue = await element(by.css(value)).sendKeys(sendKeys);
                break;        
            default:
                returnValue = await element(by.css(value)).getText();
                break;
        }
        return returnValue;
    }
    /**
     * 
     * @param value          - id value 
     * @param actionType     - protractor action type like to click() or getText() and more
     * @param sendKeysValue  - to send the values in the text box element for example to login  
     */
    public async id(value: string, actionType: string, sendKeysValue?: string) { 
        let returnValue = null;
        switch (actionType) {
            case 'click':
               returnValue = await element(by.id(value)).click();                             
               break;
            case 'sendKeys':
                returnValue = await element(by.id(value)).sendKeys(sendKeysValue);
                break;        
            default:
                returnValue = await element(by.id(value)).getText();
                break;
        }
        return returnValue;
    }
    /**
     * 
     * @param value - css value
     * @param text  - css value text
     */
    public async cssContainingText(value: string, text: string) { 
        return await element(by.cssContainingText(value, text)).click();
    }
    /**
     * 
     * @param value - xpath value
     */
    public async elementAllXpath(value: string){
        return await element.all(by.xpath(value)).click();
    }
    /**
     * 
     * @param value          - xpath value
     * @param attributeValue - to find unique value I am using the getAttribute function and passing the attribute value
     * @param textContains   - using textContains value will find the value in the elment
     */
    public async returnStringValue(value:string, attributeValue:string, textContains: string){
        const getElmentValue = await element(by.xpath(value)).getAttribute(attributeValue)
        return getElmentValue.split(" ").filter(string => string.includes(textContains));
    }
    
}