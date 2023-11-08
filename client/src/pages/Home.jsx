import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div class="row">
        <div class="col-sm-3">
          <a href="data.link to recipe">
            <img src="data.recipe image" width="95%">data.recipe name</img>
            <p>data.recipe tags</p>
          </a>
          <br></br>
        </div>
        <div class="col-sm-3">
          <a href="data.link to recipe">
            <img src="data.recipe image" width="95%">data.recipe name</img>
            <p>data.recipe tags</p>
          </a>
          <br></br>
        </div>
        <div class="col-sm-3">
          <a href="data.link to recipe">
            <img src="data.recipe image" width="95%">data.recipe name</img>
            <p>data.recipe tags</p>
          </a>
          <br></br>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <a href="data.link to recipe">
            <img src="data.recipe image" width="95%">data.recipe name</img>
            <p>data.recipe tags</p>
          </a>
          <br></br>
        </div>
        <div class="col-sm-3">
          <a href="data.link to recipe">
            <img src="data.recipe image" width="95%">data.recipe name</img>
            <p>data.recipe tags</p>
          </a>
          <br></br>
        </div>
        <div class="col-sm-3">
          <a href="data.link to recipe">
            <img src="data.recipe image" width="95%">data.recipe name</img>
            <p>data.recipe tags</p>
          </a>
          <br></br>
        </div>
      </div>

    </main>
  );
};

export default Home;
