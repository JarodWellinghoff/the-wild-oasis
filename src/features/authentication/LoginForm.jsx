import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLoginWithEmailAndPassword } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading: isLoggingIn } = useLoginWithEmailAndPassword();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label='Email address'>
        <Input
          disabled={isLoggingIn}
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label='Password'>
        <Input
          disabled={isLoggingIn}
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLoggingIn} size='large' onClick={handleSubmit}>
          {isLoggingIn ? <SpinnerMini /> : "Log in"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
