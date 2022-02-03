import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";
import { thousandsToKilosWithK } from "../../components/RepositoryItem";

const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
  },
  edges: [
    {
      node: {
        id: "jaredpalmer.formik",
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
      },
      cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
    },
    {
      node: {
        id: "async-library.react-async",
        fullName: "async-library/react-async",
        description: "Flexible promise-based React data loader",
        language: "JavaScript",
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
      },
      cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    },
  ],
};

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const { getByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      expect(
        getByTestId(`repositoryItem-Name-${repositories.edges[0].node.id}`)
      ).toHaveTextContent(repositories.edges[0].node.fullName);
      expect(
        getByTestId(
          `repositoryItem-Description-${repositories.edges[0].node.id}`
        )
      ).toHaveTextContent(repositories.edges[0].node.description);
      expect(
        getByTestId(`repositoryItem-Language-${repositories.edges[0].node.id}`)
      ).toHaveTextContent(repositories.edges[0].node.language);
      expect(
        getByTestId(`repositoryItem-Forks-${repositories.edges[0].node.id}`)
      ).toHaveTextContent(
        thousandsToKilosWithK(repositories.edges[0].node.forksCount)
      );
      expect(
        getByTestId(`repositoryItem-Stars-${repositories.edges[0].node.id}`)
      ).toHaveTextContent(
        thousandsToKilosWithK(repositories.edges[0].node.stargazersCount)
      );
      expect(
        getByTestId(`repositoryItem-Rating-${repositories.edges[0].node.id}`)
      ).toHaveTextContent(repositories.edges[0].node.ratingAverage);
      expect(
        getByTestId(`repositoryItem-Reviews-${repositories.edges[0].node.id}`)
      ).toHaveTextContent(
        thousandsToKilosWithK(repositories.edges[0].node.reviewCount)
      );

      expect(
        getByTestId(`repositoryItem-Name-${repositories.edges[1].node.id}`)
      ).toHaveTextContent(repositories.edges[1].node.fullName);
      expect(
        getByTestId(
          `repositoryItem-Description-${repositories.edges[1].node.id}`
        )
      ).toHaveTextContent(repositories.edges[1].node.description);
      expect(
        getByTestId(`repositoryItem-Language-${repositories.edges[1].node.id}`)
      ).toHaveTextContent(repositories.edges[1].node.language);
      expect(
        getByTestId(`repositoryItem-Forks-${repositories.edges[1].node.id}`)
      ).toHaveTextContent(
        thousandsToKilosWithK(repositories.edges[1].node.forksCount)
      );
      expect(
        getByTestId(`repositoryItem-Stars-${repositories.edges[1].node.id}`)
      ).toHaveTextContent(
        thousandsToKilosWithK(repositories.edges[1].node.stargazersCount)
      );
      expect(
        getByTestId(`repositoryItem-Rating-${repositories.edges[1].node.id}`)
      ).toHaveTextContent(repositories.edges[1].node.ratingAverage);
      expect(
        getByTestId(`repositoryItem-Reviews-${repositories.edges[1].node.id}`)
      ).toHaveTextContent(
        thousandsToKilosWithK(repositories.edges[1].node.reviewCount)
      );
    });
  });
});
