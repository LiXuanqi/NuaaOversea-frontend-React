import { Route } from 'react-router-dom';
import Redirect from 'umi/redirect';
import { message } from 'antd';
import { connect } from 'dva';

const PrivateRoute = ({ render, isLogin ,...rest }) => {
    if (!isLogin) {
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

function mapStateToProps(state) {
    return {
        isLogin: state.user.isLogin
    };
}

export default connect(mapStateToProps)(PrivateRoute);