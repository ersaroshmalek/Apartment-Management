import {
  DataTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Button,
  DataTableRow,
  DataTableHeader,
} from 'carbon-components-react';
import React, { useState } from 'react';

interface tableProps {
  fetchedData: any;
}
export const Table: React.FC<tableProps> = ({ fetchedData }) => {
  const [rows, setRows] = useState<DataTableRow<string>[]>();
  const [headers, setHeaders] = useState<DataTableHeader<string>[]>();

  let header: any = [];
  fetchedData?.map((member) =>
    Object.keys(member)
      .filter(
        (key) =>
          key !== '__typename' &&
          key !== 'id' &&
          (header.length > 0
            ? header.filter((e) => e.key).length > 0
              ? false
              : true
            : true)
      )
      .map((key) => {
        return header.push({
          key: key,
          header: key.charAt(0).toUpperCase() + key.slice(1),
        });
      })
  );
  setHeaders(header);

  setRows(fetchedData);

  return (
    <DataTable rows={rows} headers={headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell, _index) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
};
