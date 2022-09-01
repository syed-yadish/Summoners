const getPosts = async (name) => {
    const response = await fetch(`https://localhost:7261/api/Post/${name}`);
    const deserializedJSON = await response.json();
    console.log(deserializedJSON);
    return deserializedJSON;
}

const getComments = async (postId) => {
    const response = await fetch(`https://localhost:7261/api/Post/${postId}/comments`, {method: 'GET'});
    const deserializedJSON = await response.json();
    console.log(deserializedJSON);
    return deserializedJSON;
}

export { getPosts, getComments };