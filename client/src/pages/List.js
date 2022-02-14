import React, { useEffect, useState } from 'react';

function List() {
  // Initialize the state
  const [list, setList] = useState([]);

  // Fetch the list on first mount
  useEffect(() => {
    getList();
  }, [])

  function getList() {
    fetch('/api/getList')
      .then(res => res.json())
      .then(list => setList(list))
  }
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">List of Items</h1>
      {/* Check to see if any items are found*/}
      {list.length ? (
        <div>
          {/* Render the list of items */}
          {list.map((item, i) => {
            return (
              <div key={i}>
                {item}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h2>No List Items Found</h2>
        </div>
      )
      }
    </div>
  );
}

export default List;