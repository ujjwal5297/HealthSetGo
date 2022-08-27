import React from "react";
import HomeForm from "../src/screens/home/HomeForm";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../src/persistence/reducer";
import "bootstrap/dist/css/bootstrap.css";

const store = createStore(reducer);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { debug: "" };
  }

  handleSubmit(values) {
    const self = this;
    self.setState({ debug: JSON.stringify(values) });
  }

  render() {
    const onSubmit = this.handleSubmit.bind(this);
    return (
      <Provider store={store}>
        <div>
          <HomeForm onSubmit={onSubmit} />
          <div>
            <pre>{this.state.debug}</pre>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
