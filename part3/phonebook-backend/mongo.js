const mongoose = require("mongoose");

const password = process.argv[2];

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const db_url = `mongodb+srv://test:${password}@cluster0.oulec91.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set('strictQuery',false)
mongoose.connect(db_url)


const personSchema = mongoose.Schema({
    name: String, 
    number: Number
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 4) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });


    person.save().then(res => {
        console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`);
        mongoose.connection.close();
    });
}

if (process.argv.length < 3) {
    const persons = Person.find({}).then(persons => {
        console.log("phonebook: ");
        
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        
        mongoose.connection.close();
    });
}

