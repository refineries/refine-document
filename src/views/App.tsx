import { hot } from 'react-hot-loader/root';
import React from 'react';
import './App.css';

interface Props {
  name: string;
}

const App: React.FC<Props> = (props: Props): React.ReactElement => (
  <h1>
    <img src={require('../assets/logo.png')} alt="refine logo" />
    test, {props.name}
  </h1>
);

export default hot(App); // react-hot-loader
