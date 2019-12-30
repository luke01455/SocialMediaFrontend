import React, { useState }from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Register = () => {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: ""
  });

  const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value})
  }

  const [addUser, { loading}] = useMutation(REGISTER_USER, {
    update(proxy, res) {
        console.log(res)
    },
    onError(err){
        console.log(err.graphQLErrors[0].extensions.exception.errors)
        // gets the errors from our server code
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
})

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  } 


  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
      <h1> Register </h1>
      <Form.Input
        label="Username"
        placeholder="Username.."
        name="username"
        type="text"
        value={values.username}
        error={errors.username ? true : false}
        onChange={onChange}
      />
      <Form.Input
        label="Email"
        placeholder="Email.."
        name="email"
        type="text"
        value={values.email}
        error={errors.email ? true : false}
        onChange={onChange}
      />
      <Form.Input
        label="Password"
        placeholder="Password.."
        name="password"
        type="password"
        value={values.password}
        error={errors.password ? true : false}
        onChange={onChange}
      />
      <Form.Input
        label="Confirm password"
        placeholder="Confirm password.."
        name="confirmPassword"
        type="password"
        value={values.confirPassword}
        error={errors.confirmPassword ? true : false}
        onChange={onChange}
      />
      <Button type="submit" primary>
          Register
      </Button>
      </Form>
        {Object.keys(errors).length > 0 && (      
        <div className="ui error message">
    <ul className="list">
    {Object.values(errors).map((value) => (
        <li key={value}>{value}</li>
    ))}
    </ul>
      </div>)}
    </div>
  );
};

const REGISTER_USER = gql`
    mutation register (
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register;
