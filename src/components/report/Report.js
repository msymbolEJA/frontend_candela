import React, { useState } from 'react';
import BestSeller from './BestSeller';
import Selected from './Selected';
import DateFilter from '../../helpers/DateFilter';
import { ConstantCost } from './ConstantCost';

const Report = () => {
  const [dates, setDates] = useState({
    end_date: '',
    start_date: '',
  });

  const username = JSON.parse(localStorage.getItem('user'))?.username;

  const [IsShowMete, setIsShowMete] = useState(false);

  const handleMete = () => setIsShowMete(!IsShowMete);

  return (
    <div>
      <h2>Report</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {username === 'Admin50' && <ConstantCost />}
        <DateFilter
          dates={dates}
          setDates={setDates}
          handleMete={handleMete}
          IsShowMete={IsShowMete}
        />
        <Selected dates={dates} IsShowMete={IsShowMete} />
        {/* <DailyChart dates={dates} /> */}
        <BestSeller dates={dates} />
      </div>
    </div>
  );
};

export default Report;
