import React, { Component } from 'react';

import './Sidebar.css';

let DeparmentsList = {
  data: [
    {
      departmentName: 'College of Business',
      departmentCollege: [
        {
          collegeQuery: 'acctg',
          collegeName: 'Accounting Department'
        },
        {
          collegeQuery: 'buslab',
          collegeName: 'Business Computer Lab'
        },
        {
          collegeQuery: 'econ',
          collegeName: 'Economics Department'
        }
      ]
    },
    {
      departmentName: 'College of Science and Engineering',
      departmentCollege: [
        {
          collegeQuery: 'biology',
          collegeName: 'Biology Department'
        },
        {
          collegeQuery: 'cs',
          collegeName: 'Department of Computer Science'
        },
        {
          collegeQuery: 'statmath',
          collegeName: 'Mathematics Department'
        }
      ]
    }
  ]
};

class Sidebar extends Component {
  onSearchMacro = event =>
    (window.location = `/search/${event.target.name}/page/1`);

  render() {
    return (
      <nav id='sidebar' style={{ minHeight: '100%' }}>
        <div className='sidebar-header'>
          <h3>San Francisco State University</h3>
        </div>

        <ul className='list-unstyled components'>
          <p>Deparments</p>
          {DeparmentsList.data.map((department, i) => (
            <li key={i}>
              <a
                href={`#${department.departmentName.replace(
                  /\s+/g,
                  '-'
                )}Submenu`}
                data-toggle='collapse'
                aria-expanded='false'
                className='dropdown-toggle'
                style={{
                  fontSize: '0.85vw'
                }}
              >
                {department.departmentName}
              </a>
              <ul
                className='collapse list-unstyled'
                id={`${department.departmentName.replace(/\s+/g, '-')}Submenu`}
              >
                {department.departmentCollege.map((college, i) => (
                  <li key={i}>
                    <a
                      onClick={this.onSearchMacro}
                      name={college.collegeQuery}
                      href='# '
                    >
                      {college.collegeName}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
export default Sidebar;
