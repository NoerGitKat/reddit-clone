import React from "react";
import { useRouter } from "next/router";

import Container from "./../components/Container";
import InputField from "./../components/InputField";
import { Formik, Form } from "formik";
import { Button } from "@chakra-ui/core";
import { useCreateUserMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [{}, register] = useCreateUserMutation();

  const initValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values, { setErrors }) => {
    const response = await register({
      username: values.username,
      password: values.password,
    });
    if (response.data?.createUser.errors) {
      setErrors(toErrorMap(response.data.createUser.errors));
    } else if (response.data?.createUser.user) {
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
