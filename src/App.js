import logo from './logo.svg';
import './App.css';
import "./index.css"
import store from "./lib/store";

import { Providor } from "react-redux";
import InboxScreen from './components/InboxScreen';

function App() {
  return (
    <Providor store={store}>
      <InboxScreen />
    </Providor>
  );
}

export default App;
