import React from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import Container from "../components/Container";
import InputField from "../components/InputField";

import { toErrorMap } from "../utils/toErrorMap";
import { useLoginUserMutation } from "../generated/graphql";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const initValues = {
    username: "",
    password: "",
  };

  const [{}, login] = useLoginUserMutation();

  const handleSubmit = async (values, { setErrors }) => {
    const response = await login({
      username: values.username,
      password: values.password,
    });
    if (response.data?.loginUser.errors) {
      setErrors(toErrorMap(response.data.loginUser.errors));
    } else if (response.data?.loginUser.user) {
      // Success! Route to homepage
      router.push("/");
    }
  };

  return (
    <Container variant="small">
      <Formik initialValues={initValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => {
          return (
            <Form>
              <InputField
                name="username"
                placeholder="Username"
                label="Username"
                type="text"
              />
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Login;
