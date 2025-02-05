import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './components/App'; 

const root = ReactDOM.createRoot(document.getElementById('root')); // Создание корневого элемента

root.render(
  <React.StrictMode>
    <App /> {/* Рендерим компонент App */}
  </React.StrictMode>
);


