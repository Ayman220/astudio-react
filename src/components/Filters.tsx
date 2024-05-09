import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import { GoSearch } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import '../styles/expandSearch.css';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';

interface FiltersProps {
  onPageSizeChange: (pageSize: number) => void;
  onSearchChange: (searchTerm: string) => void;
  otherFilters?: ReactNode[];
}

const Filters: React.FC<FiltersProps> = ({ onPageSizeChange, onSearchChange, otherFilters }) => {
  const [expSearch, setExpSearch] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  const toggleExpSearch = () => {
    setExpSearch(!expSearch);
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControl>
        <Select
          sx={{ m: 1, minWidth: 80 }}
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            onPageSizeChange(Number(e.target.value));
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <Typography sx={{ m: 1 }}>Entries</Typography>

      <div className="container">
        <button className='search-button' type="button" onClick={toggleExpSearch}>
          {expSearch ? <IoMdClose /> : <GoSearch />}
        </button>
        <input
          type="search"
          className={clsx(expSearch && "exp-search-show")}
          placeholder="search..."
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
        />
      </div>
      <div style={{display:"flex", marginLeft: "18px", alignItems:"center"}}>
        {
          otherFilters && otherFilters.map((value, index) => (<div key={index} style={{margin:"0 3px"}}>
            {value}
          </div>))
        }
      </div>
    </div>
  );
};

export default Filters;
