export interface Profile {
    first: string;
    last: string;
    profile_src: any;
};

export interface Event {
    id: number;
    title: string;
    location_string: string;
    description: string;
    image_src: any;
    people_going: Profile[];
    date: Date;
    time: string;
}