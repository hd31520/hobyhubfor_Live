import React, { useEffect, useState } from 'react';
import { FetchContext } from './FetchContext';

const FetchProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [featuredGroups, setFeaturedGroups] = useState([]);

  useEffect(() => {
    fetch('  http://localhost:3000/groups')
      .then(res => res.json())
      .then(data => {
        setFeaturedGroups(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(true); // Optional: Consider setting an error state instead
      });
  }, []);

  const fetchData = {
    featuredGroups,
    loading,
  };

  return (
    <FetchContext.Provider value={fetchData}>
      {children}
    </FetchContext.Provider>
  );
};

export default FetchProvider;
