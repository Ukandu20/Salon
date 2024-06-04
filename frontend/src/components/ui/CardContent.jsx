import React, { useState, useEffect, useRef } from 'react';

const CardContent = ({ data, targetLength, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    paginateContent();
  }, [data]);

  const paginateContent = () => {
    const pages = [];
    let currentPage = [];
    let currentPageHeight = 0;

    data.forEach((item, index) => {
      const itemHeight = measureHeight(item);
      if (currentPageHeight + itemHeight > targetLength) {
        pages.push(currentPage);
        currentPage = [];
        currentPageHeight = 0;
      }
      currentPage.push(item);
      currentPageHeight += itemHeight;
    });

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    setPaginatedData(pages);
  };

  const measureHeight = (item) => {
    const tempElement = document.createElement('div');
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.innerHTML = item;
    document.body.appendChild(tempElement);
    const height = tempElement.offsetHeight;
    document.body.removeChild(tempElement);
    return height;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div ref={contentRef}>
        {paginatedData[currentPage - 1]?.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className="pagination-controls">
        {paginatedData.length > 1 &&
          Array.from({ length: paginatedData.length }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default CardContent;
