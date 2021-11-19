import type { NextPage } from 'next';

interface IErrorPageProps {
  statusCode: number;
}

const ErrorPage: NextPage<IErrorPageProps> = ({ statusCode }) => {
  return (
    <div>
      {statusCode ? `${statusCode} by server-side` : `error by client-side`}
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }): IErrorPageProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode: Number(statusCode) };
};

export default ErrorPage;
