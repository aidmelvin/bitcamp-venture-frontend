import path from "path";
import { Profile, Event } from "./model/Event";

export const profiles: Record<string, Profile> = {
    zach: {
        first: "Zach",
        last: "Lefkovitz",
        profile_src: require("../../assets/profiles/zach.jpeg"),
    },
    samai: {
        first: "Samai",
        last: "Patel",
        profile_src: require("../../assets/profiles/samai.jpg"),
    },
    rob: {
        first: 'Rob',
        last: 'Castro',
        profile_src: require("../../assets/profiles/rob.jpg"),
    },
    corbin: {
        first: 'Corbin',
        last: "Vorhees",
        profile_src: require("../../assets/profiles/corbin.jpg"),
    }
}

const events: Event[] = [
    {
        id: 1,
        title: "Bottomless Mimosa Night",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec enim diam vulputate ut pharetra sit amet. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant.",
        image_src: require('../../assets/events/party.jpeg'),
        location_string: `Terrapin's Turf`,
        people_going: [profiles.corbin, profiles.zach, profiles.samai],
        date: new Date(2022, 3, 14),
        time: '9pm - Midnight'
    },
    {
        id: 2,
        title: 'Turning your Hackathon Project into a Company',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec enim diam vulputate ut pharetra sit amet. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant.',
        location_string: 'Startup Shell',
        people_going: [profiles.samai, profiles.corbin, profiles.zach],
        image_src: require('../../assets/events/shell_events.jpeg'),
        time: '6:00 PM - 7:30 PM',
        date: new Date(2022, 3, 12),
    },
    {
        id: 3,
        title: "Baseball: UMD vs Ohio State",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec enim diam vulputate ut pharetra sit amet. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant.',
        location_string: `Bob "Turtle" Smith Stadium`,
        people_going: [profiles.rob, profiles.corbin, profiles.samai],
        image_src: require("../../assets/events/umd_baseball.jpeg"),
        date: new Date(2022, 3, 15),
        time: '6:30 PM'
    }
]

export default events;