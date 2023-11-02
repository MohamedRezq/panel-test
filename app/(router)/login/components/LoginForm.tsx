"use client";
//----------------------------------------------------------//
import { useEffect, useState } from "react";
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
  useEffect(() => {
    console.log(
      "process.env.NEXT_PUBLIC_API_ENDPOINT: ",
      process.env.NEXT_PUBLIC_API_ENDPOINT
    );
    console.log("process.env.NEXTAUTH_SECRET: ", process.env.NEXTAUTH_SECRET);
    console.log("process.env.NEXTAUTH_URL: ", process.env.NEXTAUTH_URL);
    console.log(
      "process.env.__NEXT_PRIVATE_PREBUNDLED_REACT: ",
      process.env.__NEXT_PRIVATE_PREBUNDLED_REACT
    );
  }, []);

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
