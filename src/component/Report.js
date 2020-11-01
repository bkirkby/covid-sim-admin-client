// @ts-ignore
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import { CovidSecondReport } from '../api/reporting';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const Report = ({ report }) => {
  const timePrefix = report instanceof CovidSecondReport ? 'sec' : 'ms';
  const columns = [
    {
      Header: `Time (${timePrefix})`,
      accessor: 'time'
    },
    {
      Header: 'Num Healthy',
      accessor: 'numHealthy'
    },
    {
      Header: 'Num Infected',
      accessor: 'numInfected',
    },
    {
      Header: 'Num Immune',
      accessor: 'numImmune'
    }
  ];

  const getFormattedData = () => {
    try {
      return report.formattedData
    } catch (e) {
      if (e instanceof TypeError) {
        console.error(`${e.message}`);
        alert(`${e.message}`);
      }
    }
  }

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow
  } = useTable({ columns, data: getFormattedData() });

  return (
    <Styles>
      <div style={{ fontWeight: 'bold', fontSize: 'x-large' }}>{report.title}</div>
      <div style={{ fontSize: 'xx-small' }}>{report.date.toString()}</div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(hg => {
            return <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map(column => {
                return <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              })}
            </tr>
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          })}
        </tbody>
      </table>
    </Styles>)
};

export default Report;