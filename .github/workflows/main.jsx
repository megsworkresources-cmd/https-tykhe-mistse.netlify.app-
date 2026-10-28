import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import App from './App'
import './style.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(console.error)
  })
}

const convexUrl = import.meta.env.VITE_CONVEX_URL
const app = convexUrl
  ? <ConvexProvider client={new ConvexReactClient(convexUrl)}><App /></ConvexProvider>
  : <App />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{app}</React.StrictMode>
)
