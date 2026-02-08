import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router";
import './index.css';
import router from './Routes/Routes.jsx';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import  AuthProvider from "./contexts/AuthProvider.jsx";
import { ThemeProvider } from './components/ThemeContext';
import './index.css';
// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ThemeProvider>

    <QueryClientProvider client={queryClient}>
       <AuthProvider>
     <RouterProvider router={router} />
     <ToastContainer />
  
</AuthProvider>
    </QueryClientProvider>
     </ThemeProvider>

  </StrictMode>,
)
