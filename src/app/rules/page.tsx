"use client";

import Image from "next/image";

export default function Rules() {
  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen">
      {/* Header Image */}
      <div className="relative h-48 w-full">
        <Image
          src="/images/rules.jpeg"
          alt="Rules Header"
          fill
          className="object-cover object-bottom"
        />
        {/* Updated gradient overlay for a smoother blend */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(247,250,252,0.8) 80%, rgba(247,250,252,1) 100%)",
          }}
        ></div>
      </div>
      {/* Content */}
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Open and Over 30 Rules
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Game will include two halves consisting of 45 minutes each. Five
          minutes will be allowed for halftime.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Playoff games will include two 10 minute overtime periods – no golden
          goal. If still tied, then PK’s.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <strong>NO SLIDE TACKLING.</strong> Sliding is allowed if it is not a
          tackle. To clarify, if a slide is not to steal a ball at an opponent's
          feet or win a 50-50 ball, and is not dangerous it is ok. Examples:
          saving a ball from crossing the goal line or sideline or to score a
          goal or make a pass. (if it is not a tackle)
        </p>
        <p className="text-lg text-gray-700 mb-4">
          If a game is tied at the end of regulation, it is a tie.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Same colored uniform shirts are required. Arrange for a backup color
          unless you are sure your color is unique in the league.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          If a team knows in advance that they will not be able to play their
          scheduled game or be short players, please contact Greg Peer so the
          schedule can be rearranged or you will be supplied with enough players
          to play the game.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Substitutions will be allowed on throw-ins, corner kicks, &amp; goal
          kicks or any time but not to attain an advantage.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          For fouls, throw-ins and corner kicks, the players involved make the
          decision. Things for new teams to get used to: If a player calls a
          foul, they must do it loud enough to be clear that play should be
          stopped. If a player calls a foul, it is like the ref blowing the
          whistle. Sometimes it’s the wrong call. Avoid arguing. Try to
          de-escalate the situation when there are disagreements. Often if a
          player makes the wrong call, his own team will overrule him and the
          right call will be made. Do not act like you were fouled and then not
          say foul or make other ambiguous comments or arguments. This creates
          uncertainty.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Games may be played in the rain but not lightning. In case of
          inclement weather, there are links to Chesterfield and O’Fallon on the
          website. Fenton fields drain well and seldom are rained out. If the
          Fenton fields aren’t good enough to play, team managers will be
          emailed and the website updated.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          A playoff system will be decided during the season.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Over 30 teams can have 2 players between 27 and 30.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          In lieu of yellow and red cards, the teams and players police
          themselves. Team managers take leadership if necessary. If a player
          gets out of control, have him sit for awhile.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Offside is currently called by the defense. It is discouraged to play
          a trap on a close play. This can be a contentious situation as it is
          when there are refs. Avoid arguments that degrade the game. Often the
          offensive player will call it on themselves. Video replay can be used
          where available.
        </p>
      </div>
    </div>
  );
}
