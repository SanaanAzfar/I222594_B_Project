import React from "react";

const Table = ({ data, columns, renderRow }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} style={{ borderBottom: "1px solid black", padding: "8px" }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>{renderRow(item)}</tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
