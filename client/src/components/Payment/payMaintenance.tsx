import {
  Button,
  DataTable,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Form,
  TextInput,
} from 'carbon-components-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePaymentMutation } from '../../generated/graphql';
import { Wrapper } from '../wrapper';

interface payMaintenanceProps {}

export const PayMaintenance: React.FC<payMaintenanceProps> = () => {
  const { flatNo, email, id } = useParams();
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(0);
  const [success, setSuccess] = useState('');
  const [, Payment] = usePaymentMutation();

  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];

  const rows = [
    {
      id: id,
      email: email,
      flatNo: flatNo,
      date: day + '-' + month + 1 + '-' + year,
    },
  ];

  const headers = [
    {
      key: 'flatNo',
      header: 'FlatNo',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'date',
      header: 'Date',
    },
  ];

  const numberInputProps = {
    className: 'some-class',
    id: 'amount',
    labelText: '',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(amount) || amount < 500) {
      setError('Please enter valid amount');
    } else {
      const payment = await Payment({
        flatNo: parseInt(flatNo),
        email: email,
        date: day + '-' + month + 1 + '-' + year,
        amountPaid: amount,
      });
      if (payment.data?.addMaintenance) {
        setSuccess(
          `Maintenance ${payment.data?.addMaintenance.amount} paid successfully, now you have ${payment.data?.addMaintenance.due} rs to pay `
        );
      } else {
        setError(payment.error?.message);
        setSuccess('');
      }
    }
  };

  const updateData = (e) => {
    setAmount(parseInt(e.target.value));
  };

  return (
    <Wrapper variant="regular">
      <Form>
        <DataTable rows={rows} headers={headers} isSortable>
          {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
            <TableContainer title="Pay monthly maintenanace">
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader
                        key={header.key}
                        {...getHeaderProps({ header })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                    <TableHeader>Amount</TableHeader>
                    <TableHeader>Action</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell id={cell.value} key={cell.id}>
                          {cell.value}
                        </TableCell>
                      ))}

                      <TableCell>
                        <TextInput
                          onChange={(e) => updateData(e)}
                          {...numberInputProps}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={(e) => handleSubmit(e)}
                          type="submit"
                          style={{
                            margin: '10px 0px',
                          }}
                          size="field"
                        >
                          Submit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      </Form>
      <br></br>
      <br></br>
      {error && <h1>{error}</h1>}
      {success && <h4>{success}</h4>}
    </Wrapper>
  );
};
