import { CreateUserDocument } from "@/Commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { ChevronLeft } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseInputField from "@/components/input";

interface IFormType {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

export default function SignupPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IFormType>();

  const password = useRef<string | undefined>();
  password.current = watch("password");

  const [createUser] = useMutation(CreateUserDocument);

  const onChangeForm = async (data: IFormType) => {
    console.log("회원가입정보:", data);
    try {
      const res = await createUser({
        variables: {
          createUserInput: {
            email: data.email,
            password: data.password,
            name: data.name,
          },
        },
      });
      console.log(res);
      alert("회원가입 성공");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#343434] flex justify-center items-center relative">
      <div className="bg-[url('/login-bg.png')] w-full h-full bg-cover"></div>
      <form
        onSubmit={handleSubmit(onChangeForm)}
        className=" absolute w-[600px] min-h-[750px] h-auto bg-[#fcfcfc] rounded-2xl p-[50px] flex justify-between flex-col"
      >
        <div className="flex  justify-center relative">
          <p onClick={handleGoBack} className="text-[#767676] flex absolute left-0 cursor-pointer">
            <ChevronLeft className="text-[#767676]" /> 뒤로가기
          </p>
          <Link to="/">
            <img src="/login-logo.png" alt="logo" className="w-[180px] h-[60px]" />
          </Link>
        </div>
        <div className="w-full h-[400px] flex flex-col justify-between">
          <div className="flex flex-col gap-[8px]">
            <UseInputField
              label="이메일"
              register={register("email", {
                required: "이메일을 입력해주세요.",
                pattern: { value: /^\S+@\S+$/i, message: "이메일 형식이 올바르지 않습니다" },
              })}
              errorMessage={errors.email?.message}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <UseInputField
              label="이름"
              register={register("name", {
                required: "이름을 입력해주세요.",
                pattern: { value: /^[가-힣]{2,5}$/, message: "이름 형식이 올바르지 않습니다" },
              })}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
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
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <UseInputField
              label="비밀번호 확인"
              register={register("passwordConfirm", {
                required: "비밀번호 확인을 입력해주세요",
                validate: (value) => value === password.current || "비밀번호가 일치하지 않습니다.",
              })}
              errorMessage={errors?.passwordConfirm?.message}
              type="password"
            />
          </div>
        </div>
        <div className="w-full h-[56px]">
          <button className="w-full h-full rounded-2xl bg-[#32cbff] text-[#fcfcfc] text-[24px] text-semibold">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
