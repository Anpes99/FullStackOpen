import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const submitMock = jest.fn();
      const { getByTestId } = render(<SignInContainer onSubmit={submitMock} />);

      fireEvent.changeText(getByTestId("signIn-username"), "kalle");
      fireEvent.changeText(getByTestId("signIn-password"), "password");
      fireEvent.press(getByTestId("signIn-submitButton"));

      // formik form submissions are async
      await waitFor(() => {
        expect(submitMock).toHaveBeenCalledTimes(1);

        expect(submitMock.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
