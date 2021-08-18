import React from 'react';
import { Link } from 'react-router-dom';
import styles from './handler.module.css';

const Notfound = () => {
    return (
        <div className={styles.notfound}>
            <div className={styles.notfound_child}>
                <h1><small>0x</small>404</h1>
                <p>The page you're looking for does not exist.</p>
                <Link to="/">Go Back</Link>
            </div>
        </div>
    )
}

export default Notfound
