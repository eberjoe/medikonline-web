import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ptBr from 'date-fns/locale/pt-BR';


ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider locale={ptBr} utils={DateFnsUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);