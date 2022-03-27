# EcoDash (HooHacks 2022)

## Inspiration
For many years, UVA has organized a first-year "Dorm Energy Race" where dormitories compete to use the lowest amount of energy in a one-month span. However, there was no way to view live updates of how dorms’ energy usage compared to each other, which makes student awareness and engagement much more challenging. Our solution to this problem was to develop a real-time leaderboard for UVA building energy competitions. UVA and other universities can use this platform in order to gamify the reduction of energy usage across dorms, school buildings, and more. More broadly, we wanted to show how gamification can be used to promote sustainable behavior and [lead to significant reductions in climate impact](https://www.sciencedirect.com/science/article/pii/S2352250X21000555).

## What it does
EcoDash provides a leaderboard that uses the [UVA Facilities API](https://devhub.virginia.edu/facilitiesAPI) to obtain information about energy, heating, and water usage in real-time. It features the current competition and the dorms involved as well as their current standings. A graph shows how each dorm's energy usage has changed over time.

Using the slider at the top, you can simulate the progression of the competition. Note the gamification elements including a prominent leaderboard encouraging social comparison and fun details like confetti at the dash's conclusion. Clicking on the dorms shows actionable steps students can take to reduce their footprint.

### Twilio API
By clicking `Get Updates` and entering a verified phone number, students will receive text updates using the Twilio API. These include checkpoint announcements as well as custom messages designed to boost engagement. For example, when Dunglison overtakes Shannon with one week remaining, it notifies students of this exciting comeback.

## How we built it
It uses NextJS (React) with TypeScript for server-side rendering and serverless functions for the API. The user interface is custom-made with Tailwind CSS. Finally, Twilio provides text notifications.

## Challenges we ran into
Although we had previously inspected the UVA Facilities API, it was down for maintenance during this competition, so we generated custom data tailored to each real-world dorm. This allowed us to provide an authentic demonstrative experience.

## Accomplishments that we're proud of
We’re especially proud of our UI, which we designed using Figma mockups and created from scratch with Tailwind CSS. It makes our application seem more fun and approachable to students, allowing it to fit our overall goal well. We also love our gamification elements including the Twilio text notifications that make the app feel engaging and personalized.

## What we learned
We learned serverless development with NextJS and industry-grade development practices with TypeScript. We also learned how to incorporate dynamic data visualizations and custom UI components.

## What's next for EcoDash
This project could be implemented at UVA for the first-year dorm energy competition, and also at other universities. More than just energy, competitions can include water and heat through the API. Ultimately, EcoDash aims to encourage students to be more energy-efficient and teach everyone that sustainability can be both productive and fun.## Getting Started


## Setup
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
