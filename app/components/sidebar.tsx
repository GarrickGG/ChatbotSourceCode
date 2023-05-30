import { useEffect, useRef } from "react";
import React, { useState } from "react";

import styles from "./home.module.scss";

import { IconButton } from "./button";
import SettingsIcon from "../icons/settings.svg";
import LoginIcon from "../icons/login.svg";
import ChatGptIcon from "../icons/chatgpt.svg";
import AddIcon from "../icons/add.svg";
import CloseIcon from "../icons/close.svg";
import MaskIcon from "../icons/mask.svg";
import PluginIcon from "../icons/plugin.svg";

import Locale from "../locales";
import { Modal } from "./Modal";

import { useAppConfig, useChatStore } from "../store";

import {
  MAX_SIDEBAR_WIDTH,
  MIN_SIDEBAR_WIDTH,
  NARROW_SIDEBAR_WIDTH,
  Path,
  REPO_URL,
} from "../constant";

import { Link, useNavigate } from "react-router-dom";
import { useMobileScreen } from "../utils";
import dynamic from "next/dynamic";
import { showToast } from "./ui-lib";

const ChatList = dynamic(async () => (await import("./chat-list")).ChatList, {
  loading: () => null,
});

interface FAQButtonProps {
  onFAQClick: () => void;
}

const FAQButton: React.FC<FAQButtonProps> = ({ onFAQClick }) => {
  const shouldNarrow = useDragSideBar().shouldNarrow;
  const [showModal, setShowModal] = useState(false);

  const handleFAQClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <IconButton
        icon={<LoginIcon />}
        text={shouldNarrow ? undefined : Locale.FAQ.Name}
        className={styles["sidebar-bar-button"]}
        onClick={handleFAQClick}
        shadow
      />
      <Modal show={showModal} onClose={handleCloseModal}>
        <h1>FAQs</h1>

        <div className="faq-item">
          <h2>Q1: 什么是Chatbot?</h2>
          <p>
            A1:
            欢迎使用我们的Chatbot，这是一个强大、智能且易于使用的对话AI。我们的Chatbot使用了OpenAI的ChatGPT接口，这是一个先进的人工智能模型，被训练成了一个能够进行自然、连贯和详细的对话的聊天机器人。借助这种技术，我们的Chatbot能够理解和回应各种类型的查询，从简单的事实性问题到更复杂的问题，提供丰富的信息和深度的洞察。
            我们的Chatbot旨在成为你的个人AI助手，无论你是在寻找信息，需要帮助进行决策，还是只是想要与一个智能的AI进行对话，我们的Chatbot都能够满足你的需求。它能够24/7提供服务，随时准备帮助你解答问题，提供建议，或者只是提供一个有趣的对话。
            利用先进的AI技术，我们的Chatbot能够在各种情况下提供帮助，从简单的日常任务到复杂的决策。我们的目标是通过提供易于使用、高效且智能的工具，来帮助你更好地管理你的生活和工作。
          </p>
        </div>

        <div className="faq-item">
          <h2>Q2:我应该怎样使用ChatBot?</h2>
          <p>
            A2:
            用户首先需要再设置界面登陆，如果没有账号需要用户首先注册一个账号，以便使用我们的服务。
            每个用户有20次免费的查询次数，如果用户想继续使用我们的服务，需要开通会员，具体服务价格在开通会员页面显示。
            用户可以选择一个系统自带面具，比如文案写作，小红书写手等，通过一个提示让chatbot知道自己应该充当的角色，以便更好的服务用。当然，用户也也可以自己指令chatbot让他充当用户需要的角色，以便提供定制化服务。除此之外，用户也可以在对话框直接提问，chatbot将24小时全天候为您服务。
            提问或发出命令：在对话框中，你可以向Chatbot提问或者发出命令。例如，你可能会问：“今天的天气如何？”或者说：“请帮我安排明天的日程。”记住，你的问题或命令应该尽可能清晰和具体，以便Chatbot可以更准确地理解你的需求。
            接收回答或反馈：Chatbot会处理你的问题或命令，并提供回答或反馈。这可能包括提供所请求的信息，完成一个任务，或者如果它不明白你的请求，它可能会要求你提供更多的信息。
            持续交互：你可以继续与Chatbot交互，提出更多的问题，或者根据需要给出更多的指令。Chatbot应该能够在一系列的互动中保持上下文，以便更有效地帮助你。
          </p>
        </div>

        <div className="faq-item">
          <h2>Q4: chatBot可以在哪些方面帮助到我？</h2>
          <p>
            A4:
            ChatBot可以在许多方面帮助学生，不仅仅是学术上的帮助，还包括组织和计划、解答疑问、提供学习资源等。以下是一些具体的方式：
            作业帮助：ChatBot可以提供作业的帮助，包括解释复杂的概念，提供研究资料，或者帮助编辑和审阅写作作业。例如，如果一个学生在写一篇关于全球气候变化的论文，他们可以问ChatBot有关气候变化的具体问题，或者要求它提供一些相关的资源。
            学习资源：ChatBot可以作为一个学习资源的库，提供各种学科的信息和知识。这包括历史、科学、数学、文学等等。学生可以向ChatBot提问，获取特定的信息或者深入理解某个主题。
            提问和探索：学生可以用ChatBot来探索他们对特定主题的兴趣，或者提出他们可能不想在课堂上问的问题。因为ChatBot是一个机器人，学生可能会感到更自在，更愿意提问和探索。
            时间管理和组织：ChatBot也可以帮助学生管理他们的时间和任务。例如，他们可以向ChatBot描述他们的日程安排，然后ChatGPT可以提醒他们即将到来的截止日期，或者建议他们如何更有效地安排他们的时间。
            学习策略：ChatBot可以提供有效的学习策略和技巧，帮助学生更好地学习。这可能包括记忆技巧，如何更有效地阅读和理解，或者如何为考试做准备。
            语言学习：对于正在学习新语言的学生，ChatBot可以作为一个实践对话和理解的工具。他们可以与ChatBot用他们正在学习的语言进行对话，以提高他们的语言技能。
          </p>
        </div>

        <div className="faq-item">
          <h2>Q6: 我应该如何报告使用中的问题?</h2>
          <p>A6: 您可以联系我们的工作人员 联系邮箱：</p>
        </div>
      </Modal>
    </>
  );
};

function useDragSideBar() {
  const limit = (x: number) => Math.min(MAX_SIDEBAR_WIDTH, x);

  const config = useAppConfig();
  const startX = useRef(0);
  const startDragWidth = useRef(config.sidebarWidth ?? 300);
  const lastUpdateTime = useRef(Date.now());

  const handleMouseMove = useRef((e: MouseEvent) => {
    if (Date.now() < lastUpdateTime.current + 50) {
      return;
    }
    lastUpdateTime.current = Date.now();
    const d = e.clientX - startX.current;
    const nextWidth = limit(startDragWidth.current + d);
    config.update((config) => (config.sidebarWidth = nextWidth));
  });

  const handleMouseUp = useRef(() => {
    startDragWidth.current = config.sidebarWidth ?? 300;
    window.removeEventListener("mousemove", handleMouseMove.current);
    window.removeEventListener("mouseup", handleMouseUp.current);
  });

  const onDragMouseDown = (e: MouseEvent) => {
    startX.current = e.clientX;

    window.addEventListener("mousemove", handleMouseMove.current);
    window.addEventListener("mouseup", handleMouseUp.current);
  };
  const isMobileScreen = useMobileScreen();
  const shouldNarrow =
    !isMobileScreen && config.sidebarWidth < MIN_SIDEBAR_WIDTH;

  useEffect(() => {
    const barWidth = shouldNarrow
      ? NARROW_SIDEBAR_WIDTH
      : limit(config.sidebarWidth ?? 300);
    const sideBarWidth = isMobileScreen ? "100vw" : `${barWidth}px`;
    document.documentElement.style.setProperty("--sidebar-width", sideBarWidth);
  }, [config.sidebarWidth, isMobileScreen, shouldNarrow]);

  return {
    onDragMouseDown,
    shouldNarrow,
  };
}

export function SideBar(props: { className?: string }) {
  const chatStore = useChatStore();

  // drag side bar
  const { onDragMouseDown, shouldNarrow } = useDragSideBar();
  const navigate = useNavigate();

  const config = useAppConfig();

  return (
    <div
      className={`${styles.sidebar} ${props.className} ${
        shouldNarrow && styles["narrow-sidebar"]
      }`}
    >
      <div className={styles["sidebar-header"]}>
        <div className={styles["sidebar-title"]}>ChatBot</div>
        <div className={styles["sidebar-sub-title"]}>
          你的个人AI助手, 随时随地
        </div>
        <div className={styles["sidebar-sub-title"]}>打造你的定制化AI体验</div>
        <div className={styles["sidebar-logo"] + " no-dark"}>
          <ChatGptIcon />
        </div>
      </div>

      <div className={styles["sidebar-header-bar"]}>
        <IconButton
          icon={<MaskIcon />}
          text={shouldNarrow ? undefined : Locale.Mask.Name}
          className={styles["sidebar-bar-button"]}
          onClick={() => navigate(Path.NewChat, { state: { fromHome: true } })}
          shadow
        />
        <IconButton
          icon={<PluginIcon />}
          text={shouldNarrow ? undefined : Locale.Plugin.Name}
          className={styles["sidebar-bar-button"]}
          onClick={() => showToast(Locale.WIP)}
          shadow
        />
      </div>

      <div
        className={styles["sidebar-body"]}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            navigate(Path.Home);
          }
        }}
      >
        <ChatList narrow={shouldNarrow} />
      </div>

      <div className={styles["sidebar-tail"]}>
        <div className={styles["sidebar-actions"]}>
          <div className={styles["sidebar-action"] + " " + styles.mobile}>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => {
                if (confirm(Locale.Home.DeleteChat)) {
                  chatStore.deleteSession(chatStore.currentSessionIndex);
                }
              }}
            />
          </div>
          <div className={styles["sidebar-action"]}>
            <Link to={Path.Settings}>
              <IconButton icon={<SettingsIcon />} shadow />
            </Link>
          </div>
          <FAQButton onFAQClick={() => {}} />
        </div>
        <div>
          <IconButton
            icon={<AddIcon />}
            text={shouldNarrow ? undefined : Locale.Home.NewChat}
            onClick={() => {
              if (config.dontShowMaskSplashScreen) {
                chatStore.newSession();
                navigate(Path.Chat);
              } else {
                navigate(Path.NewChat);
              }
            }}
            shadow
          />
        </div>
      </div>

      <div
        className={styles["sidebar-drag"]}
        onMouseDown={(e) => onDragMouseDown(e as any)}
      ></div>
    </div>
  );
}
