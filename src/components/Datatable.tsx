// DataTable.tsx
import React from 'react';
import { IUserDataItem } from '../context/UserDataContext';
import { IProductDataItem } from '../context/ProductDataContext';

// type DataItem = IUserDataItem | IProductDataItem;
type DataItem<T> = T extends IUserDataItem ? IUserDataItem : IProductDataItem;
interface DataTableProps {
  columns: any[];
  data: DataItem<any>[];
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  return (
    <table style={{ marginTop: "1rem", marginBottom: "1rem", width: "100%" }}>
      <thead>
        <tr>
          {columns.map((value, index) => {
            return <th key={index}>{value.label}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((columnName, columnIndex) => (
              <td key={columnIndex}>{item[columnName.key as keyof DataItem<IUserDataItem | IProductDataItem>]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
