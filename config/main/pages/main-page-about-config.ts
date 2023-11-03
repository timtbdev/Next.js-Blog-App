import { AboutPageType } from "@/types";
import {
  ComputerDesktopIcon,
  LockClosedIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";

const mainPageAboutConfig: AboutPageType = {
  general: {
    title: "About",
    subTitle: "Fullstack Blogging application",
    description:
      "This is a fullstack blogging application built with Next.js 13 and Supabase.",
    paragraphs: [
      {
        description:
          "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.",
      },
      {
        description:
          "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.",
      },
    ],
  },
  features: [
    {
      name: "Frontend",
      description:
        "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
      icon: ComputerDesktopIcon,
    },
    {
      name: "Trust",
      description:
        "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
      icon: LockClosedIcon,
    },
    {
      name: "Compassion",
      description:
        "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
      icon: SparklesIcon,
    },
    {
      name: "Leadership",
      description:
        "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
      icon: UsersIcon,
    },
  ],
};

export default mainPageAboutConfig;
