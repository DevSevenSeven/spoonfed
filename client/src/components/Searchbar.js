import React from 'react';
import { calltodb } from './your-db-service'; // Assuming this is your database call function
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchResults: [],
        };
        // Bind methods to preserve 'this' context
        this.onChange = this.onChange.bind(this);
        this.getResults = this.getResults.bind(this);
    }
    onChange(e) {
        this.setState({ searchText: e.target.value });
    }
    getResults() {
        const { searchText } = this.state;
        calltodb(searchText).then(response => {
            this.setState({ searchResults: response.values });
        });
    }
    render() {
        return (<div>
        <SearchBar onChange={this.onChange} searchText={this.state.searchText} onSearch={this.getResults}/>
        <SearchResults results={this.state.searchResults}/>
      </div>);
    }
}
export default App;
