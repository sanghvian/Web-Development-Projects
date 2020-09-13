import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

export const Job = ({ job }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='my-4'>
      <Card className='mb-3'>
        <Card.Body>
          <div className='d-flex justify-content-between'>
            <div>
              <Card.Title>
                {job.title} -{' '}
                <span className='text-muted font-weight-light'>
                  {job.company}
                </span>
              </Card.Title>
              <Card.Subtitle>
                {new Date(job.created_at).toLocaleString()};
              </Card.Subtitle>
              <Badge variant='secondary' className='mr-2'>
                {job.type}
              </Badge>
              <Badge variant='secondary' className='mr-2'>
                {job.location}
              </Badge>
              <div style={{ wordBreak: 'break-all' }}>
                <ReactMarkdown>{job.how_to_apply}</ReactMarkdown>
              </div>
            </div>
            <img
              className='d-none d-md-block'
              height='50'
              src={job.company_logo}
              alt={job.company}
            />
          </div>
          <Card.Text>
            <Button
              variant='primary'
              onClick={() => setOpen((prevOpen) => !prevOpen)}
            >
              {open ? 'Hide Details' : 'View Details'}
            </Button>
          </Card.Text>
          <Collapse in={open}>
            <div className='mt-4'>
              <ReactMarkdown source={job.description} />
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Job;
