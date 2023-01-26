const fetchData = async (url, params=null) => {
    const response = await fetch(url, params);
    const data = await response.json()
    return data;
};

export default fetchData;