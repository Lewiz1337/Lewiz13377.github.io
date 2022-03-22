import { Component } from 'react/cjs/react.production.min';
import AppHeader from '../appHeader/AppHeader';
import AppBanner from '../appBanner/AppBanner';
import CharList from '../charList/charList';
import CharInfo from '../charInfo/charInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './App.scss';
import '../../style/button.scss';

class App extends Component {
  
  state = {
    selectedChar: null
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id
    })
  }


  render() {
    return (
      <div className="App">
        <AppHeader/>
        <ErrorBoundary>
          <AppBanner />
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected = {this.onCharSelected}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={this.state.selectedChar}/>
          </ErrorBoundary>
        </div>
      </div>
    );
  }
  
}

export default App;
