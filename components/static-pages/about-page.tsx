import { aboutConfig } from "@/config/about";
import {
  ComputerDesktopIcon,
  LockClosedIcon,
  SparklesIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { User } from "lucide-react";
import React from "react";
import { v4 } from "uuid";

const features = [
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
];

const AboutPage = () => {
  return (
    <div className="bg-white py-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-6 lg:text-center">
          <h2 className="text-4xl font-semibold leading-7 text-gray-600">
            {aboutConfig.title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {aboutConfig.subTitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {aboutConfig.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-400">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
