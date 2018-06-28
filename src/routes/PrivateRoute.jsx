import { Route } from 'react-router-dom';
import Redirect from 'umi/redirect';
import { message } from 'antd';
import auth from '../services/auth'

const PrivateRoute = ({ render, ...rest }) => {
  if (!auth.isAuthenticated()) {
    message.warn('请先登录');
    return (<Redirect to='/login' />)
  }
  return <Route
    {...rest}
    render={props =>
      <div>
        {
          render(props)
        }
      </div>
    }
  />;
}


export default PrivateRoute;