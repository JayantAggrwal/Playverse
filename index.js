import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import { AuthProvider } from "./Context/AuthContext";
import { DataProvider } from "./Context/DataContext";
import App from "./App";
import { makeServer } from "./server";

// Call make Server
makeServer();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
  <Router>
    <AuthProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthProvider>
  </Router>
</React.StrictMode>)


