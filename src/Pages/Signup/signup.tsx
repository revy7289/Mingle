import { CreateUserDocument } from "@/Commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { ChevronLeft } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

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
  } = useForm();

  const password = useRef();
  password.current = watch("password");

  const [createUser] = useMutation(CreateUserDocument);

  const onChangeForm = async (data) => {
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
        className=" absolute w-[580px] min-h-[700px] h-auto bg-[#fcfcfc] rounded-2xl p-[50px] flex justify-between flex-col"
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
            <p className="text-[24px] text-semibold text-[#222222]">이메일</p>
            <input
              {...register("email", {
                required: { value: true, message: "이메일을 입력해주세요." },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "이메일 형식이 올바르지 않습니다",
                },
              })}
              type="text"
              className="w-full h-[48px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none"
            />
            {errors?.email && <p className="text-[10px]">{errors?.email?.message}</p>}
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="text-[24px] text-semibold text-[#222222]">이름</p>
            <input
              {...register("name", {
                required: { value: true, message: "이름을 입력해주세요." },
                pattern: {
                  value: /^[가-힣]{2,5}$/,
                  message: "이름 형식이 올바르지 않습니다",
                },
              })}
              type="text"
              className="w-full h-[48px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none"
            />
            {errors?.name && <p className="text-[10px]">{errors?.name?.message}</p>}
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="text-[24px] text-semibold text-[#222222]">비밀번호</p>
            <input
              {...register("password", {
                required: { value: true, message: "비밀번호를 입력해주세요" },
                minLength: {
                  value: 8,
                  message: "비밀번호 길이를 8자리 이상 입력해주세요",
                },
              })}
              type="password"
              className="w-full h-[48px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none"
            />
            {errors?.password && <p className="text-[10px]">{errors?.password?.message}</p>}
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="text-[24px] text-semibold text-[#222222]">비밀번호 확인</p>
            <input
              {...register("passwordConfirm", {
                required: { value: true, message: "비밀번호 확인을 입력해주세요" },
                validate: (value) => value === password.current,
              })}
              type="password"
              className="w-full h-[48px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none"
            />
            {errors?.passwordConfirm?.type === "required" && (
              <p className="text-[10px]">{errors?.passwordConfirm?.message}</p>
            )}
            {errors?.passwordConfirm?.type === "validate" && (
              <p className="text-[10px]">비밀번호가 일치하지 않습니다.</p>
            )}
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
