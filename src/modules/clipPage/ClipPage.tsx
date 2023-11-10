import { useEffect, useState } from "react";
import cx from "classnames";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Skeleton from "./components/Skeleton/Skeleton";
import ItemList from "./ItemList/ItemList";

import styles from "./ClipPage.module.css";
import { ClipPageContextProvider } from "./context";
import SmallButton from "../../components/SmallButton/SmallButton";
import { ClipInterface } from "./types";

const Upload = () => {
  const handleFormSubmit = () => {};

  return (
    <div className={styles.container}>
      <Header>Create a short out of your video</Header>
      <Form handleSubmit={handleFormSubmit} />
    </div>
  );
};

interface ShowItemsProps {
  items: ClipInterface[];
  isFetching: boolean;
}

const ShowItems = (props: ShowItemsProps) => {
  const buttonText = props.isFetching ? "Loading..." : "Confirm";
  console.log(props.isFetching);

  return (
    <div className={cx(styles.container, styles.gap)}>
      {props.isFetching || props.items.length < 1 ? (
        <Skeleton />
      ) : (
        <ItemList items={props.items} />
      )}
      <SmallButton disabled>{buttonText}</SmallButton>
    </div>
  );
};

const ClipPage = () => {
  const [uploaded, setUploaded] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [items, setItems] = useState<ClipInterface[]>([]);

  useEffect(() => {
    if (!uploaded) {
      return;
    }

    setIsFetching(true);

    // TOOD : fetch the api
  }, [uploaded]);

  return (
    <ClipPageContextProvider
      value={{ isFetching, uploaded, setIsFetching, setUploaded }}
    >
      {uploaded ? (
        <ShowItems items={items} isFetching={isFetching} />
      ) : (
        <Upload />
      )}
    </ClipPageContextProvider>
  );
};

export default ClipPage;