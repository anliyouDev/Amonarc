import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import './index.css'
import App from './App'

// Preserve existing shared links without keeping hash-based page URLs.
const legacyInvestor=window.location.hash === '#/investisseurs';
if (legacyInvestor) window.history.replaceState(null,'','/investisseurs');
else if (window.location.hash === '#/') window.history.replaceState(null,'','/');
const tree = (
  <StrictMode>
   <BrowserRouter>
    <App/>
   </BrowserRouter>
  </StrictMode>
);
const root = document.getElementById('root') as HTMLElement;
if(root.dataset.prerendered === 'true' && !legacyInvestor) hydrateRoot(root,tree);
else createRoot(root).render(tree);
