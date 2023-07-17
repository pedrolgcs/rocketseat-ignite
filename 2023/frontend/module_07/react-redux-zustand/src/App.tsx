import { Provider } from 'react-redux'
import { Player } from './pages/Player'
import { store } from './store'
import './styles/global.css'

function App() {
  return (
    <Provider store={store}>
      <Player />
    </Provider>
  )
}

export default App
