import Routes from "./routes/Routes";
import { Provider } from 'react-redux'
import { store } from "./tab/store";

function App() {
  return (
    <Provider store={store}>
    <div>
     <Routes/>
    </div>
    </Provider>
  );
}

export default App;
