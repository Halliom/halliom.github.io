import { Footer } from "./components/footer";

function App() {
  return (
    <div className="flex flex-col w-screen h-screen justify-between items-center">
      <div className="max-w-[90vw] lg:max-w-xl ">
        <h1 className="text-3xl font-bold pt-72 pb-12">Johan Wieslander</h1>

        <div className="flex flex-col gap-4">
          <p>
            I'm a software engineer with a passion for trying and learning new
            things. I usually do full-stack development, but I'm also interested
            in other areas such as AI and mobile development and game engines.
            Most of my recent projects are in React, TypeScript and Python, but
            I've done a lot of previous work in Java and even earlier work in
            C/C++.
          </p>

          <p>
            Currently, I'm at Fuse, helping make sustainable energy more
            accessible to everyone and to incentivize spending your energy more
            wisely to help the grid, the planet and your wallet.
          </p>

          <p>
            Previously, I've been at Amazon, where I worked on Alexa Shopping
            and most recently, Rufus.
          </p>

          <p>
            At Alexa Shopping, I was in charge of a named entity recognition
            deterministic and statistical recognition service. I also set up and
            managed a metrics pipeline for the service which handled thousands
            of data points per second. I also handled readiness for prime day /
            Black Friday and other high velocity events with no degraded
            performance over the two years I was in charge.
          </p>

          <p className="pb-4">
            At Rufus, I was working on a data labelling platform to train the AI
            that powers the Rufus feature in the Amazon App. That platform was
            built in React, in TypeScript and with a backend in GraphQL and AWS
            AppSync. I also set up a simulator which ported the Rufus native app
            feature to the web so that annotators could see the exact same view
            that the customer saw.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
