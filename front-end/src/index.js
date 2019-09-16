import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import * as serviceWorker from './serviceWorker';
import '../src/index.css';

if (null !== $ && null !== Popper) {
  ReactDOM.render(
    <BrowserRouter>
      <div>{renderRoutes(routes)}</div>
    </BrowserRouter>,
    document.getElementById('root')
  );
  serviceWorker.unregister();
}
