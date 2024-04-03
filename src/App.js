import "./App.css";
import Card from "./Card";
import { Provider } from "react-redux";
import { store } from "./Store";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Card />
      </div>
    </Provider>
  );
}

export default App;
