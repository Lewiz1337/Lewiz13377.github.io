import { Component } from 'react/cjs/react.production.min';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import MarvelService from '../../services/MarvelService';
import './charInfo.scss';


class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

  

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);

    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false
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


    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char ={char}/> : null;

        return (
            
            <div className='charInfo'>
                {content}
                {skeleton}
                {errorMessage}
                {spinner}
            </div>
        )
    }

    
}
const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let imgStyle = {'objectFit' : 'cover'};
              if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                  imgStyle = {'objectFit' : 'unset'};
              }
    return (
        <>
            <div className='heroInfoNav'>
                <img src={thumbnail} alt={name} className="heroImg" style={imgStyle} />
                <div>
                    <p className='heroInfoName'>{name}</p>
                    <a href={homepage} className="button button__main">
                        <div className="inner">HOMEPAGE</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner"> wiki</div>
                    </a>
                </div>
            </div>
            <p className="charHistory">
                {description}
            </p>
            <h5 className='charComicsTitle'>Comics:</h5>
            <ul className="charComicsItem">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i ) => {

                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
                
                
            </ul>
        </>
    )
}


export default CharInfo; 