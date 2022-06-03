import { Route, Switch } from 'react-router-dom';

// pages
import Home from '../pages/Home';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
}

export default Routes;
