import type { NextPage } from 'next';
import Config from 'apiResources/constants/Config';
const Home: NextPage = () => {
  return (
    <div>
      <img src={`${Config.ERROR_IMAGE_URL}`}/>
    </div>
  );
};

export default Home;
