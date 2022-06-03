// components
import { TaskList } from './components/TaskList'
import { Header } from "./components/Header";

// styles
import './styles/global.scss'

export function App() {
  return (
    <>
      <Header />
      <TaskList />
    </>
  )
}