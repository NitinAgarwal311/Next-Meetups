import Head from "next/head";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
    const addMeetupHandler = async (meetupData) => {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(meetupData),
            headers: {
                "Content-type": "application/json",
            },
        });

        const data = await response.json();

        console.log(data);
    };

    return (
        <Fragment>
            <Head>
                <title>New Meetup</title>
                <meta name="description" content="Add a new Meetup" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
};

export default NewMeetup;
