var webdriverio = require('webdriverio');

/*
 blockCreditCard
 AMAZON.YesIntent
 AMAZON.HelpIntent
 AMAZON.CancelIntent
 AMAZON.StopIntent
 */

/*
    launch
    intent
    session_end
*/

// describe('DuckDuckGo search', function() {
//     it('searches for WebdriverIO', function() {
//         browser.url('https://duckduckgo.com/');
//         browser.setValue('#search_form_input_homepage', 'WebdriverIO');
//         browser.click('#search_button_homepage');
//         var title = browser.getTitle();
//         console.log('Title is: ' + title);
//         // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
//     });
// });
//
// describe("A suite", function() {
//     it("contains spec with an expectation", function() {
//         expect(true).toBe(true);
//     });
// });

describe('Execute Intents: ', function () {


    function intentLaunch(outcome) {
        var requestType = $('#template');
        requestType.selectByValue('launch');
        // save screenshot to file
        // browser.saveScreenshot('./errorShots/snapshot.png');
        var send = $('body > div:nth-child(4) > input[type="button"]');
        send.click();

        outcome = outcome || 'Welcome to b b and t\'s credit and debit card services. For usage say, I would like to block my credit card, or I\'ve have lost my debit card';
        var re = new RegExp(outcome, 'g');

        var text = browser.getText('#response');
        // expect(text.search(/ssml.+\<speak.+Debit Card Services.+speak\>/g)).not.toBe(-1);
        expect(text.search(re)).not.toEqual(-1, text);
    }

    function intentLostOrStolen(action, cardType, outcome) {

        $('#template').selectByValue('intent');

        $('#intent_select').selectByValue('intentLostOrStolen');

        if (action !== undefined) {
            browser.setValue('#slotvalues > div:nth-child(1) > input', action);
        }

        if (cardType !== undefined) {
            browser.setValue('#slotvalues > div:nth-child(2) > input', cardType);
        }


        var send = $('body > div:nth-child(4) > input[type="button"]');
        send.click();
        outcome = outcome || 'What\'s the last four digit of the credit card';
        var re = new RegExp(outcome, 'g');

        var text = browser.getText('#response');
        expect(text.search(re)).not.toEqual(-1, text);
    }

    function intentBlock(cardType, outcome) {

        $('#template').selectByValue('intent');

        $('#intent_select').selectByValue('intentBlock');

        if (cardType !== undefined) {
            browser.setValue('#slotvalues > div > input', cardType);
        }

        var send = $('body > div:nth-child(4) > input[type="button"]');
        send.click();
        outcome = outcome || 'What\'s the last four digit of the credit card';
        var re = new RegExp(outcome, 'g');

        var text = browser.getText('#response');
        expect(text.search(re)).not.toEqual(-1, text);
    }

    function intentUnblock(cardType, outcome) {

        $('#template').selectByValue('intent');

        $('#intent_select').selectByValue('intentUnblock');
        if (cardType !== undefined) {
            browser.setValue('#slotvalues > div > input', cardType);
        }


        var send = $('body > div:nth-child(4) > input[type="button"]');
        send.click();
        outcome = outcome || 'What\'s the last four digit of the credit card';
        var re = new RegExp(outcome, 'g');

        var text = browser.getText('#response');
        expect(text.search(re)).not.toEqual(-1, text);
    }

    function intentTravel(outcome) {

        $('#template').selectByValue('intent');

        $('#intent_select').selectByValue('intentTravel');

        var send = $('body > div:nth-child(4) > input[type="button"]');
        send.click();
        outcome = outcome || '';
        var re = new RegExp(outcome, 'g');

        var text = browser.getText('#response');
        expect(text.search(re)).not.toEqual(-1, text);
    }

    function intentTravelDates(fromDate, toDate, outcome) {

        $('#template').selectByValue('intent');

        $('#intent_select').selectByValue('intentTravelDates');
        if (fromDate !== undefined) {
            browser.setValue('#slotvalues > div:nth-child(1) > input', fromDate);
        }

        if (toDate !== undefined) {
            browser.setValue('#slotvalues > div:nth-child(2) > input', toDate);
        }

        var send = $('body > div:nth-child(4) > input[type="button"]');
        send.click();
        outcome = outcome || '';
        var re = new RegExp(outcome, 'g');

        var text = browser.getText('#response');
        expect(text.search(re)).not.toEqual(-1, text);
    }


    function intentWithCardType(cardType, outcome) {
        $('#template').selectByValue('intent');

        $('#intent_select').selectByValue('intentWithCardType');

        if (cardType !== undefined) {
            browser.setValue('#slotvalues > div > input', cardType);
        }

        var send = $('body > div:nth-child(4) > input[type="button"]');
        send.click();
        outcome = outcome || 'What\'s the last four digit of the credit card\.';
        var re = new RegExp(outcome, 'g');

        var text = browser.getText('#response');
        expect(text.search(re)).not.toEqual(-1, text);
    }

    function intentWithCardNumberOrZipCode(cardNumber, outcome) {
        // Set the Intent to Card Number
        $('#intent_select').selectByValue('intentWithCardNumberOrZipCode');

        if (cardNumber !== undefined) {
            browser.setValue('#slotvalues > div > input', cardNumber);
        }

        var send = $('body > div:nth-child(4) > input[type="button"]');
        send.click();
        outcome = outcome || 'What\'s the zip code associated with the credit card ending in .+2345.+\.'
        var re = RegExp(outcome, 'g');
        var text = browser.getText('#response');
        expect(text.search(re)).not.toEqual(-1, text);
    }

    function intentWithZipCode(zipCode, outcome) {
        // Set the Intent to Zip Code
        $('#intent_select').selectByValue('intentWithCardNumberOrZipCode');

        if (zipCode !== undefined) {
            browser.setValue('#slotvalues > div > input', zipCode);
        }

        var send = $('body > div:nth-child(4) > input[type="button"]');
        send.click();

        outcome = outcome || 'Zip code doesn\'t match with the given credit card.What\'s the zip code associated with the credit card ending in .+2345.+\.';

        var re = RegExp(outcome, 'g');

        var text = browser.getText('#response');
        // console.log('Text: ', text);
        expect(text.search(re)).not.toEqual(-1, text);
    }


    function intentConfirmed(outcome) {
        // Set the Intent to Zip Code
        $('#intent_select').selectByValue('AMAZON.YesIntent');

        var send = $('body > div:nth-child(4) > input[type="button"]');
        send.click();

        outcome = outcome || 'Your request to block your credit card ending in .+2345.+ has been successfully completed. Say yes to confirm or say no to cancel the transaction.'
        var re = RegExp(outcome, 'g');

        var text = browser.getText('#response');
        expect(text.search(re)).not.toEqual(-1, text);
    }


    function intentNo(outcome) {

        $('#intent_select').selectByValue('AMAZON.NoIntent');

        var send = $('body > div:nth-child(4) > input[type="button"]');
        send.click();

        outcome = outcome;
        var re = RegExp(outcome, 'g');

        var text = browser.getText('#response');
        expect(text.search(re)).not.toEqual(-1, text);
    }


    function intentYes(outcome) {

        $('#intent_select').selectByValue('AMAZON.YesIntent');

        var send = $('body > div:nth-child(4) > input[type="button"]');
        send.click();

        outcome = outcome;
        var re = RegExp(outcome, 'g');

        var text = browser.getText('#response');

        expect(text.search(re)).not.toEqual(-1, text);
    }



    beforeEach(function () {
        browser.url('http://localhost:8080/alexa/bbtCardServices');
    });



    it('Happy Path for Lost Card', function() {

        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentLostOrStolen('lost', 'credit', 'What\'s the last four digit of the credit card');

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27604', 'Would you like a new card reissued in place of the lost credit card ending in .+2345.+, please say yes to confirm, or no to cancel the transaction');

        intentConfirmed('Your request to reissue your lost credit card ending in .+2345.+. has been successfully completed. Is there anything else I can do for you today?');

        intentNo('Thank you for banking with b b and t. Have a nice day!');

    });



    it('Happy Path for Stolen Card', function() {
        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentLostOrStolen('stolen', 'credit', 'What\'s the last four digit of the credit card');

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27604', 'Would you like a new card reissued in place of the stolen credit card ending in .+2345.+, please say yes to confirm, or no to cancel the transaction');

        intentConfirmed('Your request to reissue your stolen credit card ending in .+2345.+. has been successfully completed. Is there anything else I can do for you today?')

        intentNo('Thank you for banking with b b and t. Have a nice day!');
    });



    it('Happy Path for Can\'t Find Card', function() {
        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentLostOrStolen('find', 'credit', 'What\'s the last four digit of the credit card');

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27604', 'Would you like a new card reissued in place of the missing credit card ending in .+2345.+, please say yes to confirm, or no to cancel the transaction');

        intentConfirmed('Your request to reissue your missing credit card ending in .+2345.+. has been successfully completed. Is there anything else I can do for you today?')

        intentNo('Thank you for banking with b b and t. Have a nice day!');
    });



    it('Happy Path for block Card', function() {
        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentBlock('credit', 'What\'s the last four digit of the credit card');

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27604', 'Would you like to continue to block your credit card ending in .+2345.+, please say yes to confirm, or no to cancel the transaction');

        intentConfirmed('Your request to block your credit card ending in .+2345.+ has been successfully completed. Is there anything else I can do for you today?')

        intentNo('Thank you for banking with b b and t. Have a nice day!');
    });

    it('Unhappy Path for block Card', function() {
        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentBlock(undefined, 'Is it a credit or debit card');

        intentWithCardType('credit', 'What\'s the last four digit of the credit card');

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27604', 'Would you like to continue to block your credit card ending in .+2345.+, please say yes to confirm, or no to cancel the transaction');

        intentConfirmed('Your request to block your credit card ending in .+2345.+ has been successfully completed. Is there anything else I can do for you today?')

        intentNo('Thank you for banking with b b and t. Have a nice day!');
    });

    it('Unhappy Path for block Card', function() {
        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentBlock('car', 'Is it a credit or debit card');

        intentWithCardType('credit', 'What\'s the last four digit of the credit card');

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27604', 'Would you like to continue to block your credit card ending in .+2345.+, please say yes to confirm, or no to cancel the transaction');

        intentConfirmed('Your request to block your credit card ending in .+2345.+ has been successfully completed. Is there anything else I can do for you today?')

        intentNo('Thank you for banking with b b and t. Have a nice day!');
    });

    it('Happy Path for unblock Card', function() {
        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentUnblock('credit', 'What\'s the last four digit of the credit card');

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27604', 'Would you like to continue to unblock your credit card ending in .+2345.+, please say yes to confirm, or no to cancel the transaction');

        intentConfirmed('Your request to unblock your credit card ending in .+2345.+ has been successfully completed. Is there anything else I can do for you today?')

        intentNo('Thank you for banking with b b and t. Have a nice day!');
    });



    it('Happy Path for Travel', function() {
        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentTravel('What dates will you be travelling');

        intentTravelDates('2017-09-01', '2017-10-15', 'What\'s the last four digit of the credit card you would like to use internationally')

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27604', 'Would you like to go ahead and notify bb and t that you\'ll be travelling internationally from .+2017-09-01.+ to .+2017-10-15.+ for you card ending in .+2345.+');

        intentConfirmed('OK, I\'ve notified bb and t that you\'ll be travelling internationally on the given dates for your card ending in .+2345.+. Is there anything else I can do for you today?')

        intentNo('Thank you for banking with b b and t. Have a nice day!');
    });

    it('Happy Path for Travel - Continue', function() {
        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentTravel('What dates will you be travelling');

        intentTravelDates('2017-09-01', '2017-10-15', 'What\'s the last four digit of the credit card you would like to use internationally')

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27604', 'Would you like to go ahead and notify bb and t that you\'ll be travelling internationally from .+2017-09-01.+ to .+2017-10-15.+ for you card ending in .+2345.+');

        intentConfirmed('OK, I\'ve notified bb and t that you\'ll be travelling internationally on the given dates for your card ending in .+2345.+. Is there anything else I can do for you today?')

        intentYes('What else would you like to do today+. To block a card, say, I would like to block my card, or for lost or stolen card say, I have lost my credit card, and for international travel say, I will be travelling out of the country\.');
    });

    it('Unhappy Path for Travel - invalid dates', function() {
        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentTravel('What dates will you be travelling');

        intentTravelDates('2017-09', '2017-10-15', 'What dates will you be travelling');

        intentTravelDates('2017-09-01', '2017-10-15', 'What\'s the last four digit of the credit card you would like to use internationally')

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27604', 'Would you like to go ahead and notify bb and t that you\'ll be travelling internationally from .+2017-09-01.+ to .+2017-10-15.+ for you card ending in .+2345.+');

        intentConfirmed('OK, I\'ve notified bb and t that you\'ll be travelling internationally on the given dates for your card ending in .+2345.+. Is there anything else I can do for you today?')

        intentNo('Thank you for banking with b b and t. Have a nice day!');
    });

    it('Unhappy Path for Travel - invalid dates 2', function() {
        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentTravel('What dates will you be travelling');

        intentTravelDates(undefined, '2017-10-15', 'What dates will you be travelling');

        // intentTravelDates('2017-09-01', '2017-10-15', 'What\'s the last four digit of the credit card')
        //
        // intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');
        //
        // intentWithZipCode('27604', 'Would you like to go ahead and notify bb and t that you\'ll be travelling internationally from .+2017-09-01.+ to .+2017-10-15.+ for you card ending in .+2345.+');
        //
        // intentConfirmed('OK, I\'ve notified bb and t that you\'ll be travelling internationally on the given dates for your card ending in .+2345.+. Is there anything else I can do for you today?');

    });

    it('Unhappy Path for lost Card - missing Card Type', function() {

        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentLostOrStolen('lost', undefined , 'Is it a credit or debit card');

        intentWithCardType('credit', 'What\'s the last four digit of the credit card');

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27604', 'Would you like a new card reissued in place of the lost credit card ending in .+2345.+, please say yes to confirm, or no to cancel the transaction');

        intentConfirmed('Your request to reissue your lost credit card ending in .+2345.+. has been successfully completed. Is there anything else I can do for you today?');

        intentNo('Thank you for banking with b b and t. Have a nice day!');

    });

    it('Unhappy Path for lost Card - missing Card Type & wrong Zipcode', function() {

        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentLostOrStolen('lost', undefined , 'Is it a credit or debit card');

        intentWithCardType('credit', 'What\'s the last four digit of the credit card');

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27613', 'The Zip Code .+27613.+ doesn\'t match with the given credit card ending in .+2345.+. Please restate the Zip Code');

        intentWithZipCode('27604', 'Would you like a new card reissued in place of the lost credit card ending in .+2345.+, please say yes to confirm, or no to cancel the transaction');

        intentConfirmed('Your request to reissue your lost credit card ending in .+2345.+. has been successfully completed. Is there anything else I can do for you today?');

        intentNo('Thank you for banking with b b and t. Have a nice day!');

    });



    it('Unhappy Path for block Card - missing Card Type', function() {

        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentLostOrStolen('block', undefined , 'Is it a credit or debit card');

        intentWithCardType('credit', 'What\'s the last four digit of the credit card');

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27604', 'Would you like to continue to block your credit card ending in .+2345.+, please say yes to confirm, or no to cancel the transaction');

        intentConfirmed('Your request to block your credit card ending in .+2345.+ has been successfully completed. Is there anything else I can do for you today?');

        intentNo('Thank you for banking with b b and t. Have a nice day!');
    });

    it('Unhappy Path for unblock Card - missing Card Type & wrong Zipcode', function() {

        intentLaunch('Welcome to b b and t\'s credit and debit card services. What would you like to do today?');

        intentLostOrStolen('unblock', undefined , 'Is it a credit or debit card');

        intentWithCardType('credit', 'What\'s the last four digit of the credit card');

        intentWithCardNumberOrZipCode('2345', 'What\'s the Zip Code associated with the credit card ending in .+2345.+');

        intentWithZipCode('27613', 'The Zip Code .+27613.+ doesn\'t match with the given credit card ending in .+2345.+. Please restate the Zip Code');

        intentWithZipCode('27604', 'Would you like to continue to unblock your credit card ending in .+2345.+., please say yes to confirm, or no to cancel the transaction');

        intentConfirmed('Your request to unblock your credit card ending in .+2345.+ has been successfully completed. Is there anything else I can do for you today?');

        intentNo('Thank you for banking with b b and t. Have a nice day!');
    });

});


