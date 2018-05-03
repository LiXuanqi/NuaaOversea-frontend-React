import React from 'react';
import styles from './BillboardCard.css';

const BillboardCard = ({username, role, helpNumber}) => {
    return (
        <div className={styles.card}>
            <span className={styles.title}>消息栏</span>
            <div className={styles.contentContainer}>
                <p className={styles.text}>最近申请季, 祝拿到心仪Offer的同学能在海外得到想要的生活, 也祝没能拿到心仪Offer的同学不用灰心. 祝大家 天宽地广, 大有前程。</p>
            </div>
        </div>
    );
};

BillboardCard.propTypes = {
};

export default BillboardCard;
