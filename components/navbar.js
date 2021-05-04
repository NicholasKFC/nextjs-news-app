import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<Link href="/">Home</Link>
			<Link href="/news/1">News</Link>
		</nav>
	);
};

export default Navbar;
