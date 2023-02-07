import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

import MeetupDetial from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
    return (
        <Fragment>
            <Head>
                <title>Meetup {props.meetup.title}</title>
                <meta
                    name="description"
                    content={props.meetup.description}
                />
            </Head>
            <MeetupDetial
                img={props.meetup.image}
                address={props.meetup.address}
                description={props.meetup.description}
                title={props.meetup.title}
            />
        </Fragment>
    );
};

export const getStaticPaths = async () => {
    const client = await MongoClient.connect(
        "mongodb+srv://nitin:Nitin_311@cluster0.nwux6.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map((meetup) => {
            return {
                params: { meetupId: meetup._id.toString() },
            };
        }),
    };
};

export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        "mongodb+srv://nitin:Nitin_311@cluster0.nwux6.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId),
    });

    client.close();

    return {
        props: {
            meetup: {
                id: meetup._id.toString(),
                image: meetup.image,
                address: meetup.address,
                description: meetup.description,
                title: meetup.title,
            },
        },
    };
};

export default MeetupDetails;
