import React from "react";

import Container from "./../components/Container";
import InputField from "./../components/InputField";
import { Formik, Form } from "formik";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/core";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const initValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
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
