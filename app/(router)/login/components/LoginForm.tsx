"use client";
//----------------------------------------------------------//
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { PANEL_ENDPOINT } from "@/config";
import { signIn } from "next-auth/react";
import Loader from "@/app/components/common/Loader";
//----------------------------------------------------------//
interface ILoginFormProps {
  className?: string;
  callbackUrl?: string;
  error?: string;
}
//----------------------------------------------------------//
const LoginForm = (props: ILoginFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const onFormSubmit = async (e: any) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    const res = await signIn("credentials", {
      username: e.target[0].value,
      password: e.target[1].value,
      redirect: false,
    });
    setLoading(false);
    if (!res?.error) {
      router.push(
        props.callbackUrl ?? `${window.location.origin}/dashboard?tab=orders`
      );
    } else {
      setError("Please try again!");
    }
  };
  //----------------------------------------------------------------//
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={onFormSubmit} className={props.className}>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-0" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div className="login-error w-100 text-wrap">{error}</div>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      )}
    </>
  );
};

export default LoginForm;
