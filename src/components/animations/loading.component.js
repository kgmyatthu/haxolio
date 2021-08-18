import React from 'react';
import { Shuffler } from './anime.component';
import styles from './anime.module.css';

const Loading = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.loading_child}>
                <Shuffler type="hover">
                    <h1 className={styles.fade_in_out}>Loading . . .</h1>
                    <small className={styles.fade_in_out}>Please wait while the webpage is loading</small>
                </Shuffler>
            </div>
        </div>
    )
}

export default Loading
