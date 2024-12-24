import Tag from "@/components/tag";
import { Eye, ThumbsUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function PostPage() {
  const params = useParams();

  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className=" w-[1120px] h-[1500px]">
        <div className=" w-full h-[102px] border-[#bdbdbd] border-b-[1px] flex justify-between">
          <div className="w-[900px] h-[80px] flex flex-col justify-between">
            <p className="text-[#222222] text-[40px] font-semibold">
              여기는 제목입니다
            </p>
            <p className="text-[#222222] text-[16px] ">
              작성자이름은최대열두글자
            </p>
          </div>
          <div className="w-[170px] h-[68px] flex flex-col justify-between mt-[15px]">
            <div className="flex w-full h-[24px] justify-between mt-[7px]">
              <div className="flex gap-[8px]">
                <ThumbsUp color="#767676" />{" "}
                <p className="text-[#767676] text-[16px]">000</p>
              </div>
              <div className="flex gap-[8px]">
                <Eye color="#767676" />{" "}
                <p className="text-[#767676] text-[16px]">000</p>
              </div>
            </div>
            <div className="flex justify-center text-[#767676]">
              2024. 12. 13. 23:54
            </div>
          </div>
        </div>
        <div className=" w-full h-[468px] border-[#bdbdbd] border-b-[1px] px-[20px] pt-[60px]">
          <div className=" w-full h-[320px] text-[#222222] leading-[32px] tracking-[-0.5px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
            tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem
            ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa.
            Commodo odio aenean sed adipiscing diam donec adipiscing tristique.
            Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at
            imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis.
            Egestas integer eget aliquet nibh praesent. In hac habitasse platea
            dictumst quisque sagittis purus. Pulvinar elementum integer enim
            neque volutpat ac. Senectus et netus et malesuada. Nunc pulvinar
            sapien et ligula ullamcorper malesuada proin. Neque convallis a cras
            semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam
            sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod
            lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum
            posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus
            non enim praesent elementum facilisis. Nisi scelerisque eu ultrices
            vitae auctor eu augue ut lectus. Ipsum faucibus vitae aliquet nec
            ullamcorper sit amet risus. Et malesuada fames ac turpis egestas
            sed. Sit amet nisl suscipit adipiscing bibendum est ultricies. Arcu
            ac tortor dignissim convallis aenean et tortor at. Pretium viverra
            ...
          </div>
          <div className="w-full h-[24px] mt-[30px] flex justify-between">
            <div className="w-[350px] h-full flex gap-[10px]">
              <Tag />
              <Tag />
              <Tag />
              <Tag />
            </div>
            <div className="flex gap-[20px]">
              <Link to={`/community/post/${params.boardId}/edit`}>
                <button className="text-[#767676]">수정하기</button>
              </Link>
              <button className="text-[#767676]">삭제하기</button>
            </div>
          </div>
        </div>
        <div className="w-full h-[325px] border-[#bdbdbd] border-b-[1px] px-[20px] pt-[60px] pb-[45px] flex flex-col gap-[10px]">
          <p className="text-[24px] text-[#222222] font-semibold w-[68px] h-[29px] ml-[20px]">
            답변 4
          </p>
          <div>
            <div className="w-full h-[130px] rounded-[16px] border-[#bdbdbd] border-[1px] px-[20px] py-[15px] text-[#222222] leading-[24px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
              tincidunt eget eerrt nullam non. Quis hendrerit dolor magna eget
              est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet
              massa. Commodo odio ... Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Nisl tincidunt eget eerrt nullam non. Quis
              hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat
              odio facilisis mauris sit amet massa. Commodo odio ...
            </div>
            <div className=" w-full h-[32px] mt-[15px] flex justify-end gap-[19px]">
              <button className="bg-[#bdbdbd] text-[#fcfcfc] w-[100px] h-full rounded-[8px]">
                취소
              </button>
              <button className="w-[100px] h-full rounded-[8px] bg-[#767676] text-[#fcfcfc]">
                작성하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
