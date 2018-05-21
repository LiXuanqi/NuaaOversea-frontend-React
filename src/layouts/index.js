import React from 'react';
import styles from './index.css';
import Header from './Header';
import { simpleLayoutPages } from '../utils/config';
import withRouter from 'umi/withRouter';

function Layout({ children, location }) {
    if (simpleLayoutPages.includes(location.pathname)) {
        return (<div>{children}</div>);
    }
    return (
        <div className={styles.normal}>
            <Header />
            <div className={styles.content}>
                <div className={styles.main}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default withRouter(Layout);