import { Select, SelectItem, SelectItemGroup } from 'carbon-components-react';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import { useGetMembersQuery, useHistoryQuery } from '../../generated/graphql';
import { Wrapper } from '../wrapper';

interface maintenanceHistoryProps {}

export const MaintenanceHistory: React.FC<maintenanceHistoryProps> = ({}) => {
  const [{ data, error, fetching }] = useGetMembersQuery();
  const [apartements, setApartments] = useState([]);
  const [rows, setRows] = useState<any>([]);
  const [headers, setHeaders] = useState<any>([]);

  const handleSelect = (e) => {
    const flatId = e.target.value;
    const [{ data, error, fetching }] = useHistoryQuery(flatId);
    const result = data?.getHistory;
    let header: any;
    result?.map((data) =>
      Object.keys(data)
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
    setRows(result);
  };

  const getApartments = async () => {
    const result = await data?.getMembers;
    setApartments(result);
    apartements?.sort();
  };

  useEffect(() => {
    getApartments();
  });

  return (
    <React.Fragment>
      <Wrapper variant="regular" type="table">
        <Select
          onChange={(e) => handleSelect(e)}
          className="TEST_CLASS"
          id="select-1"
          defaultValue="placeholder-item"
        >
          <SelectItem
            disabled
            hidden
            value="placeholder-item"
            text="Select Apartment Number"
          />
          {apartements?.map((id, index) => (
            <SelectItem
              key={index}
              value={id.flatNo}
              text={String(id.flatNo)}
            />
          ))}
        </Select>
      </Wrapper>
    </React.Fragment>
  );
};
