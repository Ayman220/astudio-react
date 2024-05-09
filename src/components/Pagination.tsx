import { Pagination, Stack } from '@mui/material';
import React from 'react';

interface PaginationProps {
  totalPages: number;
  page?: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ totalPages, onPageChange, page = 1 }) => {
  return (
    <Stack alignItems="center">
      <Pagination count={totalPages} onChange={(e, pageNumber) => onPageChange(pageNumber)} page={page} />
    </Stack>
  );
};

export default PaginationComponent;
