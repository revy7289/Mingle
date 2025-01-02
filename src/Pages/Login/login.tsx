import { LoginUserDocument } from "@/Commons/graphql/graphql";
import { useAccessTokenStore } from "@/Commons/Stores/tokenStore";
import UseInputField from "@/Components/input";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface IFormType {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IFormType>();

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const isValid = watchEmail && watchPassword;

  const { setAccessToken } = useAccessTokenStore();

  const [loginUser] = useMutation(LoginUserDocument);

  const onSubmitForm = async (data: IFormType) => {
    console.log(data);
    try {
      const res = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      console.log(res);
      const accessToken = res?.data?.loginUser.accessToken;
      console.log(accessToken);

      if (!accessToken) {
        alert("로그인에 실패했습니다! 다시 시도해 주세요!");
        return;
      }
      setAccessToken(accessToken);
      alert("로그인 성공");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen bg-[#343434] flex justify-center items-center relative">
      <div className="bg-[url('/login-bg.png')] w-full h-full bg-cover"></div>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="absolute w-[600px] h-[690px] bg-[#fcfcfc] rounded-2xl px-[50px] pt-[60px] pb-[70px] flex justify-between flex-col"
      >
        <div className="w-full flex justify-center">
          <div className="w-[240px] h-[80px]">
            <Link to="/">
              <img src="/login-logo.png" alt="login-logo" />
            </Link>
          </div>
        </div>
        <div className="w-full h-[250px] flex flex-col justify-around">
          <UseInputField
            label="이메일"
            register={register("email", {
              required: "이메일을 입력해주세요.",
              pattern: { value: /^\S+@\S+$/i, message: "이메일 형식이 올바르지 않습니다" },
            })}
            errorMessage={errors.email?.message}
            placeholder="이메일을 입력해주세요"
          />
          <UseInputField
            label="비밀번호"
            register={register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 8,
                message: "비밀번호 길이를 8자리 이상 입력해주세요",
              },
            })}
            errorMessage={errors?.password?.message}
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div className="w-full h-[150px] flex justify-between flex-col">
          <div>
            <button
              className={`w-full h-[56px] rounded-2xl ${
                !isValid ? "bg-[#767676]" : "bg-[#32cbff]"
              } text-[#fcfcfc] text-[24px] text-semibold`}
              disabled={!isValid}
            >
              로그인
            </button>
          </div>
          <div className="w-full h-[80px] flex flex-col justify-around">
            <div className="flex justify-between text-[16px] text-[#222222]">
              <p>아직 회원이 아니신가요?</p>
              <Link to="/signup" className="underline underline-offset-2">
                회원가입
              </Link>
            </div>
            <div className="flex justify-between text-[16px] text-[#222222]">
              <p>비밀번호를 잊어버리셨나요?</p>
              <Link to="/findpw" className="underline underline-offset-2">
                비밀번호찾기
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
