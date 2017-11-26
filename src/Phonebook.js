// node src/Phonebook.js contacts.json
var readlineSync = require('readline-sync');
var dh = require('./DataHandler');

var filename = process.argv[2];
var option;

do {
    option = readlineSync.question('Hi,\n press 1 to search contact. \n press 2 to add new contact.\n press 3 to edit contact. \n press 4 to remove contact. \n press 5 to exit. \n');
    dh.load(filename);

    if (option === '1') {
        var searchPhrase = readlineSync.question('Please enter name or phone number to search \n');
        var person = dh.find(searchPhrase);

        if (person) {
            for (var i = 0; i < person.length; i++) {
                console.log(person[i].firstName + " " + person[i].lastName + " " + person[i].phoneNumber);
            }

        } else {
            console.log('We could not find ' + searchPhrase);
        }
    } else if (option === '2') {
        var firstName = readlineSync.question('Please enter first name \n');
        var lastName = readlineSync.question('Please enter last name \n');
        var phoneNumber = readlineSync.question('Please enter phone number \n');

        if(isNaN(phoneNumber)){
            phoneNumber = readlineSync.question('\ You can not enter letters.\n Please enter again phone number \n');
        }

        var add = dh.add(firstName, lastName, phoneNumber);

        if (add) {
            console.log('The contact was add successfully! ');
        } else {
            console.log('This phone number already exists');
        }
    } else if (option === '3') {
            var oldPhoneNumber = readlineSync.question('Please enter phone number to search a contact to edit \n');
            person = dh.find(oldPhoneNumber);

            if (!person) {
                console.log('This phone number does\'t exists');
            } else {
                firstName = readlineSync.question('Please enter new first name \n');
                lastName = readlineSync.question('Please enter new last name \n');
                var newPhoneNumaber = readlineSync.question('Please enter new phone number \n');

                if (isNaN(newPhoneNumaber)){
                    newPhoneNumaber = readlineSync.question('\ You can not enter letters.\n Please enter again new phone number \n');
                }

                dh.edit(oldPhoneNumber, firstName, lastName, newPhoneNumaber);
                console.log('The contact was edit successfully! ');
            }
    } else if (option === '4') {
        phoneNumber = readlineSync.question('Please enter phone number to search a contact to remove \n');
        person = dh.find(phoneNumber);

        if (!person) {
            console.log('This phone number does\'t exists');
        } else {
            dh.remove(phoneNumber);
            console.log('The contact was removed successfully! ');
        }
    }
} while (option !== '5');



