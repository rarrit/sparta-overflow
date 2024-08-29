import { useContext } from "react";
import { postContext } from "../contexts/PostContext";
import { useState } from "react";

const Main = () => {
  // context Test
  const { testList, addTestListHandler } = useContext(postContext);
  console.log("testList =>", testList);

  const TabData = [
    { id: 1, button: "답변 전", content: "~~답변을 기다리는 질문들~~" },
    { id: 2, button: "답변 후", content: "~~답변이 끝난 질문들~~~" },
  ];

  const [activeTab, setActiveTab] = useState(TabData[0].id);

  return (
    <>
      <h1>Latest post</h1>
      <div>
        <div>
          {TabData.map((tab) => (
            <button
              key={tab.id}
              data-active={activeTab === tab.id ? "true" : "false"}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.button}
            </button>
          ))}
        </div>
        <div>{TabData.find((a) => a.id === activeTab)?.content}</div>
      </div>
      <button onClick={addTestListHandler}>테스트 </button>
    </>
  );
};

export default Main;
