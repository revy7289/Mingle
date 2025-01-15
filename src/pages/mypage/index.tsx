// import Reply from "@/components/comments/reply";
// import PostList from "@/components/postList";
import { FetchUserLoggedInDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { Mail, Pencil, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type dataType = {
  id: string;
  index: number;
  username: string;
  time: string;

  title: string;
  desc: string;
  url: string;
  thumbnail: string;
};

type Page = {
  id: string;
  created_time: string;
  properties: {
    Index?: { number: number };
    Username?: { rich_text: { text: { content: string } }[] };
    Title?: { title: { text: { content: string } }[] };
  };
  children: Child[];
};

type Child = {
  type: "paragraph"; // Other types like `heading`, `image` can be added if needed
  paragraph: {
    rich_text: {
      text: {
        content: string;
      };
    }[];
  };
};

const Mypage = () => {
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);
  const tabs = ["내 작업공간", "내가 쓴 글", "내가 쓴 댓글"];

  const [notionData, setNotionData] = useState([]);

  const { data: user } = useQuery(FetchUserLoggedInDocument);
  const username = user?.fetchUserLoggedIn.name || "guest";

  useEffect(() => {
    async function handleData() {
      const data = await fetchNotionData(username);

      const processedData = data.map((page: Page) => {
        const children = page.children;

        let desc = "";
        const urls = [""];
        const thumbnails = [""];

        children.forEach((child) => {
          if (child.type === "paragraph" && child.paragraph.rich_text.length > 0) {
            const textContent = child.paragraph.rich_text[0].text.content;

            // Determine the type of the child based on its content
            if (textContent.startsWith("Desc:")) {
              desc = textContent.replace("Desc: ", "").trim();
            } else if (textContent.startsWith("URL:")) {
              urls.push(textContent.replace("URL: ", "").trim());
            } else if (textContent.startsWith("Thumbnail:")) {
              thumbnails.push(textContent.replace("Thumbnail: ", "").trim());
            }
          }
        });

        // Combine long URLs and thumbnails back into single strings
        const combinedUrl = urls.join("");
        const combinedThumbnail = thumbnails.join("");

        // Return processed data
        return {
          id: page.id,
          index: page.properties.Index?.number || 0,
          username: page.properties.Username?.rich_text[0]?.text?.content || "Unknown",
          time: page.created_time,

          title: page.properties.Title?.title[0]?.text?.content || "Untitled",
          desc,
          url: combinedUrl,
          thumbnail: combinedThumbnail,
        };
      });

      console.log(processedData);
      setNotionData(processedData);
    }

    handleData();
  }, [username]);

  async function fetchNotionData(username: string) {
    try {
      const response = await fetch(
        `http://localhost:3001/notion?username=${encodeURIComponent(username)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch filtered Notion data");
      }
      const data = await response.json();
      console.log(data);
      return data; // 받은 데이터를 클라이언트에서 사용
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-[115px]">
        <div className="flex flex-col justify-center items-center">
          <div className="w-[265px] h-[265px] bg-[#E0E0E0] rounded-[16px]"></div>
          <div className="flex justify-between items-center w-[245px] h-[48px] mt-[20px]">
            <span className="text-[#222222] text-[40px] font-medium">닉네임</span>
            <div>
              <Pencil />
            </div>
          </div>
          <div className="flex flex-col gap-[8px] mt-[12px] w-[245px]">
            <div className="flex gap-[8px]">
              <span className="text-[#767676]">Lv. 00</span>
              <span className="text-[#767676]">000,000 XP</span>
            </div>
            <div className="flex gap-[10px]">
              <UsersRound />
              <div>
                <span>팔로잉 0</span>
                <span> · </span>
                <span>팔로워 0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[550px]">
          <div className="w-full h-[139px]">
            <div className="flex justify-between">
              <span className="text-[24px] font-semibold">한 줄 소개</span>
              <div>
                <Pencil />
              </div>
            </div>
            <div className="px-[16px] py-[15px]">
              <span className="text-[24px] font-semibold">Hello, world!</span>
            </div>
          </div>

          <div className="w-full border-b border-solid border-[#BDBDBD]"></div>

          <div className="w-full h-[139px] mt-[40px]">
            <div className="flex justify-between mb-[20px]">
              <span className="text-[24px] font-semibold">기술스택</span>
              <div>
                <Pencil />
              </div>
            </div>
            태그
          </div>
          <div className="w-full h-[70px] ">
            <span className="text-[24px] font-semibold">연락처</span>
            <div className="flex gap-[12px] mt-[17px]">
              <div>
                <Mail />
              </div>
              <span>www.contact@mail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-[95px] w-[1060px]">
        <div className="flex gap-[20px] w-full justify-center text-[24px]">
          {tabs.map((el, index) => (
            <button
              key={`${el}_${index}`}
              className={`w-[170px] h-[39px] border-solid border-b ${
                tabIndex === index
                  ? "border-[#222222] text-[#222222]"
                  : "border-[#767676] text-[#767676]"
              }`}
              onClick={() => setTabIndex(index)}
            >
              {el}
            </button>
          ))}
        </div>

        {notionData.map((data: dataType) => (
          <div className="flex mt-[40px] ">
            <div className="w-[265px] h-[170px] bg-[#E0E0E0] rounded-[16px]">
              <img src={`${data.thumbnail}`} />
            </div>

            <div
              className="w-full px-[40px] my-[20px] flex flex-col justify-between"
              onClick={() => navigate(data.url, { replace: true })}
            >
              <p className="text-[24px]">{data.title || "untitled.mingle"}</p>
              <p>{data.desc}</p>
              <p className="text-[#767676] text-[12px]">{data.time}</p>
            </div>
          </div>
        ))}

        {/* 작업공간
          {tabIndex === 0 && ( )}
          {tabIndex === 1 && <PostList />}
          {tabIndex === 2 && <Reply />}
           */}
      </div>
    </div>
  );
};

export default Mypage;
