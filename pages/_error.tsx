import type { NextPage } from 'next';
import Config from 'apiResources/constants/Config';
interface IErrorPageProps {
  statusCode: number;
}

const ErrorPage: NextPage<IErrorPageProps> = ({ statusCode }) => {
  console.log('-=-ErrorPage-=-',statusCode)
  return (
    <div>
      {/*{statusCode ? `${statusCode} by server-side` : `error by client-side`}*/}
      <img src={`${Config.ERROR_IMAGE_URL}`}/>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }): IErrorPageProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode: Number(statusCode) };
};



export default ErrorPage;
