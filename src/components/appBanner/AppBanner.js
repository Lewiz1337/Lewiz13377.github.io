import { Component } from 'react/cjs/react.production.min';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './appBanner.scss';

class AppBanner extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar(); 
    }

   
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)+ 1011000);
        this.onCharLoading()
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }
    
    
    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char ={char}/> : null;

        return(
            <div className = 'banner'>
                {errorMessage}
                {spinner}
                {content}
                <div className = 'today bannerItem'>
                    <h3 className='todayText'>
                        Random character for today!
                    </h3>
                    <h4 className='todayText'>
                        Do you want to get to know him better?
                    </h4>
                    <p className = 'todayText'>Or choose another one</p>
                    <button onClick={this.updateChar} className = 'button'>try it</button>
                </div>
            </div>
        )
    }
}
const View = ({char}) => {
    const {name, description, thumbnail,homepage, wiki} = char;
    return (
        <div className = 'randomHero bannerItem'>
            <img className = 'bannerImg' src={thumbnail} alt={`${name}-img`} />
            <div className = 'heroInfo'>
                <h2 className = 'heroName'>{name}</h2>
                <p className = 'bannerText'>{description}</p>
                <div>
                    <a href={homepage}>
                        <button className = 'button button__main'>
                            <div className='inner'>homepage</div>
                        </button>
                    </a>
                    <a href={wiki}>
                        <button className = 'button button__secondary'>
                            <div className='inner'>wiki</div>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AppBanner;