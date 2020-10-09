import React from "react";
import { useMutation } from "urql";

import Container from "./../components/Container";
import InputField from "./../components/InputField";
import { Formik, Form } from "formik";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/core";

interface registerProps {}

const REGISTER_MUTATION = `mutation CreateUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password){
    errors {
      field
      message
    }
    user {
      id
      createdAt
      updatedAt
      username
    }
  }
}`;

const Register: React.FC<registerProps> = ({}) => {
  const [{}, register] = useMutation(REGISTER_MUTATION);

  const initValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    register({ username: values.username, password: values.password });
  };

  return (
    <Container variant="small">
      <Formik initialValues={initValues} onSubmit={handleSubmit}>
        {(values, handleChange, isSubmitting) => {
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
                Register
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Register;
