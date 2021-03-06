import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import baseUrl from "../../baseUrl";

type News = {
  id: number;
  article: string;
  description: string;
  category: string;
};

type Props = {
  news: News[] | undefined;
};

type QueryParams = {
  slug: string;
};

export const getServerSideProps: GetServerSideProps<Props, QueryParams> = async ({
  params,
}) => {
  const response = await fetch(`${baseUrl}/news?category=${params?.slug}`);
  const newsList = (await response.json()) as News[];

  console.log(newsList);

  if (!newsList) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      news: newsList,
    },
  };
};


const News: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  news,
}) => {

  if (!news) {
    return <div>No News Available</div>;
  }

  return (
    <div>
      <Head>
        <title>Hot News: [{news.length}]</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <pre>
        {`// pre-rendered`}
        <br />
        {JSON.stringify(news, null, 2)}
      </pre>
    </div>
  );
};

export default News;
