import React, { Component } from 'react';
import './App.css';
import { fetchCharacters, fetchCharacterById } from './actions';

class App extends Component {
  state = {
    characters: [],
    page: 1,
    activeCharacter: {},
    activeCharacterId: -1,
    searchValue: '',
  };

  componentDidMount() {
    this.fetchCharactersAndSetState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.fetchCharactersAndSetState();
    }
  }

  fetchCharactersAndSetState = () => {
    fetchCharacters(this.state.page)
      .then(characters =>
        this.setState({ characters: this.state.characters.concat(characters.filter(c => !!c.name === true)) }));
  }

  updatePage = () => {
    this.setState({ page: this.state.page + 1 });
  }

  handleCharacterClick = (id) => {
    fetchCharacterById(id)
      .then(activeCharacter =>
        this.setState({ activeCharacter, activeCharacterId: id }))
  }

  handleSearch = (e) => {
    const { value } = e.currentTarget;

    this.setState({ searchValue: value });
  }

  characterFilter = (char) => {
    const name = char.name.toUpperCase();
    const searchVal = this.state.searchValue.toUpperCase();

    return name.includes(searchVal.toUpperCase());
  }

  render() {
    const renderCharacter = (char, idx) => {
      let classes = 'character';

      if (this.state.activeCharacterId === char.id) {
        classes += ' active';
      }

      return (
        <div className={classes} key={idx} onClick={() => this.handleCharacterClick(char.id)}>
          {char.name}
        </div>
      )
    };

    const renderDiv = (item) => {
      if (!item.value) return false;

      return (
        <div>
          {item.title}: {item.value}
        </div>
      )
    }

    const renderAllegiance = (all, idx) => {
      const { name, region, coatOfArms, founded, currentLord } = all.house;

      return (
        <div key={idx}>
          {name}
          {renderDiv({ title: 'Region', item: region })}
          {renderDiv({ title: 'Coat Of Arms', item: coatOfArms })}
          {renderDiv({ title: 'Current Lord', item: currentLord })}
          {renderDiv({ title: 'Founded', item: founded })}
        </div>
      )
    }

    const renderFeaturedCharacter = () => {
      const { name, allegiances } = this.state.activeCharacter;

      return (
        <div>
          Name: {name}
          {allegiances.map(renderAllegiance)}
        </div>
      )
    };

    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Characters loaded : {this.state.characters.length}</h1>
          <h3>Featured Character:</h3>
          {this.state.activeCharacter.id && renderFeaturedCharacter()}
        </header>
        <div className="searchAndFetch">
          <button onClick={this.updatePage}>Fetch More Characters</button>
          <input type="input" placeholder="Search loaded characters" onChange={this.handleSearch} />
        </div>
        {
            this.state.characters
              .filter(this.characterFilter)
              .map(renderCharacter)
        }
      </div>
    );
  }
}

export default App;
