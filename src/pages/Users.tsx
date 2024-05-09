import React, { useEffect, useState } from 'react';
import { IUserDataItem, useUserData } from '../context/UserDataContext';
import DataTable from '../components/Datatable';
import Filters from '../components/Filters';
import { get } from "../network/ApiHandler";
import PaginationComponent from '../components/Pagination';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import InputComponent from '../components/InputComponent';

const UsersPage: React.FC = () => {
  const columns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "maidenName", label: "Maiden Name" },
    { key: "age", label: "Age" },
    { key: "birthDate", label: "Date of Birth" },
    { key: "gender", label: "Gender" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "username", label: "Username" },
    { key: "bloodGroup", label: "Blood Group" },
    { key: "eyeColor", label: "Eye Color" },
    { key: "domain", label: "Domain" },
  ];

  const [params, setParams] = useState({ key: "", value: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [gender, setGender] = useState("");

  const { state, dispatch } = useUserData();


  useEffect(() => {

    const fetchData = async () => {
      var skip = state.pageSize * (state.currentPage - 1);
      var paginate = `skip=${skip}&limit=${state.pageSize}`;
      var query = `/users`;
      if (params.key !== '') {
        query += "/filter?key=" + params.key + "&value=" + params.value + "&" + paginate;
      } else {
        query += "?" + paginate;
      }
      const response = await get(query);
      dispatch({ type: 'SET_DATA', payload: response?.data.users ?? [] });
      dispatch({ type: 'SET_UNFILTERED_DATA', payload: response?.data.users ?? [] });
      dispatch({ type: 'SET_TOTAL', payload: response?.data.total ?? 0 });
    };

    fetchData();
  }, [state.currentPage, state.pageSize, params, dispatch]);


  const handlePageSizeChange = (pageSize: number) => {
    dispatch({ type: 'SET_PAGE_SIZE', payload: pageSize });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
  };

  const handlePageChange = (page: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const performSearch = (term: string) => {
    var filteredProducts = filterUsersByValue(state.unfilteredData, term);
    dispatch({ type: 'SET_DATA', payload: filteredProducts });
  }

  function filterUsersByValue(products: IUserDataItem[], value: string) {
    var searchTerm = value.toLocaleLowerCase();
    return products.filter(product => {
      return columns.some(column => {
        const propValue = product[column.key as keyof IUserDataItem];
        if (propValue.toString().toLowerCase().includes(searchTerm)) {
          return true;
        }
        return false;
      });
    });
  }

  function clearParams() {
    setName('');
    setEmail('');
    setDob(null);
    setGender('');
    setParams({ key: "", value: "" });
  }

  function searchUsers(key: string, term: string) {
    if (term !== '') {
      setParams({
        key: key,
        value: term,
      });
    }
  }
  return (
    <div>
      <h1>Users</h1>
      <Filters
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={(term) => performSearch(term)}
        otherFilters={[
          <InputComponent
            value={name}
            placeholder="Name..."
            onChange={(e) => {
              clearParams();
              setName(e);
              searchUsers('firstName', e);
            }} />,
          <InputComponent
            value={email}
            placeholder="Email..."
            onChange={(e) => {
              clearParams();
              setEmail(e);
              searchUsers('email', e);
            }} />,
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Birth Date"
              slotProps={{ textField: { size: 'small' } }}
              value={dob}
              onChange={(val) => {
                console.log(val);
                clearParams();
                setDob(val);
                if (val) {
                  searchUsers('birthDate', val!.format('YYYY-MM-DD'));
                }
              }}
            />
          </LocalizationProvider>,
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ m: 1 }}>Gender</Typography>
            <FormControl>
              <Select
                sx={{ m: 1, minWidth: 80 }}
                size="small"
                labelId="gender-select-label"
                id="gender-select"
                value={gender}
                onChange={(e) => {
                  clearParams();
                  setGender(e.target.value);
                  searchUsers('gender', e.target.value);
                }}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </div>
        ]}
      />
      <DataTable
        data={state.data}
        columns={columns}
      />
      <PaginationComponent totalPages={Math.ceil(state.total / state.pageSize)} onPageChange={handlePageChange} page={state.currentPage} />
    </div>
  );
};

export default UsersPage;
