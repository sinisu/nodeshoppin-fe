import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import { GoogleLogin } from '@react-oauth/google';
import "../style/login.style.css";
import { CLEAR_ERRORS } from "../constants/user.constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.user.error);
  const isLoading = useSelector(state => state.user.loading);

  const loginWithEmail = (event) => {
    event.preventDefault();
    //이메일,패스워드를 가지고 백엔드로 보내기
    dispatch(userActions.loginWithEmail({email,password}));
  };

  const handleGoogleLogin = async (googleData) => {
    // 구글로 로그인 하기
    console.log("hehe",googleData);
    dispatch(userActions.loginWithGoogle(googleData.credential))
  };

  useEffect(()=>{
    return ()=>{
      dispatch(userActions.clearErrors());
    };
  },[dispatch]);

  if(user) {
    navigate("/");
    //유저가 있으면 로그인페이지에 들어오지 못하게 하기 위해 여기에 설정함
  }
  return (
    <>
      <Container className="login-area">
        {error && (
          <div className="error-message">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
        {isLoading? <Spinner />:null}
        <Form className="login-form" onSubmit={loginWithEmail}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="display-space-between login-button-area">
            <Button variant="danger" type="submit">
              Login
            </Button>
            <div>
              아직 계정이 없으세요?<Link to="/register">회원가입 하기</Link>{" "}
            </div>
          </div>

          <div className="text-align-center mt-2">
            <p>-외부 계정으로 로그인하기-</p>
            <div className="display-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              {/*
                1. 구글 로그인 버튼 가져오기
                2. Oauth 로그인을 위해서 google api 사이트에 가입하고 클라이언트키, 시크릿키 받아오기
                3. 로그인
                4. 백엔드 로그인하기
                  a. 이미 로그인을 한적이 있는 유저 => 로그인시키고 토큰값 주면 장땡
                  b. 처음 로그인 시도를 한 유저다 => 유저 정보 새로 생성 => 토큰값
              */}
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
