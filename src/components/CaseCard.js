import React from 'react';
import Link from 'umi/link';
import styles from './CaseCard.css';
import { Tag, Divider } from 'antd';
import CountryIcon from './CountryIcon';


const CaseCard = ({id, result, university, country, major, degree, term, gpa, language_type, language_reading, language_listening, language_speaking, language_writing, gre_verbal, gre_quantitative, gre_writing, tags }) => {
 
    return (
        <Link to={"/cases/"+id}>
        <div className={styles.cardContainer}>
        {/* {result==="rej"?"#f50":"#87d068"} */}
            <div className={styles.titleContainer}>
                <span className={styles.title}><Tag color={result==="rej"?"#f50":"#87d068"}>{result}</Tag>{university}, {major}</span>
             
                <CountryIcon country={country}/>
              
            </div>
         
            <div className={styles.tagsContainer}>
                <Tag color="red">{degree}</Tag>
                <Tag color="red">{term}</Tag>
                {
                    
                    tags !== undefined ?
                    tags.map((item) => {
                        return (<Tag key={item.id} color="blue">{item.name}</Tag>);
                    })
                    :
                    null
                }
       
            </div>
            <div className={styles.marksContainer}>
                <div className={styles.markContainer}>
                    <span className={styles.intro}>GPA</span>
                    <span className={styles.mark}>{gpa}</span>
                </div>
                <div className={styles.markContainer}>
                    <span className={styles.intro}>{language_type}</span>
                    <span className={styles.mark}>
                        {
                            language_type === "TOEFL" 
                                ?
                                language_reading+language_listening+language_speaking+language_writing 
                                :
                                // IELTS 0.75 = 1,0.25 = 0.5
                                (language_reading+language_listening+language_speaking+language_writing) / 4
                                 + ((language_reading+language_listening+language_speaking+language_writing) / 4 % 1 === 0.25 ? 0.25 : 0)
                                 + ((language_reading+language_listening+language_speaking+language_writing) / 4 % 1 === 0.75 ? 0.25 : 0)
                        }
                        ({language_speaking})
                    </span>
                </div>
                <div className={styles.markContainer}>
                    <span className={styles.intro}>GRE</span>
                    <span className={styles.mark}>{gre_verbal+gre_quantitative}(V{gre_verbal}+Q{gre_quantitative}+W{gre_writing})</span>
                </div>       
            </div>
            <Divider />
        </div>
        </Link>
    );
};

CaseCard.propTypes = {
};

export default CaseCard;
