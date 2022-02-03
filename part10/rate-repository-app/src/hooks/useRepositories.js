import { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy, orderDirection) => {
  const [getRepositories, { data, error, loading }] = useLazyQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      // Other options
    }
  );

  const fetchRepositories = async (
    newOrderBy,
    newOrderDirection,
    searchKeyword
  ) => {
    await getRepositories({
      variables: {
        orderBy: newOrderBy ? newOrderBy : "CREATED_AT",
        orderDirection: newOrderDirection ? newOrderDirection : "DESC",
        searchKeyword,
      },
    });
  };

  useEffect(() => {
    getRepositories({
      variables: {
        orderBy: orderBy ? orderBy : "CREATED_AT",
        orderDirection: orderDirection ? orderDirection : "DESC",
      },
    });
  }, []);

  return {
    repositories: data?.repositories,
    loading,
    refetch: fetchRepositories,
  };
};

export default useRepositories;
