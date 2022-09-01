
const getSummoner = async (query, apiKey) => {
    const response = await fetch(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${query}?api_key=${apiKey}`
    );
    const deserializedJSON = await response.json();
    return deserializedJSON;
}

const getSummonerId = async (query, apiKey) => {
    const response = await getSummoner(query, apiKey);
    return response.id;
}

const getSummonerStats = async (id, apiKey) => {
    const response = await fetch(
        `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${apiKey}`
    );
    const deserializedJSON = await response.json();
    return deserializedJSON;
}

const getStats = async (query, apiKey) => {
    const temp = await getSummonerId(query, apiKey);
    const final = await getSummonerStats(temp, apiKey);

    return final;
}

const getLevelIcon = async (query, apiKey) => {
    const temp =  await getSummoner(query, apiKey);

    const result = {
        name: temp.name,
        profileIconId: temp.profileIconId,
        summonerLevel: temp.summonerLevel
    }

    return result;
}

export { getStats, getLevelIcon };