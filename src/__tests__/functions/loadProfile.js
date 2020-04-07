import data from '@solid/query-ldflex';

export default async webId => {
    const profile = {
        name: data[webId].name,
        friends: data[webId].friends
    }
    return profile;
};
