class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=acf21b2076644dd847e89c4d891280c3';
    _baseOffset = 210;


    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    // descriptionFilter = (desc) => {
    //     if(!desc){
    //         return 'description not found'
    //     }
    //     if(desc.length > 225){ 
    //         return `${desc.slice(0,225)}...`
    //     }
    // }
    _transformCharacter = (char) => {
        let description = char.description
        if(!description) {
            description = 'description is not found :('
        }
        if(description.length > 255){
            description = `${description.slice(0,250)}...`
        }
        return {
            id: char.id,
            name: char.name,
            description: description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
        }
    }


export default MarvelService;

