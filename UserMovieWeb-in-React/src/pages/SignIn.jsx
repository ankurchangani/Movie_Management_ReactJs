import { Alert, Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  isOpenAct,
  SignInPoPup,
  SignInThunk,
  SignUpBackAct,
} from "../services/actions/AuthAction";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignIn, isLoading, Error, isOpen } = useSelector(
    (state) => state.AuthReducer
  );

  const [signIn, setsignIn] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setsignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SignInThunk(signIn));
  };

  const GoogleSignIn = () => {
    dispatch(SignInPoPup());
  };

  useEffect(() => {
    dispatch(SignUpBackAct());
  }, []);

  useEffect(() => {
    if (isSignIn) {
      navigate("/");
    }
  }, [isSignIn]);

  return (
    <>
      {/* Error Snackbar */}
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => dispatch(isOpenAct(false))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => dispatch(isOpenAct(false))}
          severity="error"
          sx={{ backgroundColor: "#ef4444", color: "#fff" }}
        >
          {Error}
        </Alert>
      </Snackbar>

      {/* Sign In Section */}
      <section className="flex justify-center items-center h-screen bg-[#0f172a]">
        <Container>
          <Row className="justify-content-center">
            <Col lg={5}>
              <div className="w-full p-8 bg-[#1e293b] shadow-lg rounded-2xl border border-[#334155]">
                <h2 className="text-white text-2xl font-semibold text-center mb-6">
                  Sign In to <span className="text-[#facc15]">Your Account</span>
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={signIn.email}
                      placeholder="Enter Your Email"
                      className="mt-2 block bg-transparent text-white w-full px-4 py-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={signIn.password}
                      placeholder="Enter Your Password"
                      className="mt-2 block bg-transparent text-white w-full px-4 py-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-[#3b82f6] text-white py-2 px-4 rounded-md hover:bg-[#2563eb] transition duration-300"
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </button>
                  </div>
                </form>

                <div className="my-6 flex items-center">
                  <div className="flex-grow border-t border-gray-600"></div>
                  <span className="px-3 text-gray-400">OR</span>
                  <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#ea4335",
                      color: "#fff",
                      fontWeight: "bold",
                      paddingX: 3,
                      ":hover": { backgroundColor: "#c53929" },
                    }}
                    onClick={GoogleSignIn}
                  >
                    Sign in with Google
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-300">
                    Don’t have an account?{" "}
                    <Link
                      to={"/signup"}
                      className="text-[#facc15] hover:underline"
                    >
                      Sign up!
                    </Link>
                  </p>
                  <p className="text-sm mt-2">
                    <Link
                      to={"/"}
                      className="text-blue-400 hover:underline no-underline"
                    >
                      Forgot Password?
                    </Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SignIn;
