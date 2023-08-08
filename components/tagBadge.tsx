import styles from "./styles/tagBadge.module.scss";

interface TagBadgeProps {
    tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
    return <div className={styles.tag_badge}>{tag}</div>;
}
