import React, { useEffect, useState } from 'react';
import {
  DataTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Table,
  Button,
} from 'carbon-components-react';
import { usePendingMaintenanceQuery } from '../../generated/graphql';
import { Wrapper } from '../wrapper';
import { Header } from './maintenance-style';
import { Link } from 'react-router-dom';

interface maintenanceProps {}

export const Maintenance: React.FC<maintenanceProps> = () => {
  const [{ data, error }] = usePendingMaintenanceQuery();
  const [rows, setRows] = useState<any>([]);
  const [headers, setHeaders] = useState<any>([]);

  const fetchData = () => {
    const res: any = data?.getPendingMembers;
    let header: any = [];
    res?.map((member) =>
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

    setRows(res);
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];

  return (
    <React.Fragment>
      <Wrapper variant="regular" type="table">
        <Header>
          Pending Maintenance as of {day.toString()}
          {'-'}
          {(month + 1).toString()}
          {'-'}
          {year.toString()}
        </Header>

        <div>
          {data?.getPendingMembers && rows && headers ? (
            <DataTable rows={rows} headers={headers}>
              {({
                rows,
                headers,
                getTableProps,
                getHeaderProps,
                getRowProps,
              }) => (
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                      <TableHeader>Action</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow {...getRowProps({ row })}>
                        {row.cells.map((cell, _index) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                        <TableCell>
                          <Link
                            to={{
                              pathname:
                                '/paymaintenance/' +
                                row.id +
                                '/' +
                                row.cells[0].value +
                                '/' +
                                row.cells[2].value,
                            }}
                          >
                            <Button
                              style={{
                                margin: '10px 0px',
                              }}
                              size="sm"
                            >
                              Update
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </DataTable>
          ) : null}
        </div>
        {error && <Header color="red">Something went wrong</Header>}
      </Wrapper>
    </React.Fragment>
  );
};
