import useAutoComplete, { AutoCompleteConfiguration } from './AutoCompleteSelect'
import './App.css';

function App() {
    const configuration: AutoCompleteConfiguration = {
        apiUrl: '/api/babynames',
        debounceTimeOut: 300,
        limit: 100
    };

    const [name, autoComplete] = useAutoComplete(configuration);

    return (
        <div>
            <h1 id="tableLabel">Baby names</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <p>Selected Name: {name}</p>
            {autoComplete}
        </div>
    );
}

export default App;
