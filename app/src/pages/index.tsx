import { Title } from "../components/title";
import { Frenchie } from "../components/typography/frenchie";

export const IndexPage: React.FC = () => {
  return (
    <div className="w-full px-4 md:px-0 md:max-w-[90vw] lg:max-w-xl pt-36 lg:pt-64 pb-12 flex flex-col gap-4">
      <div>
        <Frenchie className="text-center w-full block">London, UK</Frenchie>
        <Title className="pt-2 lg:pt-4 pb-12">Johan Wieslander</Title>
      </div>

      <p className="text-center">
        I'm a software engineer with a passion for trying and learning new
        things. I usually do full-stack development, but I'm also interested in
        other areas such as AI and mobile development. Most of my recent
        projects are in React, TypeScript and Python, but I've done a lot of
        previous work in Java and even earlier work in C/C++.
      </p>

      <p className="text-center">
        Currently, I'm at Fuse, helping make sustainable energy more accessible
        to everyone and to incentivize spending your energy more wisely to help
        the grid, the planet and your wallet.
      </p>

      <p className="text-center">
        Previously, I've been at Amazon, where I worked on Alexa Shopping and
        most recently, Rufus.
      </p>

      <p className="text-center">
        At Alexa Shopping, I was in charge of a named entity recognition
        deterministic and statistical recognition service. I also set up and
        managed a metrics pipeline for the service which handled thousands of
        data points per second. I also handled readiness for prime day / Black
        Friday and other high velocity events with no degraded performance over
        the two years I was in charge.
      </p>

      <p className="text-center pb-4">
        At Rufus, I was working on a data labelling platform to train the AI
        that powers the Rufus feature in the Amazon App. That platform was built
        in React, in TypeScript and with a backend in GraphQL and AWS AppSync. I
        also set up a simulator which ported the Rufus native app feature to the
        web so that annotators could see the exact same view that the customer
        saw.
      </p>
    </div>
  );
};
