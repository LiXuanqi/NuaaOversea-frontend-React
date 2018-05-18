import React from 'react';
import styles from './Cover.css';
import CaseSearch from './CaseSearch';
import cover_1828px from '../assets/cover-1828px.jpg';
import cover_1371px from '../assets/cover-1371px.jpg';
import cover_914px from '../assets/cover-914px.jpg';

const Cover = () => {
    return (
        <div>
            <div className={styles.coverPic}>
                {/* 
                    h: 457px;
                    w: 685.5px; 914px; 1371px; 1828px;
                 */}
                <picture className={styles.img}>
                    <source srcSet={cover_1828px} media="(min-width: 1828px)" sizes="100vw"/>
                    <source srcSet={cover_1371px} media="(min-width: 1371px)" sizes="100vw"/>
                    <source srcSet={cover_914px} media="(min-width: 914px)" sizes="100vw"/>
                    <img src={cover_914px} alt="cover" width="100%" height="457px"/>
                </picture>
                <div className={styles.coverPicMask}/>
                <div className={styles.textLayer}>
                    <div className={styles.maskContent}>
                        <div className={styles.empty} />
                        <div className={styles.contentText}>
                            <span className={styles.title}>Oversea</span>
                            <span className={styles.intro1}>南航人自己的留学案例库</span>
                            <span className={styles.intro2}>希望能够帮到迷茫中的你，也希望你能够帮助更多的他们。</span>
                            <div className={styles.searchContainer}>
                                <CaseSearch />
                            </div>
                        </div>
                        <div className={styles.empty} />
                    </div>         
                    
                </div>
            </div>
            
            
        </div>
    );
};

Cover.propTypes = {
};

export default Cover;