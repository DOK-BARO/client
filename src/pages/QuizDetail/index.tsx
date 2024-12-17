import { useParams } from "react-router-dom";
import styles from "./_quiz_detail_module.scss";

export default function Index() {
  const { id } = useParams();

  return <section className={styles.container}>Index</section>;
}
