import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from './store/store'
import { Provider } from 'react-redux'
import './index.css'

const chatInit = () => {
  let root = document.getElementById('chat-root')

  if (!root) {
    root = document.createElement('div')
    root.id = 'chat-root'
    root.classList.add('chatty-chat-chat')
    document.body.appendChild(root)
  }

  ReactDOM.createRoot(document.getElementById('chat-root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

chatInit()
