import React from 'react';
import styles from './ResultCard.css';
import { Tag, Divider } from 'antd';

const ResultCard = ({university, major, result}) => {
    return (
        <div>
            <Tag color={result==="rej"?"#f50":"#87d068"}>{result==="rej"?"被拒":"录取"}</Tag>
            <span className={styles.universityText}>{university}</span>
            <span className={styles.majorText}>{major}</span>
            {/* <Tag color="#87d068">#87d068</Tag> */}
            <Divider/>
        </div>
    );
};

ResultCard.propTypes = {
};

export default ResultCard;
