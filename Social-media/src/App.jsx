// src/App.js
import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import { AuthProvider} from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import AppRoutes from './AppRoutes';


function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
