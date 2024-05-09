import React, { useEffect, useState } from 'react';
import DataTable from '../components/Datatable';
import Filters from '../components/Filters';
import { get } from "../network/ApiHandler";
import PaginationComponent from '../components/Pagination';
import { IProductDataItem, useProductData } from '../context/ProductDataContext';
import { Box, FormControl, MenuItem, Select, Tab, Tabs, Typography } from '@mui/material';
import InputComponent from '../components/InputComponent';
import CustomTabPanel from '../components/CustomTabPanel';

const ProductsPage: React.FC = () => {
  const columns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "price", label: "Price" },
    { key: "discountPercentage", label: "Discount Percentage" },
    { key: "rating", label: "Rating" },
    { key: "stock", label: "Stock" },
    { key: "brand", label: "Brand" },
    { key: "category", label: "Category" },
  ];
  const { state, dispatch } = useProductData();
  const [categories, setCategories] = useState([]);
  const [params, setParams] = useState({ key: "", value: "" });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await get(`/products/categories`);
      setCategories(response?.data ?? []);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    console.log('inside useEffect');
    const fetchData = async () => {
      console.log('inside fetchData');
      var skip = state.pageSize * (state.currentPage - 1);
      var paginate = `skip=${skip}&limit=${state.pageSize}`;
      var query = `/products`;
      if (activeTab === 1) {
        query += "/category/laptops?" + paginate;
       } 
      else if (params.key !== '') {
        query += "/search?" + params.key + "=" + params.value + "&" + paginate;
      } else if (category !== '') {
        query += "/category/" + category + "?" + paginate;
      } else {
        query += "?" + paginate;
      }
      const response = await get(query);
      dispatch({ type: 'SET_DATA', payload: response?.data.products ?? [] });
      dispatch({ type: 'SET_UNFILTERED_DATA', payload: response?.data.products ?? [] });
      dispatch({ type: 'SET_TOTAL', payload: response?.data.total ?? 0 });
    };

    fetchData();
  }, [state.currentPage, state.pageSize, category, params, activeTab, dispatch]);

  const handlePageSizeChange = (pageSize: number) => {
    dispatch({ type: 'SET_PAGE_SIZE', payload: pageSize });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
  };

  const handlePageChange = (page: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const performSearch = (term: string) => {
    var filteredProducts = filterProductsByValue(state.unfilteredData, term);
    dispatch({ type: 'SET_DATA', payload: filteredProducts });
  }

  function filterProductsByValue(products: IProductDataItem[], value: string) {
    var searchTerm = value.toLocaleLowerCase();
    return products.filter(product => {
      return columns.some(column => {
        const propValue = product[column.key as keyof IProductDataItem];
        if (propValue.toString().toLowerCase().includes(searchTerm)) {
          return true;
        }
        return false;
      });
    });
  }

  function clearParams() {
    setSearch('');
    setCategory('');
    setParams({ key: "", value: "" });
  }

  function searchProducts(term: string) {
    if (term !== '') {
      setParams({
        key: "q",
        value: term,
      });
    }
  }
  return (
    <div>
      <h1>Products</h1>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="products tabs">
            <Tab label="All" />
            <Tab label="Laptops" />
          </Tabs>
        </Box>
        {/* All tab */}
        <CustomTabPanel value={activeTab} index={0}>
          <Filters
            onPageSizeChange={handlePageSizeChange}
            onSearchChange={(term) => performSearch(term)}
            otherFilters={[
              <InputComponent
                value={search}
                placeholder="Filter..."
                onChange={(e) => {
                  clearParams();
                  setSearch(e);
                  searchProducts(e);
                }} />,

              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ m: 1 }}>Category</Typography>
                <FormControl>
                  <Select
                    sx={{ m: 1, minWidth: 80 }}
                    size="small"
                    labelId="category-select-label"
                    id="category-select"
                    value={category}
                    onChange={(e) => {
                      clearParams();
                      setCategory(e.target.value);
                    }}
                  >
                    {
                      categories.map((category: string, index) => {
                        const formattedText = category
                          .split('-')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ');
                        return (
                          <MenuItem key={index} value={category}>{formattedText}</MenuItem>
                        );
                      })
                    }
                  </Select>
                </FormControl>
              </div>
            ]}
          />
        </CustomTabPanel>
        {/* laptops tab */}
        <CustomTabPanel value={activeTab} index={1}>
          <Filters
            onPageSizeChange={handlePageSizeChange}
            onSearchChange={(term) => performSearch(term)}
          />
        </CustomTabPanel>
      </Box>
      <DataTable
        data={state.data}
        columns={columns}
      />
      <PaginationComponent totalPages={Math.ceil(state.total / state.pageSize)} onPageChange={handlePageChange} page={state.currentPage} />
    </div>
  );
};

export default ProductsPage;
