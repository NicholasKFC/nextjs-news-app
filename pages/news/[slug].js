import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/News.module.css";

const News = ({ articles, pageNumber }) => {
	const router = useRouter();
	console.log(articles);
	return (
		<div className="container">
			<Navbar />
			<div className={styles["news-container"]}>
				{articles.map((article, i) => (
					<div key={i} className={styles["news-card"]}>
						<Link href={article.url}>
							<h1>{article.title}</h1>
						</Link>
						<img src={article.urlToImage} />
						<p>{article.description}</p>
					</div>
				))}
			</div>
			<div className={styles["news-paginator"]}>
				<button
					onClick={() => {
						if (pageNumber > 1) router.push(`/news/${pageNumber - 1}`);
						else router.push("/news/5");
					}}
				>
					Prev
				</button>
				<h4>{pageNumber}</h4>
				<button
					onClick={() => {
						if (pageNumber < 5) router.push(`/news/${pageNumber + 1}`);
						else router.push("/news/1");
					}}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export const getServerSideProps = async (pageContext) => {
	const pageNumber = pageContext.query.slug;

	const newsApiResponse = await fetch(
		`https://newsapi.org/v2/top-headlines?country=my&pageSize=5&page=${pageNumber}`,
		{
			headers: {
				"x-api-key": `${process.env.PUBLIC_NEWS_KEY}`,
			},
		}
	).then((res) => res.json());

	const { articles } = newsApiResponse;

	return {
		props: {
			articles,
			pageNumber: Number.parseInt(pageNumber),
		},
	};
};

export default News;
