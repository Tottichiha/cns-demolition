import { GetServerSideProps } from 'next';

function RobotsTxt() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const content = `User-agent: *
Allow: /

Sitemap: https://cnsdemo.com/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();

  return { props: {} };
};

export default RobotsTxt;
