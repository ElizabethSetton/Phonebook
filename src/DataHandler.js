var fs = require('fs');
var _ = require('lodash');

var contacts;
var filename;

function load (_filename) {
    filename = _filename;
    contacts = JSON.parse(fs.readFileSync(filename, 'utf8')).contacts;
}

function remove (phoneNumber){
    _.remove(contacts, {phoneNumber: phoneNumber});
    save();
}

function find (searchPhrase) {
    return _.filter(contacts, function(contact) {
        return _.startsWith(contact.firstName, searchPhrase) ||
            _.startsWith(contact.lastName, searchPhrase) ||
            _.startsWith(contact.phoneNumber, searchPhrase);
    });
}

function add (firstName, lastName, phoneNumber) {
    var person = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber
    };

    if (find(phoneNumber)) {
        return false;
    } else {
        contacts.push(person);
        save();
        return true;
    }
}

function edit (oldPhoneNumber, firstName, lastName, phoneNumber) {
    var person = find(oldPhoneNumber);
    person = {
        firstName: firstName || person.firstName,
        lastName: lastName || person.lastName,
        phoneNumber: phoneNumber || person.phoneNumber
    };

    remove(oldPhoneNumber);
    add(person.firstName, person.lastName, person.phoneNumber);
}

function save () {
    fs.writeFileSync(filename, JSON.stringify({ contacts: contacts }, null, 2), 'utf8');
}

module.exports.load = load;
module.exports.remove = remove;
module.exports.find = find;
module.exports.add = add;
module.exports.edit = edit;