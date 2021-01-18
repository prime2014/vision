import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Calendar from "./Components/Events/FullCalendar";
import Home from "./Components/Home/Home";
import MenuPage from "./Components/Program/MenuPage";
import Projects from "./Components/Projects/Projects";
import Todo from "./Components/Todo/Todo";
import { SWRConfig } from "swr";
import axios from "axios";
import ProjectBoard from "./Components/Board/ProjectBoard";

const base = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('token')
  }
})

const fetcher = async (url) => await base.get(url).then(res => res.data)

function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <Router>
        <div className="App">
          <Switch>

            <Route path="/" exact component={Home} />
            <Route path="/home" component={MenuPage} />
            <Route path="/todo" component={Todo} />
            <Route path="/events" component={Calendar} />
            <Route exact path="/projects" component={Projects} />
            <Route path="/projects/:slug/:id" component={ProjectBoard} />
          </Switch>
        </div>
      </Router>
    </SWRConfig>
  );
}

export default App;
