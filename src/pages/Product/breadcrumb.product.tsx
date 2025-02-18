import React from 'react';
import { IBreadcrumb } from '../../utils/interface.utils';
import { Link } from 'react-router-dom';

const Breadcrumb: React.FC<{ breadcrumb: IBreadcrumb[] }> = ({ breadcrumb }) => {
    return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumb.map((crumb, index) => (
          <li className="breadcrumb-item" key={index}>
            <Link className="text-decoration-none text-secondary" to={crumb.link}>{crumb.title}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;