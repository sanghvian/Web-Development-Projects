import React, { useState, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import useFetchJobs from './useFetchJobs';
import Job from './Job';
import JobPagination from './JobPagination';
import SearchForm from './SearchForm';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  return (
    <Fragment>
      <Container className='my-4'>
        <h1 className='mb-4'>
          GitHub Jobs &nbsp; <i className='fab fa-github'></i>
        </h1>
        <SearchForm params={params} onParamChange={handleParamChange} />
        <JobPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
        {error && <h1>Error.Try Refreshing please</h1>}
        {loading && <h1>Loading...</h1>}
        {jobs.map((job) => {
          return <Job key={job.id} job={job} />;
        })}
        <JobPagination page={page} setPage={setPage} />
      </Container>
      <div>
        <h2 style={{ width: '100%', textAlign: 'center' }}>
          Developed by Ankit
        </h2>
      </div>
    </Fragment>
  );
}

export default App;
