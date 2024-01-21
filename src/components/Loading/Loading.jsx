import React from "react";
import styles from "./Loading.module.css";
import { logoLoading } from "../../img/logos";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <img
        src={logoLoading} alt=""
        className={styles.loadingImage}
      />
      <h1 className={styles.loadingText}>Loading</h1>
    </div>
  );
};

export default Loading;