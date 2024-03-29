import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  if (!props.show || result.loading) {
    return null;
  }
  console.log(result);
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
