import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ManageSchedule from '../containers/System/Admin/Doctor/ManageSchedule';
import Header from '../containers/Header/Header';
const Doctor = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const { path } = useRouteMatch();

  return (
    <>
      {isLoggedIn && <Header />}
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path={`/doctor/manage-schedule`} component={ManageSchedule} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Doctor;
