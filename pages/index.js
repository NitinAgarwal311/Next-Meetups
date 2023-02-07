import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
    {
        id: "m1",
        title: "First Meetup",
        image: "https://static.toiimg.com/thumb/msid-86480728,width-748,height-499,resizemode=4,imgsize-198188/.jpg",
        address: "Assam, India",
        description: "First Meetup",
    },
    {
        id: "m2",
        title: "Second Meetup",
        image: "https://static.toiimg.com/thumb/msid-86480728,width-748,height-499,resizemode=4,imgsize-198188/.jpg",
        address: "Tripura, India",
        description: "Second Meetup",
    },
];
const HomePage = (props) => {
    return (<Fragment>
        <Head>
            <title>Next Meetups</title>
            <meta name="description" content="Next Meetups" />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>);
};

// export const getServerSideProps = (context) => {
//     const req = context.req;
//     const res = context.res;

//     // fetch API

//     return {
//         props: {
//             meetups : DUMMY_MEETUPS
//         }
//     };
// }

export const getStaticProps = async () => {
    //fetch API

    const client = await MongoClient.connect(
        "mongodb+srv://nitin:Nitin_311@cluster0.nwux6.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}).toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                    id: meetup._id.toString(),
                    title: meetup.title,
                    image: meetup.image,
                    address: meetup.address,
                    description: meetup.description
                }))
        },
        revalidate: 10,
    };
};

export default HomePage;
