import React from "react";
import styles from "./NotFound.module.css";

const NotFoundBlock = () => {
  return (
    <h1 className={styles.container}>
      <span>:(</span>
      <br />
      Нічого не знайдено
    </h1>
  );
};

export default NotFoundBlock;
