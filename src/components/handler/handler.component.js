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


export const DataNotFound = () =>{
    return (
        <div className={styles.data_not_found}>
            <div className={styles.data_not_found_child}>
                <h1><small>0x</small>404</h1>
                <p>Data Doesnt seem to be exist, or we'd failed to fetch it, try refreshing</p>
            </div>
        </div>
    )
}

export const NoWebGL = () =>{
    return (
        <div className={styles.notfound}>
            <div className={styles.notfound_child}>
                <h1><small>0x</small>Unfortunate</h1>
                <p>Your browser does not support WEBGL 3D capabilities which this site require please use different browser</p>
            </div>
        </div>
    )
}


export const GeneralError = () => {
    return (
        <div className={styles.notfound}>
            <div className={styles.notfound_child}>
                <h1><small>0x</small>500</h1>
                <p>Something's wrong with the site if this keep happening, please contact the site owner</p>
                <Link to="/">Go Back</Link>
            </div>
        </div>
    )
}




export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <GeneralError/>
      }
  
      return this.props.children; 
    }
  }
