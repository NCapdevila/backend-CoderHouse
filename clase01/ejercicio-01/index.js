const person = {
    first: 'Elon',
    last: 'Musk',
    twitter: '@elonmusk',
    company: 'Space X'
}

const displayName = ({first, last}) => {
    console.log(`El nombre es ${first} y su apellido ${last}`);
};

displayName(person);